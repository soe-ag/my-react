'use client'

import { createContext, useContext, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Mode = 'combined' | 'composed'

type CombinedValue = {
  theme: 'light' | 'dark'
  locale: 'en' | 'fr'
  toggleTheme: () => void
  toggleLocale: () => void
}

const CombinedContext = createContext<CombinedValue | null>(null)
const ThemeContext = createContext<{ theme: 'light' | 'dark'; toggleTheme: () => void } | null>(
  null
)
const LocaleContext = createContext<{ locale: 'en' | 'fr'; toggleLocale: () => void } | null>(null)

function useCombined() {
  const value = useContext(CombinedContext)
  if (!value) {
    throw new Error('Combined context must be used inside provider')
  }
  return value
}

function useThemeValue() {
  const value = useContext(ThemeContext)
  if (!value) {
    throw new Error('Theme context must be used inside provider')
  }
  return value
}

function useLocaleValue() {
  const value = useContext(LocaleContext)
  if (!value) {
    throw new Error('Locale context must be used inside provider')
  }
  return value
}

function ThemeConsumerCombined() {
  const renderCount = useRef(0)
  renderCount.current += 1
  const ctx = useCombined()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Consumer</CardTitle>
        <CardDescription>Renders: {renderCount.current}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Theme: {ctx.theme}</p>
        <Button size="sm" variant="outline" onClick={ctx.toggleTheme}>
          Toggle theme
        </Button>
      </CardContent>
    </Card>
  )
}

function LocaleConsumerCombined() {
  const renderCount = useRef(0)
  renderCount.current += 1
  const ctx = useCombined()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Locale Consumer</CardTitle>
        <CardDescription>Renders: {renderCount.current}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Locale: {ctx.locale}</p>
        <Button size="sm" variant="outline" onClick={ctx.toggleLocale}>
          Toggle locale
        </Button>
      </CardContent>
    </Card>
  )
}

function ThemeConsumerSplit() {
  const renderCount = useRef(0)
  renderCount.current += 1
  const ctx = useThemeValue()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Consumer</CardTitle>
        <CardDescription>Renders: {renderCount.current}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Theme: {ctx.theme}</p>
        <Button size="sm" variant="outline" onClick={ctx.toggleTheme}>
          Toggle theme
        </Button>
      </CardContent>
    </Card>
  )
}

function LocaleConsumerSplit() {
  const renderCount = useRef(0)
  renderCount.current += 1
  const ctx = useLocaleValue()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Locale Consumer</CardTitle>
        <CardDescription>Renders: {renderCount.current}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Locale: {ctx.locale}</p>
        <Button size="sm" variant="outline" onClick={ctx.toggleLocale}>
          Toggle locale
        </Button>
      </CardContent>
    </Card>
  )
}

export function ContextCompositionDemo() {
  const [mode, setMode] = useState<Mode>('combined')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [locale, setLocale] = useState<'en' | 'fr'>('en')

  const combinedValue = useMemo<CombinedValue>(
    () => ({
      theme,
      locale,
      toggleTheme: () => setTheme((previous) => (previous === 'light' ? 'dark' : 'light')),
      toggleLocale: () => setLocale((previous) => (previous === 'en' ? 'fr' : 'en')),
    }),
    [theme, locale]
  )

  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((previous) => (previous === 'light' ? 'dark' : 'light')),
    }),
    [theme]
  )

  const localeValue = useMemo(
    () => ({
      locale,
      toggleLocale: () => setLocale((previous) => (previous === 'en' ? 'fr' : 'en')),
    }),
    [locale]
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Provider Architecture Mode</CardTitle>
          <CardDescription>
            Compare one combined context versus composed split providers.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={mode === 'combined' ? 'default' : 'outline'}
            onClick={() => setMode('combined')}
          >
            Combined context
          </Button>
          <Button
            size="sm"
            variant={mode === 'composed' ? 'default' : 'outline'}
            onClick={() => setMode('composed')}
          >
            Composed providers
          </Button>
        </CardContent>
      </Card>

      {mode === 'combined' ? (
        <CombinedContext.Provider value={combinedValue}>
          <div className="grid gap-4 md:grid-cols-2">
            <ThemeConsumerCombined />
            <LocaleConsumerCombined />
          </div>
        </CombinedContext.Provider>
      ) : (
        <ThemeContext.Provider value={themeValue}>
          <LocaleContext.Provider value={localeValue}>
            <div className="grid gap-4 md:grid-cols-2">
              <ThemeConsumerSplit />
              <LocaleConsumerSplit />
            </div>
          </LocaleContext.Provider>
        </ThemeContext.Provider>
      )}
    </div>
  )
}
