'use client'

import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

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

function LessonCodeBlock({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      language="tsx"
      style={oneLight}
      customStyle={{
        margin: 0,
        borderRadius: '0.5rem',
        border: '1px solid var(--border)',
        fontSize: '0.82rem',
        lineHeight: '1.45rem',
      }}
      wrapLongLines
      showLineNumbers
    >
      {code}
    </SyntaxHighlighter>
  )
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
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_5%,oklch(0.88_0.11_30/.25),transparent_30%),radial-gradient(circle_at_82%_8%,oklch(0.86_0.1_196/.24),transparent_34%)]" />
      <header className="space-y-3 rounded-2xl border border-white/30 bg-[linear-gradient(145deg,oklch(0.99_0.012_84/.92),oklch(0.965_0.024_206/.86))] p-5 shadow-[0_12px_26px_oklch(0.45_0.08_220/0.12)] sm:p-6">
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

      <Tabs defaultValue="explain" className="w-full transition-all duration-200 ease-out">
        <TabsList>
          <TabsTrigger value="explain">Explain</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="understanding">Understanding</TabsTrigger>
        </TabsList>

        <TabsContent value="explain" className="pt-2">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)]">
              <CardHeader>
                <CardTitle>Problem It Solves</CardTitle>
                <CardDescription>Why this hook exists in a component lifecycle.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.problem}
              </CardContent>
            </Card>
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)]">
              <CardHeader>
                <CardTitle>What React Tracks</CardTitle>
                <CardDescription>Internal mental model for better debugging.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.reactTracks}
              </CardContent>
            </Card>
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)] md:col-span-2">
              <CardHeader>
                <CardTitle>Core Explanation</CardTitle>
                <CardDescription>
                  Read these five lines in sequence before jumping to interaction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {lesson.explainLines.map((line) => (
                    <li key={line} className="rounded-md border bg-background px-3 py-2">
                      {line}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)] md:col-span-2">
              <CardHeader>
                <CardTitle>Sample Code</CardTitle>
                <CardDescription>
                  Minimal code to anchor the mental model before the live demo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LessonCodeBlock code={lesson.sampleCode} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="explore" className="pt-2">
          <div className="space-y-4">
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)]">
              <CardHeader>
                <CardTitle>Explore Walkthrough</CardTitle>
                <CardDescription>
                  Follow these steps first so the interactive behavior is easier to understand.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
                  Goal: {lesson.exploreGoal}
                </p>
                <ol className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {lesson.exploreSteps.map((step, index) => (
                    <li key={step} className="rounded-md border bg-background px-3 py-2">
                      <span className="mr-2 inline-block font-semibold text-foreground/80">
                        Step {index + 1}:
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            {interactivePanel}
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)]">
              <CardHeader>
                <CardTitle>How Code Maps To Interaction</CardTitle>
                <CardDescription>
                  Use this as a bridge between buttons/inputs and the exact logic behind them.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <LessonCodeBlock code={lesson.exploreCode} />
                <p className="text-sm font-medium text-foreground/85">
                  What to watch while testing
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                  {lesson.exploreNotes.map((note) => (
                    <li key={note} className="rounded-md border bg-background px-3 py-2">
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="practice" className="pt-2">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)]">
              <CardHeader>
                <CardTitle>Common Mistake</CardTitle>
                <CardDescription>The error most learners make first.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.commonMistake}
              </CardContent>
            </Card>
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)]">
              <CardHeader>
                <CardTitle>Guided Challenge</CardTitle>
                <CardDescription>Build a tiny exercise and explain your reasoning.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.guidedChallenge}
              </CardContent>
            </Card>
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)] md:col-span-2">
              <CardHeader>
                <CardTitle>Practice Plan</CardTitle>
                <CardDescription>
                  Work through these steps in order and capture your outcome in Reflection Note.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {lesson.practiceTasks.map((task) => (
                    <li key={task} className="rounded-md border bg-background px-3 py-2">
                      {task}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)] md:col-span-2">
              <CardHeader>
                <CardTitle>Recap</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {lesson.recap}
              </CardContent>
            </Card>
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)] md:col-span-2">
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

        <TabsContent value="understanding" className="pt-2">
          <div className="grid items-start gap-4 md:grid-cols-2">
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)]">
              <CardHeader>
                <CardTitle>Understanding Questions</CardTitle>
                <CardDescription>
                  Answer these without looking at code to verify concept clarity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {lesson.understandingQuestions.map((question, index) => (
                    <li key={question} className="rounded-md border bg-background">
                      <details className="group">
                        <summary className="list-none rounded-t-md bg-accent/25 px-3 py-2 font-medium transition-colors group-open:bg-accent/35 hover:bg-accent/35">
                          <span className="mr-2 inline-block text-xs text-muted-foreground">
                            Q{index + 1}
                          </span>
                          {question}
                        </summary>
                        <div className="border-t bg-primary/8 px-3 py-2 text-muted-foreground">
                          {lesson.understandingAnswers[index]}
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-white/30 bg-[linear-gradient(160deg,oklch(1_0_0/.92),oklch(0.96_0.02_68/.84))] shadow-[0_8px_24px_oklch(0.45_0.08_186/0.12)]">
              <CardHeader>
                <CardTitle>Interview Questions</CardTitle>
                <CardDescription>
                  Use these for mock interview prep focused on practical reasoning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {lesson.interviewQuestions.map((question, index) => (
                    <li key={question} className="rounded-md border bg-background">
                      <details className="group">
                        <summary className="list-none rounded-t-md bg-accent/25 px-3 py-2 font-medium transition-colors group-open:bg-accent/35 hover:bg-accent/35">
                          <span className="mr-2 inline-block text-xs text-muted-foreground">
                            Q{index + 1}
                          </span>
                          {question}
                        </summary>
                        <div className="border-t bg-primary/8 px-3 py-2 text-muted-foreground">
                          {lesson.interviewAnswers[index]}
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
