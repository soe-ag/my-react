'use client'

import { memo, Profiler, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Mode = 'unoptimized' | 'optimized'

type ProfilingLog = {
  id: string
  phase: string
  actualDuration: number
}

const baseItems = Array.from({ length: 900 }, (_, index) => `Row ${index + 1}`)

function heavyProjection(source: string[], query: string) {
  const normalized = query.toLowerCase()

  for (let i = 0; i < 22000; i += 1) {
    Math.sqrt(i * 9)
  }

  if (!normalized) {
    return source.slice(0, 80)
  }

  return source.filter((item) => item.toLowerCase().includes(normalized)).slice(0, 80)
}

const OptimizedList = memo(function OptimizedList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 rounded-xl bg-[linear-gradient(180deg,oklch(0.99_0.008_84/.88),oklch(0.975_0.014_210/.62))] p-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg bg-background/90 px-3 py-2.5 text-sm shadow-[inset_0_0_0_1px_oklch(0.76_0.018_230/.42)]"
        >
          {item}
        </li>
      ))}
    </ul>
  )
})

function UnoptimizedList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 rounded-xl bg-[linear-gradient(180deg,oklch(0.99_0.008_84/.88),oklch(0.975_0.014_210/.62))] p-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg bg-background/90 px-3 py-2.5 text-sm shadow-[inset_0_0_0_1px_oklch(0.76_0.018_230/.42)]"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function RenderProfilingDemo() {
  const [mode, setMode] = useState<Mode>('unoptimized')
  const [query, setQuery] = useState('')
  const [tick, setTick] = useState(0)
  const [, setLogViewTick] = useState(0)
  const logsRef = useRef<ProfilingLog[]>([])

  const renderCountRef = useRef(0)
  renderCountRef.current += 1

  const optimizedItems = useMemo(() => heavyProjection(baseItems, query), [query])
  const unoptimizedItems = heavyProjection(baseItems, query)

  function onRender(
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number
  ) {
    logsRef.current = [
      { id, phase, actualDuration: Number(actualDuration.toFixed(2)) },
      ...logsRef.current,
    ].slice(0, 6)
  }

  const items = mode === 'optimized' ? optimizedItems : unoptimizedItems

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Profiling Controls</CardTitle>
          <CardDescription>
            Compare rerender cost before and after targeted optimization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={mode === 'unoptimized' ? 'default' : 'outline'}
              onClick={() => setMode('unoptimized')}
            >
              Unoptimized
            </Button>
            <Button
              size="sm"
              variant={mode === 'optimized' ? 'default' : 'outline'}
              onClick={() => setMode('optimized')}
            >
              Optimized
            </Button>
            <Button size="sm" variant="outline" onClick={() => setTick((value) => value + 1)}>
              Unrelated rerender: {tick}
            </Button>
          </div>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter rows"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />

          <p className="text-sm text-muted-foreground">
            Parent render count: {renderCountRef.current}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rendered List</CardTitle>
            <CardDescription>
              Mode:{' '}
              {mode === 'optimized'
                ? 'Memoized projection + memoized list'
                : 'Always recompute + plain list'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Profiler id="rows-list" onRender={onRender}>
              {mode === 'optimized' ? (
                <OptimizedList items={items} />
              ) : (
                <UnoptimizedList items={items} />
              )}
            </Profiler>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2">
            <div className="space-y-1">
              <CardTitle>Profiler Log</CardTitle>
              <CardDescription>Recent commit durations from React Profiler.</CardDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setLogViewTick((value) => value + 1)}
            >
              Refresh log
            </Button>
          </CardHeader>
          <CardContent>
            {/**
             * Profiler callback must not call setState directly, or it can create
             * a render loop. Entries are stored in a ref and shown on next interaction.
             */}
            {logsRef.current.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Interact to capture profiling entries.
              </p>
            ) : (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {logsRef.current.map((entry, index) => (
                  <li
                    key={`${entry.phase}-${entry.actualDuration}-${index}`}
                    className="rounded-md border bg-background px-3 py-2"
                  >
                    {entry.id} - {entry.phase} - {entry.actualDuration}ms
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
