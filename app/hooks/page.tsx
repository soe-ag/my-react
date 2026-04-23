import { HooksLessonGrid } from '@/components/learning/hooks-lesson-grid'
import { hookLessons } from '@/lib/hooks-curriculum'
import { reactPatternLessons } from '@/lib/react-patterns-curriculum'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HooksIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3 rounded-2xl border border-white/30 bg-[linear-gradient(150deg,oklch(0.99_0.01_84/.9),oklch(0.96_0.025_192/.86))] p-5 shadow-[0_12px_26px_oklch(0.45_0.1_200/0.12)] sm:p-6">
        <p className="text-sm font-medium text-muted-foreground">Curriculum</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Learning Paths</h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Study in two grouped tracks: React Hooks for core APIs and React Patterns for scalable
          architecture decisions.
        </p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Hooks Lessons</h2>
            <p className="text-sm text-muted-foreground">
              Core React hook APIs and practical usage.
            </p>
          </div>
          <Badge variant="outline">Track 1</Badge>
        </div>
        <HooksLessonGrid lessons={hookLessons} />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Patterns Lessons</h2>
            <p className="text-sm text-muted-foreground">
              Component architecture, state boundaries, and performance thinking.
            </p>
          </div>
          <Badge variant="outline">Track 2</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {reactPatternLessons.map((lesson) => {
            const isReady = lesson.availability === 'available'

            return (
              <Card
                key={lesson.slug}
                className={cn(
                  'group/lesson relative overflow-hidden',
                  isReady &&
                    'clickable-card border-primary/25 shadow-[0_8px_24px_oklch(0.42_0.09_210/0.1)]'
                )}
              >
                {isReady ? (
                  <Link
                    href={`/patterns/${lesson.slug}`}
                    className="absolute inset-0 z-10 rounded-xl"
                    aria-label={`Open ${lesson.title} pattern lesson`}
                    tabIndex={-1}
                  />
                ) : null}
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>{lesson.title}</CardTitle>
                    <Badge variant={isReady ? 'default' : 'outline'}>
                      {isReady ? 'Ready' : 'Soon'}
                    </Badge>
                  </div>
                  <CardDescription>{lesson.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>{lesson.problem}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
