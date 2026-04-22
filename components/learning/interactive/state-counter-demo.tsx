'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type EventEntry = {
  id: number
  label: string
}

function createEvent(label: string): EventEntry {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    label,
  }
}

export function StateCounterDemo() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [events, setEvents] = useState<EventEntry[]>([])

  const totalActions = useMemo(() => events.length, [events])

  function pushEvent(label: string) {
    setEvents((prev) => [createEvent(label), ...prev].slice(0, 8))
  }

  function incrementDirect() {
    setCount(count + step)
    pushEvent(`Direct update: count + ${step}`)
  }

  function incrementFunctional() {
    setCount((previous) => previous + step)
    pushEvent(`Functional update: previous + ${step}`)
  }

  function resetAll() {
    setCount(0)
    setStep(1)
    setEvents([])
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>State Playground</CardTitle>
          <CardDescription>Compare direct updates and functional updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Current count</p>
            <p className="text-4xl font-semibold tracking-tight">{count}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setStep(1)}>
              Step 1
            </Button>
            <Button variant="outline" size="sm" onClick={() => setStep(2)}>
              Step 2
            </Button>
            <Button variant="outline" size="sm" onClick={() => setStep(5)}>
              Step 5
            </Button>
            <p className="self-center text-sm text-muted-foreground">Active step: {step}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={incrementDirect}>Direct Update</Button>
            <Button variant="secondary" onClick={incrementFunctional}>
              Functional Update
            </Button>
            <Button variant="ghost" onClick={resetAll}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>State Timeline</CardTitle>
          <CardDescription>
            Actions logged: {totalActions}. Watch how updates stack.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Trigger some updates to build your event timeline.
            </p>
          ) : (
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="rounded-md border bg-background px-3 py-2 text-sm">
                  {event.label}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
