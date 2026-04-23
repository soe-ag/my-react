import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { reactPatternLessons } from '@/lib/react-patterns-curriculum'
import { cn } from '@/lib/utils'

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
    </div>
  )
}
