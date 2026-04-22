'use client'

import { useMemo } from 'react'
import type { ReactNode } from 'react'

import { useLearningProgress } from '@/components/learning/progress-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { HookLesson } from '@/lib/hooks-curriculum'

type LessonShellProps = {
  lesson: HookLesson
  interactivePanel: ReactNode
}

export function LessonShell({ lesson, interactivePanel }: LessonShellProps) {
  const { hydrated, isCompleted, toggleLessonCompletion, progress, setChallengeAnswer } =
    useLearningProgress()

  const challengeAnswer = useMemo(
    () => progress.challengeAnswers[lesson.slug] ?? '',
    [progress.challengeAnswers, lesson.slug]
  )

  const completed = hydrated && isCompleted(lesson.slug)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="w-fit">
            Core Hook
          </Badge>
          <Badge variant={completed ? 'secondary' : 'outline'}>
            {completed ? 'Completed' : 'In progress'}
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{lesson.title}</h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{lesson.tagline}</p>
        <Button className="w-fit" size="sm" onClick={() => toggleLessonCompletion(lesson.slug)}>
          {completed ? 'Mark as not complete' : 'Mark lesson complete'}
        </Button>
      </header>

      <Tabs defaultValue="explain" className="w-full">
        <TabsList>
          <TabsTrigger value="explain">Explain</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="explain" className="pt-2">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Problem It Solves</CardTitle>
                <CardDescription>Why this hook exists in a component lifecycle.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.problem}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What React Tracks</CardTitle>
                <CardDescription>Internal mental model for better debugging.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.reactTracks}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="explore" className="pt-2">
          {interactivePanel}
        </TabsContent>

        <TabsContent value="practice" className="pt-2">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Common Mistake</CardTitle>
                <CardDescription>The error most learners make first.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.commonMistake}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Guided Challenge</CardTitle>
                <CardDescription>Build a tiny exercise and explain your reasoning.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.guidedChallenge}
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recap</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.recap}
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Reflection Note</CardTitle>
                <CardDescription>
                  Saved in your browser for this lesson. Use it to record your own explanation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={challengeAnswer}
                  onChange={(event) => setChallengeAnswer(lesson.slug, event.target.value)}
                  placeholder="Write your understanding in your own words..."
                  className="min-h-28 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
