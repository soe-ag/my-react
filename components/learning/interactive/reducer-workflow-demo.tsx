'use client'

import { useReducer } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type ReducerState = {
  count: number
  history: string[]
}

type ReducerAction = { type: 'add'; amount: number } | { type: 'undo' } | { type: 'reset' }

const initialState: ReducerState = {
  count: 0,
  history: [],
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case 'add': {
      const nextCount = state.count + action.amount
      const nextHistory = [`add ${action.amount} -> ${nextCount}`, ...state.history].slice(0, 8)
      return {
        count: nextCount,
        history: nextHistory,
      }
    }
    case 'undo': {
      if (state.history.length === 0) {
        return state
      }
      const [latest, ...rest] = state.history
      const undoValue = Number(latest.split(' ')[1])
      if (Number.isNaN(undoValue)) {
        return state
      }
      return {
        count: state.count - undoValue,
        history: rest,
      }
    }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export function ReducerWorkflowDemo() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Reducer Controls</CardTitle>
          <CardDescription>Dispatch actions and watch state transitions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Current count</p>
            <p className="text-4xl font-semibold tracking-tight">{state.count}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => dispatch({ type: 'add', amount: 1 })}>Dispatch add 1</Button>
            <Button variant="secondary" onClick={() => dispatch({ type: 'add', amount: 5 })}>
              Dispatch add 5
            </Button>
            <Button variant="outline" onClick={() => dispatch({ type: 'undo' })}>
              Undo last action
            </Button>
            <Button variant="ghost" onClick={() => dispatch({ type: 'reset' })}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reducer History</CardTitle>
          <CardDescription>One reducer controls both count and timeline.</CardDescription>
        </CardHeader>
        <CardContent>
          {state.history.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Dispatch actions to inspect deterministic transitions.
            </p>
          ) : (
            <ul className="grid gap-2 rounded-xl bg-[linear-gradient(180deg,oklch(0.99_0.008_84/.88),oklch(0.975_0.014_210/.62))] p-3">
              {state.history.map((entry) => (
                <li
                  key={entry}
                  className="rounded-lg bg-background/90 px-3 py-2.5 text-sm shadow-[inset_0_0_0_1px_oklch(0.76_0.018_230/.42)]"
                >
                  {entry}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
