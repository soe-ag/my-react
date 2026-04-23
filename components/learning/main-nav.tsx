'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLearningProgress } from '@/components/learning/progress-provider'

type MainNavProps = {
  totalLessons: number
  lessons: Array<{
    slug: string
    title: string
    availability: 'available' | 'coming-soon'
    track: 'hooks' | 'patterns'
    href: string
  }>
}

export function MainNav({ totalLessons, lessons }: MainNavProps) {
  const { hydrated, progress, resetProgress } = useLearningProgress()
  const pathname = usePathname()
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
        <Link href="/quiz" className={navLinkClass}>
          JS Quiz
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors hover:bg-accent/50 hover:text-foreground"
            >
              Lessons
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            <DropdownMenuLabel>Jump To Lesson</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">Hooks</DropdownMenuLabel>
            {lessons
              .filter((lesson) => lesson.track === 'hooks')
              .map((lesson) => {
                const isActive = pathname === lesson.href

                return (
                  <DropdownMenuItem
                    key={lesson.slug}
                    asChild
                    className={isActive ? 'bg-accent/35 font-medium text-foreground' : undefined}
                  >
                    <Link href={lesson.href}>
                      <span>{lesson.title}</span>
                      {lesson.availability === 'coming-soon' ? (
                        <span className="ml-auto text-xs text-muted-foreground">Soon</span>
                      ) : null}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Patterns
            </DropdownMenuLabel>
            {lessons
              .filter((lesson) => lesson.track === 'patterns')
              .map((lesson) => {
                const isActive = pathname === lesson.href

                return (
                  <DropdownMenuItem
                    key={lesson.slug}
                    asChild
                    className={isActive ? 'bg-accent/35 font-medium text-foreground' : undefined}
                  >
                    <Link href={lesson.href}>
                      <span>{lesson.title}</span>
                      {lesson.availability === 'coming-soon' ? (
                        <span className="ml-auto text-xs text-muted-foreground">Soon</span>
                      ) : null}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
