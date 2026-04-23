import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { ContextThemeDemo } from '@/components/learning/interactive/context-theme-demo'
import { CallbackStabilityDemo } from '@/components/learning/interactive/callback-stability-demo'
import { EffectDependencyDemo } from '@/components/learning/interactive/effect-dependency-demo'
import { LayoutEffectMeasureDemo } from '@/components/learning/interactive/layout-effect-measure-demo'
import { MemoFilterDemo } from '@/components/learning/interactive/memo-filter-demo'
import { ReducerWorkflowDemo } from '@/components/learning/interactive/reducer-workflow-demo'
import { RefSignalDemo } from '@/components/learning/interactive/ref-signal-demo'
import { StateCounterDemo } from '@/components/learning/interactive/state-counter-demo'
import { TransitionSearchDemo } from '@/components/learning/interactive/transition-search-demo'
import { LessonShell } from '@/components/learning/lesson-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getHookLesson, hookLessons } from '@/lib/hooks-curriculum'

export async function generateStaticParams() {
  return hookLessons.map((lesson) => ({ slug: lesson.slug }))
}

export default async function HookLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = getHookLesson(slug)

  if (!lesson) {
    notFound()
  }

  if (lesson.availability !== 'available') {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>{lesson.title} lesson is coming soon</CardTitle>
            <CardDescription>This hook is in the roadmap but not interactive yet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>{lesson.implementationGuide}</p>
            <Button asChild variant="outline">
              <Link href="/hooks">Back to all hook lessons</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const interactiveBySlug: Record<string, ReactNode> = {
    'use-state': <StateCounterDemo />,
    'use-effect': <EffectDependencyDemo />,
    'use-ref': <RefSignalDemo />,
    'use-context': <ContextThemeDemo />,
    'use-memo': <MemoFilterDemo />,
    'use-callback': <CallbackStabilityDemo />,
    'use-reducer': <ReducerWorkflowDemo />,
    'use-layout-effect': <LayoutEffectMeasureDemo />,
    'use-transition': <TransitionSearchDemo />,
  }

  return (
    <>
      <LessonShell
        lesson={lesson}
        interactivePanel={
          interactiveBySlug[slug] ?? (
            <Card>
              <CardHeader>
                <CardTitle>Interactive panel not found</CardTitle>
              </CardHeader>
              <CardContent>This lesson does not have a live demo yet.</CardContent>
            </Card>
          )
        }
      />
      <div className="mx-auto mb-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost">
          <Link href="/hooks">Back to hook track</Link>
        </Button>
      </div>
    </>
  )
}
