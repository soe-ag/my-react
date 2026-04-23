import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import { MainNav } from '@/components/learning/main-nav'
import { LearningProgressProvider } from '@/components/learning/progress-provider'
import { cn } from '@/lib/utils'
import { hookLessons } from '@/lib/hooks-curriculum'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'React Hook Learning Lab',
  description: 'Interactive explanations and guided practice for learning React hooks.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const trackedLessons = hookLessons.map((lesson) => lesson.slug)
  const lessonNavItems = hookLessons.map((lesson) => ({
    slug: lesson.slug,
    title: lesson.title,
    availability: lesson.availability,
  }))

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable
      )}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <LearningProgressProvider lessonSlugs={trackedLessons}>
          <header className="sticky top-0 z-20 border-b border-white/20 bg-background/75 shadow-[0_8px_30px_oklch(0.42_0.08_220/0.12)] backdrop-blur-xl">
            <MainNav totalLessons={trackedLessons.length} lessons={lessonNavItems} />
          </header>
          {children}
        </LearningProgressProvider>
      </body>
    </html>
  )
}
