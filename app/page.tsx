import Link from 'next/link'

import { ProgressOverviewCard } from '@/components/learning/progress-overview-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAvailableHookLessons } from '@/lib/hooks-curriculum'

const learningModes = [
  {
    title: 'Explain',
    description:
      "Learn each hook with short focused context, then map it to React's internal mental model.",
  },
  {
    title: 'Explore',
    description:
      'Use live controls to watch state transitions, effect reruns, and dependency behavior in real time.',
  },
  {
    title: 'Practice',
    description:
      'Try guided mini-challenges that check understanding without requiring a full in-browser IDE.',
  },
]

export default function Home() {
  const availableLessons = getAvailableHookLessons()

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.92_0.11_80/.45),transparent_35%),radial-gradient(circle_at_80%_20%,oklch(0.9_0.09_200/.35),transparent_35%),linear-gradient(to_bottom,oklch(0.99_0_0),oklch(0.97_0_0))]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="space-y-4 rounded-3xl border bg-background/80 p-6 backdrop-blur sm:p-8">
          <Badge variant="outline" className="w-fit">
            React Hook Learning Lab
          </Badge>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Understand hooks through interactive explanations, not just notes.
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            This app teaches core hooks first, then expands into broader React patterns. Every
            lesson follows the same structure so concepts stay predictable while examples get
            deeper.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/hooks">Start Hook Track</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/hooks/use-state">Open First Lesson</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/patterns">See upcoming patterns</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {learningModes.map((mode) => (
            <Card key={mode.title}>
              <CardHeader>
                <CardTitle>{mode.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">{mode.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Ready now</CardTitle>
              <CardDescription>
                Available lessons in the first implementation phase.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {availableLessons.map((lesson) => (
                <Button key={lesson.slug} variant="secondary" asChild>
                  <Link href={`/hooks/${lesson.slug}`}>{lesson.title}</Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </section>

        <section>
          <ProgressOverviewCard
            availableLessonSlugs={availableLessons.map((lesson) => lesson.slug)}
          />
        </section>
      </div>
    </main>
  )
}
