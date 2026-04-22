export type LessonAvailability = 'available' | 'coming-soon'

export type HookLesson = {
  slug: string
  title: string
  tagline: string
  track: 'core-hooks' | 'react-patterns'
  problem: string
  reactTracks: string
  commonMistake: string
  guidedChallenge: string
  recap: string
  availability: LessonAvailability
}

export const hookLessons: HookLesson[] = [
  {
    slug: 'use-state',
    title: 'useState',
    tagline: 'Model changing UI from tiny state transitions.',
    track: 'core-hooks',
    problem:
      'You need the UI to react to user input, but plain variables are not preserved between renders.',
    reactTracks:
      'React stores the current state value per component instance and queues updates for rerenders.',
    commonMistake:
      'Updating state from stale values. Prefer functional updates when next state depends on previous state.',
    guidedChallenge:
      'Build a counter where step size can change, then explain why functional updates avoid stale increments.',
    recap:
      'State is the memory of your component; rerenders are the projection of that memory into UI.',
    availability: 'available',
  },
  {
    slug: 'use-effect',
    title: 'useEffect',
    tagline: 'Synchronize your component with systems outside render.',
    track: 'core-hooks',
    problem:
      'Some work should happen after paint or when dependencies change, such as subscriptions or network sync.',
    reactTracks:
      'React runs effects after commit and compares dependency values to decide whether to rerun.',
    commonMistake:
      'Using effects for derived data that could be computed during render, or leaving dependencies incomplete.',
    guidedChallenge:
      'Connect an input to a simulated request with cleanup. Observe how dependency changes trigger cleanup and rerun.',
    recap: 'Effects are for synchronization, not for replacing core render logic.',
    availability: 'available',
  },
  {
    slug: 'use-ref',
    title: 'useRef',
    tagline: 'Keep mutable values without rerendering.',
    track: 'core-hooks',
    problem: 'You need persistent data or element references that should not trigger rerenders.',
    reactTracks:
      'React keeps a stable ref object across renders and updates only the .current field.',
    commonMistake: 'Treating ref changes like state and expecting UI updates automatically.',
    guidedChallenge: 'Track render count in a ref and compare with state-driven updates.',
    recap: 'Refs hold mutable instance values that live outside render output.',
    availability: 'available',
  },
  {
    slug: 'use-context',
    title: 'useContext',
    tagline: 'Share values across trees without prop drilling.',
    track: 'core-hooks',
    problem: 'Multiple nested components need the same value or actions.',
    reactTracks:
      'React subscribes consumers to provider values and rerenders consumers when the provided value changes.',
    commonMistake: 'Putting unstable objects/functions in context values without memoization.',
    guidedChallenge:
      'Create a theme provider and measure which components rerender when the value changes.',
    recap: 'Context is dependency injection for component trees, not global state by default.',
    availability: 'available',
  },
  {
    slug: 'use-memo',
    title: 'useMemo',
    tagline: 'Cache expensive calculations with clear dependencies.',
    track: 'core-hooks',
    problem: 'Repeated expensive computations slow down rerenders.',
    reactTracks: 'React reuses the memoized value when dependencies are unchanged.',
    commonMistake: 'Memoizing trivial values, adding complexity with little benefit.',
    guidedChallenge:
      'Add profiling marks to compare filtered list performance with and without memoization.',
    recap: 'Memoization is a performance tool, not a correctness tool.',
    availability: 'available',
  },
  {
    slug: 'use-callback',
    title: 'useCallback',
    tagline: 'Stabilize function identity when it matters.',
    track: 'core-hooks',
    problem: 'Child components or effects rerun because callback references change every render.',
    reactTracks: 'React reuses callback references when dependencies stay stable.',
    commonMistake:
      'Using useCallback everywhere rather than where referential stability is needed.',
    guidedChallenge: 'Pair memoized children with callbacks and observe rerender differences.',
    recap: 'Callback memoization is for inter-component contracts and effect dependencies.',
    availability: 'available',
  },
]

export function getHookLesson(slug: string) {
  return hookLessons.find((lesson) => lesson.slug === slug)
}

export function getAvailableHookLessons() {
  return hookLessons.filter((lesson) => lesson.availability === 'available')
}
