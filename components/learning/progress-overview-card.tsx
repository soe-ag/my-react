'use client'

import Link from 'next/link'

import { useLearningProgress } from '@/components/learning/progress-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type ProgressOverviewCardProps = {
  availableLessonSlugs: string[]
}

export function ProgressOverviewCard({ availableLessonSlugs }: ProgressOverviewCardProps) {
  const { hydrated, progress } = useLearningProgress()

  const completedCount = progress.completedLessonSlugs.filter((slug) =>
    availableLessonSlugs.includes(slug)
  ).length

  const totalCount = availableLessonSlugs.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your progress</CardTitle>
        <CardDescription>Local-only browser progress for your personal practice.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {hydrated
            ? `${completedCount} of ${totalCount} available lessons completed.`
            : 'Loading progress...'}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="secondary">
            <Link href="/hooks">Continue learning</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/hooks/use-state">Practice useState</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
