'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function LayoutEffectMeasureDemo() {
  const titleRef = useRef<HTMLHeadingElement | null>(null)

  const [text, setText] = useState('Measure me before paint')
  const [mode, setMode] = useState<'layout' | 'effect'>('layout')
  const [indicatorWidth, setIndicatorWidth] = useState(0)

  useLayoutEffect(() => {
    if (mode !== 'layout') {
      return
    }
    setIndicatorWidth(titleRef.current?.offsetWidth ?? 0)
  }, [text, mode])

  useEffect(() => {
    if (mode !== 'effect') {
      return
    }
    setIndicatorWidth(titleRef.current?.offsetWidth ?? 0)
  }, [text, mode])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Measurement Mode</CardTitle>
          <CardDescription>
            Compare layout timing with the same DOM measurement logic.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="layout-text" className="text-sm font-medium">
              Headline text
            </label>
            <Input
              id="layout-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Type to change measured width"
            />
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={mode === 'layout' ? 'default' : 'outline'}
              onClick={() => setMode('layout')}
            >
              Layout mode
            </Button>
            <Button
              size="sm"
              variant={mode === 'effect' ? 'default' : 'outline'}
              onClick={() => setMode('effect')}
            >
              Effect mode
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Measured Indicator</CardTitle>
          <CardDescription>
            Indicator tracks headline width using{' '}
            {mode === 'layout' ? 'useLayoutEffect' : 'useEffect'}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <h3 ref={titleRef} className="inline-block text-xl font-semibold tracking-tight">
            {text}
          </h3>
          <div className="h-2 rounded-full bg-muted/40">
            <div
              className="h-full rounded-full bg-primary/65 transition-all duration-150"
              style={{ width: `${indicatorWidth}px` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Measured width: {Math.round(indicatorWidth)}px
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
