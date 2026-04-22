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

  const navLinkClass =
    'rounded-full px-3 py-1.5 transition-colors hover:bg-accent/50 hover:text-foreground'

  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm font-semibold tracking-[0.12em] text-primary">
        Hook Lab
      </Link>
      <nav className="flex items-center gap-3 text-sm text-muted-foreground">
        <Link href="/hooks" className={navLinkClass}>
          Curriculum
        </Link>
        <Link href="/patterns" className={navLinkClass}>
          Patterns
        </Link>
        <Link href="/hooks/use-state" className={navLinkClass}>
          First Lesson
        </Link>
        <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary sm:inline-flex">
          {hydrated ? `${completedCount}/${totalLessons} complete` : 'Loading progress...'}
        </span>
        <Button size="xs" variant="ghost" onClick={resetProgress}>
          Reset
        </Button>
      </nav>
    </div>
  )
}
