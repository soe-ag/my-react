'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type DemoItem = {
  id: number
  label: string
  category: 'core' | 'pattern'
}

const sourceItems: DemoItem[] = [
  { id: 1, label: 'useState counter', category: 'core' },
  { id: 2, label: 'useEffect cleanup', category: 'core' },
  { id: 3, label: 'Context theme provider', category: 'pattern' },
  { id: 4, label: 'Custom hook extraction', category: 'pattern' },
  { id: 5, label: 'Memoized list rendering', category: 'core' },
  { id: 6, label: 'Callback child contract', category: 'core' },
]

function expensiveFilter(items: DemoItem[], query: string, category: 'all' | 'core' | 'pattern') {
  const q = query.trim().toLowerCase()

  // Simulate expensive work to make memoization effects visible.
  for (let index = 0; index < 30000; index += 1) {
    Math.sqrt(index * 17)
  }

  return items.filter((item) => {
    const categoryMatch = category === 'all' ? true : item.category === category
    const queryMatch = q.length === 0 ? true : item.label.toLowerCase().includes(q)
    return categoryMatch && queryMatch
  })
}

export function MemoFilterDemo() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | 'core' | 'pattern'>('all')
  const [counter, setCounter] = useState(0)
  const [useMemoEnabled, setUseMemoEnabled] = useState(true)

  const memoizedResult = useMemo(
    () => expensiveFilter(sourceItems, query, category),
    [query, category]
  )

  const directResult = expensiveFilter(sourceItems, query, category)

  const visibleItems = useMemoEnabled ? memoizedResult : directResult

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Memoization Explorer</CardTitle>
          <CardDescription>
            Toggle memoization, then trigger unrelated rerenders with the counter.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="memo-query" className="text-sm font-medium">
              Search lessons
            </label>
            <Input
              id="memo-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by keyword"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={category === 'all' ? 'default' : 'outline'}
              onClick={() => setCategory('all')}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={category === 'core' ? 'default' : 'outline'}
              onClick={() => setCategory('core')}
            >
              Core
            </Button>
            <Button
              size="sm"
              variant={category === 'pattern' ? 'default' : 'outline'}
              onClick={() => setCategory('pattern')}
            >
              Pattern
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={useMemoEnabled ? 'secondary' : 'outline'}
              onClick={() => setUseMemoEnabled((previous) => !previous)}
            >
              {useMemoEnabled ? 'Using useMemo' : 'No memoization'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setCounter((value) => value + 1)}>
              Unrelated rerender: {counter}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filtered Output</CardTitle>
          <CardDescription>
            Items shown: {visibleItems.length}. With memoization on, unrelated rerenders reuse
            cached output.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {visibleItems.map((item) => (
              <li key={item.id} className="rounded-md border bg-background px-3 py-2 text-sm">
                {item.label}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
