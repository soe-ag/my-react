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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,oklch(0.88_0.12_42/.48),transparent_34%),radial-gradient(circle_at_86%_2%,oklch(0.86_0.13_196/.42),transparent_36%),radial-gradient(circle_at_50%_100%,oklch(0.9_0.07_146/.28),transparent_42%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="space-y-4 rounded-3xl border border-white/30 bg-[linear-gradient(135deg,oklch(0.98_0.018_72/.9),oklch(0.965_0.022_210/.85))] p-6 shadow-[0_14px_40px_oklch(0.45_0.12_210/0.16)] backdrop-blur sm:p-8">
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
            <Card
              key={mode.title}
              className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.85),oklch(0.97_0.018_78/.86))] shadow-[0_10px_28px_oklch(0.5_0.08_220/0.12)]"
            >
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
          <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(0.995_0.007_84/.92),oklch(0.965_0.02_64/.8))] shadow-[0_10px_28px_oklch(0.42_0.08_180/0.1)]">
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
