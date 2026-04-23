'use client'

import { memo, useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type ChildButtonProps = {
  label: string
  onSelect: () => void
}

const ChildButton = memo(function ChildButton({ label, onSelect }: ChildButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="rounded-lg bg-[linear-gradient(145deg,oklch(0.995_0.01_86),oklch(0.97_0.02_214/.85))] px-3 py-2 text-sm font-medium text-foreground/90 shadow-[inset_0_0_0_1px_oklch(0.76_0.02_230/.42)] transition hover:brightness-[0.98]"
    >
      {label}
    </button>
  )
})

export function CallbackStabilityDemo() {
  const [selected, setSelected] = useState<string>('none')
  const [themeTick, setThemeTick] = useState(0)
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true)

  const stableSelectA = useCallback(() => setSelected('A'), [])
  const stableSelectB = useCallback(() => setSelected('B'), [])

  const inlineSelectA = () => setSelected('A')
  const inlineSelectB = () => setSelected('B')

  const onSelectA = useCallbackEnabled ? stableSelectA : inlineSelectA
  const onSelectB = useCallbackEnabled ? stableSelectB : inlineSelectB

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Callback Identity Explorer</CardTitle>
          <CardDescription>
            Toggle callback memoization, then trigger unrelated parent rerenders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={useCallbackEnabled ? 'secondary' : 'outline'}
              onClick={() => setUseCallbackEnabled((previous) => !previous)}
            >
              {useCallbackEnabled ? 'Using useCallback' : 'Inline callbacks'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setThemeTick((tick) => tick + 1)}>
              Unrelated parent rerender: {themeTick}
            </Button>
          </div>

          <div className="space-y-2 rounded-md border p-3">
            <p className="text-sm text-muted-foreground">
              Active mode:{' '}
              {useCallbackEnabled ? 'stable callback references' : 'new functions per render'}
            </p>
            <p className="text-sm text-muted-foreground">Selected child: {selected}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Memoized Children</CardTitle>
          <CardDescription>
            Child buttons are memoized. Stable callbacks help preserve their memoization boundary.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <ChildButton label="Select A" onSelect={onSelectA} />
          <ChildButton label="Select B" onSelect={onSelectB} />
        </CardContent>
      </Card>
    </div>
  )
}
