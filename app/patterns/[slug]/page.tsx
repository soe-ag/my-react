import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { ContextCompositionDemo } from '@/components/learning/interactive/context-composition-demo'
import { ControlledFormsBoundaryDemo } from '@/components/learning/interactive/controlled-forms-boundary-demo'
import { StateColocationDemo } from '@/components/learning/interactive/state-colocation-demo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getReactPatternLesson, reactPatternLessons } from '@/lib/react-patterns-curriculum'

export async function generateStaticParams() {
  return reactPatternLessons.map((lesson) => ({ slug: lesson.slug }))
}

export default async function PatternLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = getReactPatternLesson(slug)

  if (!lesson) {
    notFound()
  }

  if (lesson.availability !== 'available') {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>{lesson.title} is coming soon</CardTitle>
            <CardDescription>
              This pattern lesson is planned for the next release wave.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/patterns">Back to patterns track</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const interactiveBySlug: Record<string, ReactNode> = {
    'state-colocation': <StateColocationDemo />,
    'controlled-forms': <ControlledFormsBoundaryDemo />,
    'context-composition': <ContextCompositionDemo />,
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3 rounded-2xl border border-white/30 bg-[linear-gradient(150deg,oklch(0.99_0.01_84/.9),oklch(0.96_0.025_192/.86))] p-5 shadow-[0_12px_26px_oklch(0.45_0.1_200/0.12)] sm:p-6">
        <p className="text-sm font-medium text-muted-foreground">Pattern Lesson</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{lesson.title}</h1>
        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">{lesson.tagline}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Problem Context</CardTitle>
            <CardDescription>
              Why this pattern matters for scalable React architecture.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            {lesson.problem}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              {lesson.explainLines.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Explore Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm leading-7 text-muted-foreground">
              {lesson.exploreSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {interactiveBySlug[slug] ?? (
        <Card>
          <CardHeader>
            <CardTitle>Interactive panel not found</CardTitle>
          </CardHeader>
          <CardContent>This pattern lesson does not have a live demo yet.</CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recap</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-muted-foreground">
          {lesson.recap}
        </CardContent>
      </Card>

      <div>
        <Button asChild variant="ghost">
          <Link href="/patterns">Back to patterns track</Link>
        </Button>
      </div>
    </div>
  )
}
