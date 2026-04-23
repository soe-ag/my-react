import { notFound } from 'next/navigation'
import {
  getAllJsQuestions,
  getJsQuestionsPage,
  getTotalPages,
  QUESTIONS_PER_PAGE,
} from '@/lib/js-questions-parser'
import { QuizPageClient } from '@/components/quiz/quiz-page-client'

type Props = {
  params: Promise<{ page: string }>
}

export async function generateStaticParams() {
  const totalPages = getTotalPages()
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export async function generateMetadata({ params }: Props) {
  const { page: pageStr } = await params
  const page = parseInt(pageStr, 10)
  const totalQuestions = getAllJsQuestions().length
  const totalPages = getTotalPages()
  const start = (page - 1) * QUESTIONS_PER_PAGE + 1
  const end = Math.min(page * QUESTIONS_PER_PAGE, totalQuestions)
  return {
    title: `JS Questions: Page ${page} (Q${start}–Q${end}) | Hook Lab`,
    description: `JavaScript quiz questions ${start} to ${end} of ${totalQuestions}. Page ${page} of ${totalPages}.`,
  }
}

export default async function QuizPage({ params }: Props) {
  const { page: pageStr } = await params
  const page = parseInt(pageStr, 10)
  const totalPages = getTotalPages()

  if (isNaN(page) || page < 1 || page > totalPages) {
    notFound()
  }

  const questions = getJsQuestionsPage(page)
  const pageStart = (page - 1) * QUESTIONS_PER_PAGE + 1

  return (
    <QuizPageClient
      questions={questions}
      page={page}
      totalPages={totalPages}
      pageStart={pageStart}
    />
  )
}
