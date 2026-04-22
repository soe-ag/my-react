'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useLearningProgress } from '@/components/learning/progress-provider'

type MainNavProps = {
  totalLessons: number
}

export function MainNav({ totalLessons }: MainNavProps) {
  const { hydrated, progress, resetProgress } = useLearningProgress()
  const completedCount = progress.completedLessonSlugs.length

  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm font-semibold tracking-wide">
        Hook Lab
      </Link>
      <nav className="flex items-center gap-3 text-sm text-muted-foreground">
        <Link href="/hooks" className="hover:text-foreground">
          Curriculum
        </Link>
        <Link href="/patterns" className="hover:text-foreground">
          Patterns
        </Link>
        <Link href="/hooks/use-state" className="hover:text-foreground">
          First Lesson
        </Link>
        <span className="hidden rounded-md border px-2 py-1 text-xs sm:inline-flex">
          {hydrated ? `${completedCount}/${totalLessons} complete` : 'Loading progress...'}
        </span>
        <Button size="xs" variant="ghost" onClick={resetProgress}>
          Reset
        </Button>
      </nav>
    </div>
  )
}
