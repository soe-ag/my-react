'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { JsQuestion } from '@/lib/js-questions-parser'

type Props = {
  questions: JsQuestion[]
  page: number
  totalPages: number
  pageStart: number
}

export function QuizPageClient({ questions, page, totalPages, pageStart }: Props) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  const totalAnswered = Object.keys(selectedAnswers).length
  const totalCorrect = Object.entries(selectedAnswers).filter(
    ([idx, ans]) => questions[Number(idx)].answer === ans
  ).length

  function selectAnswer(questionIdx: number, label: string) {
    if (revealed.has(questionIdx)) return
    setSelectedAnswers((prev) => ({ ...prev, [questionIdx]: label }))
    setRevealed((prev) => new Set(prev).add(questionIdx))
  }

  function resetPage() {
    setSelectedAnswers({})
    setRevealed(new Set())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const progressPct = Math.round((totalAnswered / questions.length) * 100)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/quiz"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            All Pages
          </Link>
          <h1 className="text-2xl font-bold">
            Page {page}
            <span className="ml-2 text-base font-normal text-muted-foreground">/ {totalPages}</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Questions {pageStart}–{pageStart + questions.length - 1}
          </p>
        </div>

        {/* Score pill */}
        {totalAnswered > 0 && (
          <div className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2 text-sm">
            <span className="font-semibold text-green-600 dark:text-green-400">{totalCorrect}</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold">{totalAnswered}</span>
            <span className="text-muted-foreground">correct</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-8 space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{totalAnswered} answered</span>
          <span>{questions.length - totalAnswered} remaining</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question list */}
      <div className="space-y-6">
        {questions.map((question, idx) => {
          const isRevealed = revealed.has(idx)
          const selected = selectedAnswers[idx]

          return (
            <QuestionCard
              key={question.number}
              question={question}
              questionIdx={idx}
              selected={selected}
              isRevealed={isRevealed}
              onSelect={(label) => selectAnswer(idx, label)}
            />
          )
        })}
      </div>

      {/* Bottom navigation */}
      <div className="mt-10 flex items-center justify-between gap-4 border-t pt-8">
        <Button variant="outline" size="sm" onClick={resetPage} className="gap-1.5">
          <RotateCcw className="h-4 w-4" />
          Reset page
        </Button>

        <div className="flex gap-3">
          {page > 1 && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/quiz/${page - 1}`} className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Page {page - 1}
              </Link>
            </Button>
          )}
          {page < totalPages && (
            <Button size="sm" asChild>
              <Link href={`/quiz/${page + 1}`} className="gap-1">
                Page {page + 1}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {page === totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/quiz">Back to overview</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Individual question card ──────────────────────────────────────────────────

type QuestionCardProps = {
  question: JsQuestion
  questionIdx: number
  selected: string | undefined
  isRevealed: boolean
  onSelect: (label: string) => void
}

function QuestionCard({
  question,
  questionIdx: _idx,
  selected,
  isRevealed,
  onSelect,
}: QuestionCardProps) {
  const isCorrect = selected === question.answer

  return (
    <div
      className={cn(
        'rounded-2xl border bg-card transition-all duration-200',
        isRevealed && isCorrect && 'border-green-500/40 bg-green-500/5',
        isRevealed && !isCorrect && 'border-red-500/40 bg-red-500/5'
      )}
    >
      {/* Question header */}
      <div className="flex items-start gap-3 border-b px-5 py-4">
        <span className="mt-px inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
          {question.number}
        </span>
        <p className="text-sm font-medium leading-relaxed text-foreground">{question.title}</p>
      </div>

      {/* Code block */}
      {question.code && (
        <div className="border-b bg-zinc-950 dark:bg-zinc-900">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-zinc-500">javascript</span>
          </div>
          <pre className="overflow-x-auto px-5 py-4 text-xs leading-relaxed text-zinc-100">
            <code>{question.code}</code>
          </pre>
        </div>
      )}

      {/* Options */}
      <div className="space-y-2 p-4">
        {question.options.map((option) => {
          const isThisSelected = selected === option.label
          const isThisCorrect = option.label === question.answer
          const showCorrect = isRevealed && isThisCorrect
          const showWrong = isRevealed && isThisSelected && !isThisCorrect

          return (
            <button
              key={option.label}
              onClick={() => onSelect(option.label)}
              disabled={isRevealed}
              className={cn(
                'flex w-full cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-150',
                // Default
                !isRevealed && 'hover:border-primary/40 hover:bg-primary/5',
                // Correct answer
                showCorrect &&
                  'border-green-500/60 bg-green-500/10 text-green-700 dark:text-green-400',
                // Wrong selection
                showWrong && 'border-red-500/60 bg-red-500/10 text-red-700 dark:text-red-400',
                // Unselected after reveal
                isRevealed && !showCorrect && !showWrong && 'cursor-default opacity-50',
                // Selected before reveal (shouldn't happen but guard)
                isThisSelected && !isRevealed && 'border-primary/50 bg-primary/10'
              )}
            >
              <span
                className={cn(
                  'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold',
                  showCorrect && 'border-green-500 bg-green-500 text-white',
                  showWrong && 'border-red-500 bg-red-500 text-white',
                  !showCorrect && !showWrong && 'border-current'
                )}
              >
                {option.label}
              </span>
              <span className="leading-relaxed">{option.text}</span>
              {showCorrect && (
                <CheckCircle2 className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-green-500" />
              )}
              {showWrong && <XCircle className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-red-500" />}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {isRevealed && question.explanation && (
        <div
          className={cn(
            'rounded-b-2xl border-t px-5 py-4',
            isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
          )}
        >
          <div className="mb-2 flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  Correct! Answer: {question.answer}
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                  Incorrect. Correct answer: {question.answer}
                </span>
              </>
            )}
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
