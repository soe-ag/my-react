'use client'

import Link from 'next/link'

import { useLearningProgress } from '@/components/learning/progress-provider'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { HookLesson } from '@/lib/hooks-curriculum'

type HooksLessonGridProps = {
  lessons: HookLesson[]
}

export function HooksLessonGrid({ lessons }: HooksLessonGridProps) {
  const { hydrated, isCompleted } = useLearningProgress()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {lessons.map((lesson) => {
        const completed = hydrated && isCompleted(lesson.slug)

        return (
          <Card key={lesson.slug} className="relative overflow-hidden">
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
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{lesson.problem}</p>
              {lesson.availability === 'available' ? (
                <Link
                  href={`/hooks/${lesson.slug}`}
                  className="inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {completed ? 'Review lesson' : 'Open lesson'}
                </Link>
              ) : (
                <p className="text-xs">Planned in the next sprint.</p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
