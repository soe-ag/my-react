'use client'

import Link from 'next/link'

import { useLearningProgress } from '@/components/learning/progress-provider'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { HookLesson } from '@/lib/hooks-curriculum'
import { cn } from '@/lib/utils'

type HooksLessonGridProps = {
  lessons: HookLesson[]
}

export function HooksLessonGrid({ lessons }: HooksLessonGridProps) {
  const { hydrated, isCompleted } = useLearningProgress()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {lessons.map((lesson) => {
        const completed = hydrated && isCompleted(lesson.slug)
        const isClickable = lesson.availability === 'available'

        return (
          <Card
            key={lesson.slug}
            className={cn(
              'group/lesson relative overflow-hidden',
              isClickable &&
                'clickable-card border-primary/25 shadow-[0_8px_24px_oklch(0.42_0.09_210/0.1)]'
            )}
          >
            {isClickable ? (
              <Link
                href={`/hooks/${lesson.slug}`}
                className="absolute inset-0 z-10 rounded-xl"
                aria-label={`Open ${lesson.title} lesson`}
                tabIndex={-1}
              />
            ) : null}
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{lesson.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={completed ? 'secondary' : 'outline'}>
                    {completed ? 'Completed' : 'In progress'}
                  </Badge>
                  <Badge variant={lesson.availability === 'available' ? 'default' : 'outline'}>
                    {lesson.availability === 'available' ? 'Ready' : 'Soon'}
                  </Badge>
                </div>
              </div>
              <CardDescription>{lesson.tagline}</CardDescription>
            </CardHeader>
            <CardContent className="relative z-20 flex h-full flex-col gap-3 text-sm text-muted-foreground">
              <p className="flex-1">{lesson.problem}</p>
              {lesson.availability !== 'available' ? (
                <p className="text-xs">Planned in the next sprint.</p>
              ) : null}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
