'use client'

import { useMemo, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const dataset = Array.from({ length: 1200 }, (_, index) => `Hook lesson item ${index + 1}`)

function expensiveFilter(items: string[], query: string) {
  const normalized = query.trim().toLowerCase()

  for (let i = 0; i < 28000; i += 1) {
    Math.sqrt(i * 11)
  }

  if (!normalized) {
    return items.slice(0, 60)
  }

  return items.filter((item) => item.toLowerCase().includes(normalized)).slice(0, 60)
}

export function TransitionSearchDemo() {
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [useTransitionMode, setUseTransitionMode] = useState(true)

  const visibleItems = useMemo(() => expensiveFilter(dataset, filterQuery), [filterQuery])

  function onQueryChange(value: string) {
    setQuery(value)

    if (useTransitionMode) {
      startTransition(() => {
        setFilterQuery(value)
      })
      return
    }

    setFilterQuery(value)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Transition Controls</CardTitle>
          <CardDescription>
            Keep typing urgent while large filtering updates are deferred.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="transition-query" className="text-sm font-medium">
              Search list
            </label>
            <Input
              id="transition-query"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Type quickly and compare modes"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={useTransitionMode ? 'default' : 'outline'}
              onClick={() => setUseTransitionMode(true)}
            >
              Transition mode
            </Button>
            <Button
              size="sm"
              variant={!useTransitionMode ? 'default' : 'outline'}
              onClick={() => setUseTransitionMode(false)}
            >
              Immediate mode
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Pending state: {isPending ? 'Rendering deferred update...' : 'Idle'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filtered Results</CardTitle>
          <CardDescription>
            Showing {visibleItems.length} items from a large dataset.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 rounded-xl bg-[linear-gradient(180deg,oklch(0.99_0.008_84/.88),oklch(0.975_0.014_210/.62))] p-3">
            {visibleItems.map((item) => (
              <li
                key={item}
                className="rounded-lg bg-background/90 px-3 py-2.5 text-sm shadow-[inset_0_0_0_1px_oklch(0.76_0.018_230/.42)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
