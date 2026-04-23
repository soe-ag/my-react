export type PatternAvailability = 'available' | 'coming-soon'

export type ReactPatternLesson = {
  slug: string
  title: string
  tagline: string
  problem: string
  explainLines: string[]
  exploreSteps: string[]
  recap: string
  availability: PatternAvailability
}

export const reactPatternLessons: ReactPatternLesson[] = [
  {
    slug: 'state-colocation',
    title: 'Lifting and Colocating State Intentionally',
    tagline: 'Keep state close to where it is used until sharing is required.',
    problem:
      'Teams often lift state too early, causing broad rerenders and brittle component coupling. Colocating state keeps components isolated, while lifting state is best reserved for truly shared behavior.',
    explainLines: [
      'Start by colocating state in the nearest component that needs it.',
      'Lift state only when two or more siblings must read or update the same source of truth.',
      'Unnecessary lifting increases parent rerenders and component dependencies.',
      'When lifting is required, keep update APIs narrow and explicit.',
      'Revisit ownership boundaries as features grow to avoid accidental global state.',
    ],
    exploreSteps: [
      'Switch to Lifted mode and type in one input.',
      'Observe that both sibling cards rerender because parent state changed.',
      'Switch to Colocated mode and type again in one input.',
      'Confirm only the edited card rerenders while the sibling remains stable.',
    ],
    recap:
      'State ownership is an architectural decision, not just a coding detail. Colocate by default for isolation and performance, then lift only when shared coordination makes it necessary.',
    availability: 'available',
  },
  {
    slug: 'controlled-forms',
    title: 'Controlled Forms and Validation Boundaries',
    tagline: 'Model form control ownership and validation flow clearly.',
    problem:
      'Complex forms need clear ownership between field state, validation, and submission effects.',
    explainLines: [],
    exploreSteps: [],
    recap: '',
    availability: 'coming-soon',
  },
  {
    slug: 'context-composition',
    title: 'Context Architecture and Provider Composition',
    tagline: 'Scale provider trees without over-rendering.',
    problem:
      'Provider sprawl can increase rerenders unless context boundaries are designed intentionally.',
    explainLines: [],
    exploreSteps: [],
    recap: '',
    availability: 'coming-soon',
  },
  {
    slug: 'custom-hook-design',
    title: 'Custom Hooks for Reusable Behavior',
    tagline: 'Extract behavior without leaking implementation detail.',
    problem:
      'Reusable behavior can become hard to evolve when hooks expose unstable or oversized APIs.',
    explainLines: [],
    exploreSteps: [],
    recap: '',
    availability: 'coming-soon',
  },
  {
    slug: 'render-profiling',
    title: 'Render Behavior and Performance Profiling',
    tagline: 'Measure first, optimize second.',
    problem:
      'Performance work is often misdirected without profiling actual interaction bottlenecks.',
    explainLines: [],
    exploreSteps: [],
    recap: '',
    availability: 'coming-soon',
  },
]

export function getReactPatternLesson(slug: string) {
  return reactPatternLessons.find((lesson) => lesson.slug === slug)
}
