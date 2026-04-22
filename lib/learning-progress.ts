export const LEARNING_PROGRESS_KEY = 'hook-lab-progress-v1'

export type LearningProgressState = {
  completedLessonSlugs: string[]
  challengeAnswers: Record<string, string>
}

export const defaultLearningProgress: LearningProgressState = {
  completedLessonSlugs: [],
  challengeAnswers: {},
}

export function sanitizeLearningProgress(
  value: unknown,
  allowedSlugs: string[]
): LearningProgressState {
  if (!value || typeof value !== 'object') {
    return defaultLearningProgress
  }

  const parsed = value as Partial<LearningProgressState>
  const allowed = new Set(allowedSlugs)

  const completedLessonSlugs = Array.isArray(parsed.completedLessonSlugs)
    ? parsed.completedLessonSlugs.filter(
        (slug): slug is string => typeof slug === 'string' && allowed.has(slug)
      )
    : []

  const challengeAnswers =
    parsed.challengeAnswers && typeof parsed.challengeAnswers === 'object'
      ? Object.fromEntries(
          Object.entries(parsed.challengeAnswers).filter(
            ([slug, answer]) =>
              allowed.has(slug) && typeof answer === 'string' && answer.trim().length > 0
          )
        )
      : {}

  return {
    completedLessonSlugs,
    challengeAnswers,
  }
}
