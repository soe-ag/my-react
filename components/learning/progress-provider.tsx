'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  defaultLearningProgress,
  LEARNING_PROGRESS_KEY,
  sanitizeLearningProgress,
  type LearningProgressState,
} from '@/lib/learning-progress'

type ProgressContextValue = {
  hydrated: boolean
  progress: LearningProgressState
  isCompleted: (slug: string) => boolean
  toggleLessonCompletion: (slug: string) => void
  setChallengeAnswer: (slug: string, answer: string) => void
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

type LearningProgressProviderProps = {
  lessonSlugs: string[]
  children: ReactNode
}

export function LearningProgressProvider({ lessonSlugs, children }: LearningProgressProviderProps) {
  const [progress, setProgress] = useState<LearningProgressState>(() => {
    if (typeof window === 'undefined') {
      return defaultLearningProgress
    }

    try {
      const raw = window.localStorage.getItem(LEARNING_PROGRESS_KEY)
      if (!raw) {
        return defaultLearningProgress
      }
      const parsed = JSON.parse(raw)
      return sanitizeLearningProgress(parsed, lessonSlugs)
    } catch {
      return defaultLearningProgress
    }
  })

  const hydrated = true

  useEffect(() => {
    window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(progress))
  }, [progress])

  const isCompleted = useCallback(
    (slug: string) => progress.completedLessonSlugs.includes(slug),
    [progress.completedLessonSlugs]
  )

  const toggleLessonCompletion = useCallback((slug: string) => {
    setProgress((previous) => {
      const completed = new Set(previous.completedLessonSlugs)
      if (completed.has(slug)) {
        completed.delete(slug)
      } else {
        completed.add(slug)
      }
      return {
        ...previous,
        completedLessonSlugs: Array.from(completed),
      }
    })
  }, [])

  const setChallengeAnswer = useCallback((slug: string, answer: string) => {
    setProgress((previous) => {
      if (answer.trim().length === 0) {
        const rest = { ...previous.challengeAnswers }
        delete rest[slug]
        return {
          ...previous,
          challengeAnswers: rest,
        }
      }

      return {
        ...previous,
        challengeAnswers: {
          ...previous.challengeAnswers,
          [slug]: answer,
        },
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultLearningProgress)
  }, [])

  const value = useMemo<ProgressContextValue>(
    () => ({
      hydrated,
      progress,
      isCompleted,
      toggleLessonCompletion,
      setChallengeAnswer,
      resetProgress,
    }),
    [hydrated, progress, isCompleted, toggleLessonCompletion, setChallengeAnswer, resetProgress]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useLearningProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useLearningProgress must be used inside LearningProgressProvider')
  }
  return context
}
