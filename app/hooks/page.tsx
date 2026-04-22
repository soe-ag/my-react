import { HooksLessonGrid } from '@/components/learning/hooks-lesson-grid'
import { hookLessons } from '@/lib/hooks-curriculum'

export default function HooksIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3 rounded-2xl border border-white/30 bg-[linear-gradient(150deg,oklch(0.99_0.01_84/.9),oklch(0.96_0.025_192/.86))] p-5 shadow-[0_12px_26px_oklch(0.45_0.1_200/0.12)] sm:p-6">
        <p className="text-sm font-medium text-muted-foreground">Curriculum</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">React Hooks Track</h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Start with core hooks now, then expand into broader React patterns as you progress.
        </p>
      </header>

      <HooksLessonGrid lessons={hookLessons} />
    </div>
  )
}
