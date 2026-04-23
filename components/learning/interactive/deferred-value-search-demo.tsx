'use client'

import { useDeferredValue, useMemo, useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const dataset = Array.from({ length: 1200 }, (_, index) => `Search item ${index + 1}`)

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

export function DeferredValueSearchDemo() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const visibleItems = useMemo(() => expensiveFilter(dataset, deferredQuery), [deferredQuery])
  const isLagging = query !== deferredQuery

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Deferred Input Flow</CardTitle>
          <CardDescription>
            Input stays immediate while heavy list updates follow deferred query.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="deferred-query" className="text-sm font-medium">
              Search query
            </label>
            <Input
              id="deferred-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type quickly to compare immediate and deferred values"
            />
          </div>

          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              Immediate query:{' '}
              <span className="font-medium text-foreground/85">{query || '(empty)'}</span>
            </p>
            <p>
              Deferred query:{' '}
              <span className="font-medium text-foreground/85">{deferredQuery || '(empty)'}</span>
            </p>
            <p>
              Lag status:{' '}
              <span
                className={
                  isLagging ? 'text-amber-600 font-medium' : 'text-emerald-700 font-medium'
                }
              >
                {isLagging ? 'Deferred value catching up' : 'Synchronized'}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filtered Results</CardTitle>
          <CardDescription>
            Results are computed from deferred query over a large list.
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
