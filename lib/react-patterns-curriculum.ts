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
      'Large forms often become hard to maintain when validation and state updates are scattered. Defining validation boundaries keeps instant field feedback separate from cross-field rules and submit-time checks.',
    explainLines: [
      'Controlled inputs keep form values in React state for predictable behavior.',
      'Field-level validation should run on local changes for immediate feedback.',
      'Cross-field validation belongs at a broader boundary (for example submit or blur).',
      'Separate error ownership: local errors versus form-level errors.',
      'Clear validation boundaries reduce noisy rerenders and improve maintainability.',
    ],
    exploreSteps: [
      'Type an invalid email and short password to trigger field-level errors.',
      'Toggle strict submit validation and try to submit again.',
      'Fix one field and observe only related validation messages clear.',
      'Explain which checks should happen per keystroke versus on submit.',
    ],
    recap:
      'Controlled forms are most effective when validation responsibilities are intentional. Keep fast local validation near fields, reserve expensive or cross-field rules for broader boundaries, and keep error ownership explicit.',
    availability: 'available',
  },
  {
    slug: 'context-composition',
    title: 'Context Architecture and Provider Composition',
    tagline: 'Scale provider trees without over-rendering.',
    problem:
      'Single giant context values can force unrelated consumers to rerender. Provider composition and context splitting help isolate updates and keep component trees scalable.',
    explainLines: [
      'Compose providers by concern rather than one global provider blob.',
      'Split frequently changing values into separate contexts when consumers differ.',
      'Keep provider value identity stable to avoid accidental rerender cascades.',
      'Expose narrow context contracts focused on state and actions needed by consumers.',
      'Use composition to keep context boundaries explicit and testable.',
    ],
    exploreSteps: [
      'Start in combined context mode and toggle theme only.',
      'Observe both theme and locale consumers rerender together.',
      'Switch to composed providers mode and toggle theme again.',
      'Confirm only the relevant consumer rerenders and summarize why.',
    ],
    recap:
      'Context composition is about update isolation and clear ownership. Split providers by concern, stabilize values, and keep contracts narrow so consumers rerender only when their data actually changes.',
    availability: 'available',
  },
  {
    slug: 'custom-hook-design',
    title: 'Custom Hooks for Reusable Behavior',
    tagline: 'Extract behavior without leaking implementation detail.',
    problem:
      'Hooks are easy to extract, but difficult to maintain when they expose too much internal state or unstable callback contracts. Good hook design hides implementation details and offers focused, predictable APIs.',
    explainLines: [
      'Extract hooks when behavior repeats across multiple components.',
      'Return the smallest API needed: data, actions, and status metadata.',
      'Keep internal implementation private so callers depend on stable contracts.',
      'Avoid returning volatile objects/functions unless stability is intentional.',
      'Design hooks around use cases, not around raw internal state dumps.',
    ],
    exploreSteps: [
      'Switch to Inline logic mode and observe duplicated behavior across cards.',
      'Switch to Custom hook mode and compare API simplicity.',
      'Trigger the same actions in both cards and confirm equivalent behavior.',
      'Describe which responsibilities belong inside the hook versus component UI.',
    ],
    recap:
      'Custom hooks should encapsulate reusable behavior behind clear, stable contracts. Keep the API narrow, preserve implementation freedom, and optimize for readability and long-term evolution.',
    availability: 'available',
  },
  {
    slug: 'render-profiling',
    title: 'Render Behavior and Performance Profiling',
    tagline: 'Measure first, optimize second.',
    problem:
      'Performance tuning often starts with guesses that add complexity without real benefit. Profiling helps identify expensive interactions first so optimizations target true bottlenecks.',
    explainLines: [
      'Profile interactions before adding memoization or architectural changes.',
      'Measure commit duration and render count for real user actions.',
      'Identify expensive subtrees, then optimize only those paths.',
      'Compare before/after metrics to validate optimization impact.',
      'Prefer simpler code when measured gains are negligible.',
    ],
    exploreSteps: [
      'Run in Unoptimized mode and trigger several parent rerenders.',
      'Watch profiler logs and render counts for expensive list components.',
      'Switch to Optimized mode and repeat the same interactions.',
      'Compare metrics and explain which optimization produced real gains.',
    ],
    recap:
      'Profiling turns performance work into evidence-driven decisions. Measure first, optimize targeted bottlenecks, and keep improvements only when they produce meaningful interaction gains.',
    availability: 'available',
  },
]

export function getReactPatternLesson(slug: string) {
  return reactPatternLessons.find((lesson) => lesson.slug === slug)
}
