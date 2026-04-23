'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type Mode = 'lifted' | 'colocated'

type EditorCardProps = {
  title: string
  mode: Mode
  liftedValue: string
  onLiftedChange: (value: string) => void
}

function EditorCard({ title, mode, liftedValue, onLiftedChange }: EditorCardProps) {
  const renderCount = useRef(0)
  renderCount.current += 1

  const [localValue, setLocalValue] = useState('')

  const value = mode === 'lifted' ? liftedValue : localValue

  function onChange(next: string) {
    if (mode === 'lifted') {
      onLiftedChange(next)
      return
    }
    setLocalValue(next)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Render count: {renderCount.current} (
          {mode === 'lifted' ? 'parent-owned state' : 'local state'})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Type to test ownership boundaries"
        />
        <p className="text-sm text-muted-foreground">Current value: {value || '(empty)'}</p>
      </CardContent>
    </Card>
  )
}

export function StateColocationDemo() {
  const [mode, setMode] = useState<Mode>('lifted')
  const [leftValue, setLeftValue] = useState('')
  const [rightValue, setRightValue] = useState('')

  function resetAll() {
    setLeftValue('')
    setRightValue('')
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>State Ownership Mode</CardTitle>
          <CardDescription>
            Compare rerender behavior when state is lifted to parent versus colocated in each child.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={mode === 'lifted' ? 'default' : 'outline'}
            onClick={() => setMode('lifted')}
          >
            Lifted mode
          </Button>
          <Button
            size="sm"
            variant={mode === 'colocated' ? 'default' : 'outline'}
            onClick={() => setMode('colocated')}
          >
            Colocated mode
          </Button>
          <Button size="sm" variant="ghost" onClick={resetAll}>
            Reset parent values
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <EditorCard
          title="Sibling A"
          mode={mode}
          liftedValue={leftValue}
          onLiftedChange={setLeftValue}
        />
        <EditorCard
          title="Sibling B"
          mode={mode}
          liftedValue={rightValue}
          onLiftedChange={setRightValue}
        />
      </div>
    </div>
  )
}
