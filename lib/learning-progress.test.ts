import { describe, expect, it } from 'vitest'

import { defaultLearningProgress, sanitizeLearningProgress } from '@/lib/learning-progress'

describe('sanitizeLearningProgress', () => {
  it('returns defaults for invalid shapes', () => {
    expect(sanitizeLearningProgress(null, ['use-state'])).toEqual(defaultLearningProgress)
    expect(sanitizeLearningProgress('bad-shape', ['use-state'])).toEqual(defaultLearningProgress)
  })

  it('filters unknown lesson slugs and empty answers', () => {
    const result = sanitizeLearningProgress(
      {
        completedLessonSlugs: ['use-state', 'unknown'],
        challengeAnswers: {
          'use-state': 'My notes',
          unknown: 'Should be removed',
          'use-effect': '   ',
        },
      },
      ['use-state', 'use-effect']
    )

    expect(result).toEqual({
      completedLessonSlugs: ['use-state'],
      challengeAnswers: {
        'use-state': 'My notes',
      },
    })
  })
})
