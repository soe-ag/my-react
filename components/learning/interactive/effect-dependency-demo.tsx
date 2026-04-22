'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type EffectLog = {
  id: number
  text: string
}

function nextLog(text: string): EffectLog {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    text,
  }
}

export function EffectDependencyDemo() {
  const [query, setQuery] = useState('react')
  const [onlyStable, setOnlyStable] = useState(false)
  const [result, setResult] = useState('Waiting for first sync...')
  const [logs, setLogs] = useState<EffectLog[]>([])

  function pushLog(text: string) {
    setLogs((prev) => [nextLog(text), ...prev].slice(0, 10))
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      pushLog(`Effect committed for query=\"${query}\" and onlyStable=${onlyStable}`)
      setResult(`Synced result for \"${query}\" (${onlyStable ? 'stable only' : 'all patterns'})`)
    }, 450)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [query, onlyStable])

  function onQueryChange(value: string) {
    setQuery(value)
    pushLog(`Dependency changed: query -> \"${value}\"`)
  }

  function onToggleStable() {
    setOnlyStable((previous) => {
      const next = !previous
      pushLog(`Dependency changed: onlyStable -> ${next}`)
      return next
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Dependency Explorer</CardTitle>
          <CardDescription>Changing dependencies causes cleanup then rerun.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="query" className="text-sm font-medium">
              Search Query
            </label>
            <Input
              id="query"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Type to trigger effect reruns"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant={onlyStable ? 'default' : 'outline'} size="sm" onClick={onToggleStable}>
              Toggle stable-only mode
            </Button>
            <p className="text-sm text-muted-foreground">{onlyStable ? 'On' : 'Off'}</p>
          </div>
          <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
            Latest sync: {result}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Effect Timeline</CardTitle>
          <CardDescription>Notice cleanup appears before new runs are finalized.</CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Interact with controls to observe the effect lifecycle.
            </p>
          ) : (
            <ul className="space-y-2">
              {logs.map((log) => (
                <li key={log.id} className="rounded-md border px-3 py-2 text-sm">
                  {log.text}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
