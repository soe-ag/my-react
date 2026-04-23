import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const plannedPatterns = [
  'Controlled forms and validation boundaries',
  'Lifting and colocating state intentionally',
  'Context architecture and provider composition',
  'Custom hooks for reusable behavior',
  'Render behavior and performance profiling',
]

export default function PatternsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Next track</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Broader React Patterns
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          This route reserves the second taxonomy level so the app can expand beyond core hooks.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Planned learning modules</CardTitle>
          <CardDescription>
            These patterns will be implemented after the core-hook phase is complete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 rounded-xl bg-[linear-gradient(180deg,oklch(0.99_0.008_84/.88),oklch(0.975_0.014_210/.62))] p-3 text-sm text-muted-foreground">
            {plannedPatterns.map((pattern) => (
              <li
                key={pattern}
                className="rounded-lg bg-background/90 px-3 py-2.5 shadow-[inset_0_0_0_1px_oklch(0.76_0.018_230/.42)]"
              >
                {pattern}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
