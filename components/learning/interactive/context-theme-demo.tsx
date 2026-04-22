'use client'

import { createContext, useContext, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type ThemeValue = {
  mode: 'light' | 'dark'
  accent: 'teal' | 'amber'
  toggleMode: () => void
  toggleAccent: () => void
}

const ThemeContext = createContext<ThemeValue | null>(null)

function useThemeContext() {
  const value = useContext(ThemeContext)
  if (!value) {
    throw new Error('Theme consumers must be nested under ThemeContext provider')
  }
  return value
}

function ThemeStatusCard() {
  const theme = useThemeContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Context Consumer A</CardTitle>
        <CardDescription>Reads mode and accent from provider.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Mode: {theme.mode}</p>
        <p>Accent: {theme.accent}</p>
      </CardContent>
    </Card>
  )
}

function ThemeActionsCard() {
  const theme = useThemeContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Context Consumer B</CardTitle>
        <CardDescription>Triggers provider updates from deep in the tree.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={theme.toggleMode}>
          Toggle mode
        </Button>
        <Button variant="outline" onClick={theme.toggleAccent}>
          Toggle accent
        </Button>
      </CardContent>
    </Card>
  )
}

export function ContextThemeDemo() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [accent, setAccent] = useState<'teal' | 'amber'>('teal')

  const value = useMemo<ThemeValue>(
    () => ({
      mode,
      accent,
      toggleMode: () => setMode((previous) => (previous === 'light' ? 'dark' : 'light')),
      toggleAccent: () => setAccent((previous) => (previous === 'teal' ? 'amber' : 'teal')),
    }),
    [mode, accent]
  )

  return (
    <ThemeContext.Provider value={value}>
      <div className="grid gap-4 md:grid-cols-2">
        <ThemeStatusCard />
        <ThemeActionsCard />
      </div>
    </ThemeContext.Provider>
  )
}
