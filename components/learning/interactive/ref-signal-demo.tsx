'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function RefSignalDemo() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const interactionCountRef = useRef(0)

  const [displayCount, setDisplayCount] = useState(0)
  const [draft, setDraft] = useState('')

  function trackInteraction() {
    interactionCountRef.current += 1
  }

  function syncRefToUi() {
    setDisplayCount(interactionCountRef.current)
  }

  function focusInput() {
    inputRef.current?.focus()
    trackInteraction()
  }

  function clearAndFocus() {
    setDraft('')
    inputRef.current?.focus()
    trackInteraction()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ref Playground</CardTitle>
          <CardDescription>Ref updates do not rerender until you sync to state.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="focusable" className="text-sm font-medium">
              Focus target
            </label>
            <Input
              id="focusable"
              ref={inputRef}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)
                trackInteraction()
              }}
              placeholder="Type here, then test ref controls"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={focusInput}>
              Focus input
            </Button>
            <Button variant="outline" onClick={clearAndFocus}>
              Clear + focus
            </Button>
            <Button onClick={syncRefToUi}>Sync ref count</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mutable Signal</CardTitle>
          <CardDescription>Compare hidden ref count versus rendered state.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Synced UI value (state): {displayCount}</p>
          <p>
            Press actions several times without syncing. The internal ref keeps changing, but this
            panel only updates when you press Sync and move the value into state.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
