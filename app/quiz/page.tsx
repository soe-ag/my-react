import Link from 'next/link'
import { getAllJsQuestions, getTotalPages, QUESTIONS_PER_PAGE } from '@/lib/js-questions-parser'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'JavaScript Questions | Hook Lab',
  description: 'Test your JavaScript knowledge with 155 questions from basic to advanced topics.',
}

export default function QuizIndexPage() {
  const totalQuestions = getAllJsQuestions().length
  const totalPages = getTotalPages()

  const pages = Array.from({ length: totalPages }, (_, i) => {
    const pageNum = i + 1
    const start = (pageNum - 1) * QUESTIONS_PER_PAGE + 1
    const end = Math.min(pageNum * QUESTIONS_PER_PAGE, totalQuestions)
    return { pageNum, start, end, count: end - start + 1 }
  })

  const topics = [
    { page: 1, label: 'Hoisting, Closures, Scope' },
    { page: 2, label: 'Prototypes, Classes, this' },
    { page: 3, label: 'Type Coercion, Equality' },
    { page: 4, label: 'Async, Promises, Event Loop' },
    { page: 5, label: 'Generators, Iterators' },
    { page: 6, label: 'Spread, Destructuring, Modules' },
    { page: 7, label: 'WeakMap, Proxy, Reflect' },
    { page: 8, label: 'Tagged Templates, Advanced Patterns' },
  ]

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <Badge
          variant="secondary"
          className="mb-4 rounded-full bg-amber-500/10 px-4 py-1 text-amber-600 dark:text-amber-400"
        >
          JavaScript Quiz
        </Badge>
        <h1 className="mb-3 text-4xl font-bold tracking-tight">JavaScript Questions</h1>
        <p className="mx-auto max-w-xl text-base text-muted-foreground">
          From basic to advanced — test how well you know JavaScript. {totalQuestions} questions
          across {totalPages} pages, 20 questions each.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Based on{' '}
          <a
            href="https://github.com/lydiahallie/javascript-questions"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            javascript-questions
          </a>{' '}
          by Lydia Hallie
        </p>
      </div>

      {/* Stats row */}
      <div className="mb-10 grid grid-cols-3 gap-4 rounded-2xl border bg-card p-6 text-center">
        <div>
          <p className="text-3xl font-bold text-primary">{totalQuestions}</p>
          <p className="text-sm text-muted-foreground">Questions</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">{totalPages}</p>
          <p className="text-sm text-muted-foreground">Pages</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">{QUESTIONS_PER_PAGE}</p>
          <p className="text-sm text-muted-foreground">Per Page</p>
        </div>
      </div>

      {/* Page cards grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {pages.map(({ pageNum, start, end, count }) => {
          const topic = topics.find((t) => t.page === pageNum)
          return (
            <Link key={pageNum} href={`/quiz/${pageNum}`} className="group block">
              <Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                      {pageNum}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {count} questions
                    </Badge>
                  </div>
                  <CardTitle className="mt-3 text-base">
                    Questions {start}–{end}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {topic?.label ?? 'Mixed JavaScript Topics'}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Start quiz
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
