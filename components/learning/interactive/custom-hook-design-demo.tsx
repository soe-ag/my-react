'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Mode = 'inline' | 'hook'

function useVoteCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const status = useMemo(() => {
    if (count >= 5) {
      return 'High engagement'
    }
    if (count <= -3) {
      return 'Needs review'
    }
    return 'Neutral'
  }, [count])

  return {
    count,
    status,
    upvote: () => setCount((previous) => previous + 1),
    downvote: () => setCount((previous) => previous - 1),
    reset: () => setCount(initialValue),
  }
}

function VoteCardInline({ title }: { title: string }) {
  const [count, setCount] = useState(0)

  const status = useMemo(() => {
    if (count >= 5) {
      return 'High engagement'
    }
    if (count <= -3) {
      return 'Needs review'
    }
    return 'Neutral'
  }, [count])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Inline logic in component body.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Count: {count}</p>
        <p className="text-sm text-muted-foreground">Status: {status}</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => setCount((previous) => previous + 1)}>
            Upvote
          </Button>
          <Button size="sm" variant="outline" onClick={() => setCount((previous) => previous - 1)}>
            Downvote
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function VoteCardHook({ title }: { title: string }) {
  const votes = useVoteCounter(0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Behavior extracted to a focused custom hook.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Count: {votes.count}</p>
        <p className="text-sm text-muted-foreground">Status: {votes.status}</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={votes.upvote}>
            Upvote
          </Button>
          <Button size="sm" variant="outline" onClick={votes.downvote}>
            Downvote
          </Button>
          <Button size="sm" variant="ghost" onClick={votes.reset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function CustomHookDesignDemo() {
  const [mode, setMode] = useState<Mode>('inline')

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Behavior Reuse Strategy</CardTitle>
          <CardDescription>
            Compare duplicated inline behavior against custom hook extraction.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={mode === 'inline' ? 'default' : 'outline'}
            onClick={() => setMode('inline')}
          >
            Inline logic mode
          </Button>
          <Button
            size="sm"
            variant={mode === 'hook' ? 'default' : 'outline'}
            onClick={() => setMode('hook')}
          >
            Custom hook mode
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {mode === 'inline' ? (
          <>
            <VoteCardInline title="Article Feedback" />
            <VoteCardInline title="Comment Feedback" />
          </>
        ) : (
          <>
            <VoteCardHook title="Article Feedback" />
            <VoteCardHook title="Comment Feedback" />
          </>
        )}
      </div>
    </div>
  )
}
