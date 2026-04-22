export type LessonAvailability = 'available' | 'coming-soon'

export type HookLesson = {
  slug: string
  title: string
  tagline: string
  track: 'core-hooks' | 'react-patterns'
  problem: string
  reactTracks: string
  explainLines: string[]
  sampleCode: string
  exploreCode: string
  exploreGoal: string
  exploreSteps: string[]
  exploreNotes: string[]
  commonMistake: string
  guidedChallenge: string
  practiceTasks: string[]
  recap: string
  understandingQuestions: string[]
  understandingAnswers: string[]
  interviewQuestions: string[]
  interviewAnswers: string[]
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
    explainLines: [
      'useState is how a component remembers values.',
      'When you call setState, React draws the UI again with the new value.',
      'State updates are not instant, so do not expect immediate value changes in the same line.',
      'If next value depends on old value, use the functional form.',
      'Keep only true source data in state and derive the rest in render.',
    ],
    sampleCode: `const [count, setCount] = useState(0)

function increment() {
  setCount((previous) => previous + 1)
}

return <button onClick={increment}>{count}</button>`,
    exploreCode: `const [count, setCount] = useState(0)
const [step, setStep] = useState(1)

function incrementDirect() {
  setCount(count + step)
}

function incrementFunctional() {
  setCount((previous) => previous + step)
}`,
    exploreGoal:
      'See why functional updates are safer when the next value depends on previous state.',
    exploreSteps: [
      'Select Step 5, then click Direct Update two times quickly.',
      'Press Reset, keep Step 5, then click Functional Update two times quickly.',
      'Compare the count and timeline entries after both runs.',
      'Summarize which update style is more reliable and why.',
    ],
    exploreNotes: [
      'Step buttons mutate the step state that feeds both increment handlers.',
      'Direct Update uses count from current render closure.',
      'Functional Update receives latest queued state via previous.',
      'Timeline entries are logged immediately after each button click.',
    ],
    commonMistake:
      'Updating state from stale values. Prefer functional updates when next state depends on previous state.',
    guidedChallenge:
      'Build a counter where step size can change, then explain why functional updates avoid stale increments.',
    practiceTasks: [
      'Implement increment and decrement with a dynamic step control.',
      'Add a hard limit where count cannot go below zero.',
      'Refactor all dependent updates to functional setters.',
      'Write one sentence explaining stale closure in your own words.',
    ],
    recap:
      'State is the memory of your component; rerenders are the projection of that memory into UI.',
    understandingQuestions: [
      'When does React read the updated state value in relation to rerender?',
      'Why can two setCount calls in one event still produce one render?',
      'When should derived values stay out of state?',
    ],
    understandingAnswers: [
      'React applies the queued update before the next render cycle, then renders with that new state.',
      'React batches updates in the same event, so it can combine them into one render for performance.',
      'If a value can be calculated from existing props/state every render, keep it derived instead of stored.',
    ],
    interviewQuestions: [
      'What is the difference between setState(value) and setState((prev) => next)?',
      'How do you avoid stale state bugs in asynchronous handlers?',
      'What state shape choices reduce rerenders and complexity?',
    ],
    interviewAnswers: [
      'setState(value) replaces with a fixed value. setState((prev) => next) computes from the latest queued value and is safer for dependent updates.',
      'Use functional updates, avoid reading outdated closures, and keep async handlers using the latest state source.',
      'Store minimal source state, keep related updates localized, and avoid duplicating derived data in multiple state variables.',
    ],
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
    explainLines: [
      'useEffect is for work that happens outside normal rendering.',
      'It runs after React has painted the UI.',
      'Dependency values decide when the effect should run again.',
      'Cleanup runs before the next run and when the component unmounts.',
      'If no external sync is needed, keep logic in render or event handlers.',
    ],
    sampleCode: `useEffect(() => {
  const id = window.setInterval(() => {
    setSeconds((s) => s + 1)
  }, 1000)

  return () => window.clearInterval(id)
}, [])`,
    exploreCode: `useEffect(() => {
  const timeoutId = window.setTimeout(() => {
    setResult('Synced data for query')
  }, 450)

  return () => {
    window.clearTimeout(timeoutId)
  }
}, [query, onlyStable])`,
    exploreGoal:
      'Observe that dependency changes trigger a cleanup of previous effect work before rerun.',
    exploreSteps: [
      'Type into Search Query slowly and watch the effect timeline.',
      'Toggle stable-only mode and note new timeline events.',
      'Change query quickly multiple times and wait for latest sync result.',
      'Identify where old work is canceled and the newest result wins.',
    ],
    exploreNotes: [
      'Typing in query updates dependency state and schedules a rerun.',
      'Toggling stable mode changes a second dependency and invalidates previous work.',
      'Timeout simulates asynchronous side-effect completion.',
      'Cleanup cancels outdated timeout to prevent stale sync results.',
    ],
    commonMistake:
      'Using effects for derived data that could be computed during render, or leaving dependencies incomplete.',
    guidedChallenge:
      'Connect an input to a simulated request with cleanup. Observe how dependency changes trigger cleanup and rerun.',
    practiceTasks: [
      'Create a fetch-like effect using setTimeout and dependency-driven query.',
      'Add cancellation logic in cleanup so old requests do not win race conditions.',
      'Move one non-side-effect expression out of effect into render.',
      'List every dependency and explain why it belongs in the array.',
    ],
    recap: 'Effects are for synchronization, not for replacing core render logic.',
    understandingQuestions: [
      'Why does cleanup run before the next effect execution?',
      'What bugs appear when dependency arrays are incomplete?',
      'When is an effect unnecessary and what is the alternative?',
    ],
    understandingAnswers: [
      'Cleanup removes old subscriptions/timers so the next effect starts from a clean state.',
      'Missing dependencies can cause stale data, skipped updates, and hard-to-debug inconsistent behavior.',
      'When value is derived from current props/state, compute it during render instead of effect.',
    ],
    interviewQuestions: [
      'How do you prevent race conditions in effect-driven async workflows?',
      'What is the lifecycle order of render, commit, effect, and cleanup?',
      'How do you decide dependencies for callbacks used inside effects?',
    ],
    interviewAnswers: [
      'Track request identity or cancellation and ignore outdated responses in cleanup.',
      'React renders, commits DOM, runs effect, then runs cleanup before next effect/unmount.',
      'Include every reactive value used by the effect or callback, then refactor to reduce unnecessary dependencies.',
    ],
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
    explainLines: [
      'useRef keeps a mutable value that survives renders.',
      'The ref object itself stays the same between renders.',
      'Changing ref.current does not trigger a rerender.',
      'Use refs for DOM nodes, timer IDs, and non-visual values.',
      'Use state instead when the screen should update immediately.',
    ],
    sampleCode: `const inputRef = useRef<HTMLInputElement | null>(null)

function focusField() {
  inputRef.current?.focus()
}

return <input ref={inputRef} />`,
    exploreCode: `const interactionCountRef = useRef(0)
const [displayCount, setDisplayCount] = useState(0)

function trackInteraction() {
  interactionCountRef.current += 1
}

function syncRefToUi() {
  setDisplayCount(interactionCountRef.current)
}`,
    exploreGoal:
      'Understand that refs can change silently and only become visible when copied into state.',
    exploreSteps: [
      'Type in the input and use Focus/Clear controls several times.',
      'Notice the displayed synced count does not update immediately.',
      'Click Sync ref count to copy ref value into visible state.',
      'Repeat and confirm ref changes are not reactive by themselves.',
    ],
    exploreNotes: [
      'Typing and focus actions increment an internal mutable ref counter.',
      'The ref change alone does not rerender the count display.',
      'Sync button copies current ref value into state for rendering.',
      'This demonstrates mutable storage versus reactive state updates.',
    ],
    commonMistake: 'Treating ref changes like state and expecting UI updates automatically.',
    guidedChallenge: 'Track render count in a ref and compare with state-driven updates.',
    practiceTasks: [
      'Add a previous value tracker using a ref and show it on sync.',
      'Implement a focus-on-error interaction with an input ref.',
      'Track timer id in ref and clear it in cleanup safely.',
      'Explain one case where ref is better than state and one where it is not.',
    ],
    recap: 'Refs hold mutable instance values that live outside render output.',
    understandingQuestions: [
      'Why does changing ref.current not rerender the component?',
      'What kinds of bugs happen when refs replace actual reactive state?',
      'How do refs help avoid recreating external imperative handles?',
    ],
    understandingAnswers: [
      'React does not track ref.current as render state, so updates are not reactive.',
      'UI can show outdated values because ref changes are invisible to render cycles.',
      'Refs hold stable handles (DOM/timer/object) so you do not recreate them on every render.',
    ],
    interviewQuestions: [
      'When would you choose useRef over useState?',
      'How can useRef help with stale closures in event handlers?',
      'How do you store and clear non-visual resources like timers in React?',
    ],
    interviewAnswers: [
      'Choose useRef for values that must persist but do not need to rerender UI.',
      'Store latest value in a ref and read it inside long-lived handlers to avoid old closures.',
      'Store timer or subscription handles in refs and clean them in effect cleanup.',
    ],
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
    explainLines: [
      'Context lets many nested components read shared values easily.',
      'A Provider gives that value to all child consumers.',
      'When provider value changes, consumers rerender.',
      'Stable provider values help avoid extra rerenders.',
      'Context shares data, but you still choose where state is owned.',
    ],
    sampleCode: `const ThemeContext = createContext<'light' | 'dark'>('light')

function Toolbar() {
  const theme = useContext(ThemeContext)
  return <span>{theme}</span>
}`,
    exploreCode: `const value = useMemo(
  () => ({ mode, accent, toggleMode, toggleAccent }),
  [mode, accent]
)

return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>`,
    exploreGoal:
      'See how provider state updates propagate to all consumers through a shared context value.',
    exploreSteps: [
      'Read initial Mode and Accent values in consumer A.',
      'Use Toggle mode and Toggle accent in consumer B.',
      'Verify consumer A reflects every update instantly.',
      'Explain how one provider value drives both consumers.',
    ],
    exploreNotes: [
      'Toggle buttons update mode/accent in provider state.',
      'Provider value object is memoized from mode and accent dependencies.',
      'Both consumer cards read the same context value contract.',
      'Changing provider state triggers consumer rerenders with new value.',
    ],
    commonMistake: 'Putting unstable objects/functions in context values without memoization.',
    guidedChallenge:
      'Create a theme provider and measure which components rerender when the value changes.',
    practiceTasks: [
      'Add a third consumer and verify it updates from the same provider.',
      'Split context into state and actions contexts to compare rerenders.',
      'Memoize provider value and describe the rerender impact.',
      'Document where context should stop and local state should begin.',
    ],
    recap: 'Context is dependency injection for component trees, not global state by default.',
    understandingQuestions: [
      'Why can unstable provider values cause excess rerenders?',
      'How does context compare with passing props explicitly?',
      'When should you split one context into multiple contexts?',
    ],
    understandingAnswers: [
      'A new object/function identity each render makes all consumers update even when meaning is unchanged.',
      'Props are explicit and local; context is convenient for widely shared values across deep trees.',
      'Split contexts when different consumers need different slices to reduce unnecessary updates.',
    ],
    interviewQuestions: [
      'How do you optimize context-heavy trees in production React apps?',
      'What are trade-offs between context and dedicated state libraries?',
      'How would you design a provider API for scalability and testing?',
    ],
    interviewAnswers: [
      'Memoize provider values, split contexts by concern, and keep providers close to usage boundaries.',
      'Context is built-in and simple; state libraries add tooling, patterns, and selective subscriptions.',
      'Expose a narrow typed interface with clear actions and isolated providers for easier tests.',
    ],
    availability: 'available',
  },
  {
    slug: 'use-memo',
    title: 'useMemo',
    tagline: 'Cache expensive calculations with clear dependencies.',
    track: 'core-hooks',
    problem: 'Repeated expensive computations slow down rerenders.',
    reactTracks: 'React reuses the memoized value when dependencies are unchanged.',
    explainLines: [
      'useMemo remembers a computed value between renders.',
      'React recalculates it only when listed dependencies change.',
      'Use it for expensive calculations or stable object references.',
      'Do not add it everywhere because it also adds mental overhead.',
      'Think of useMemo as optimization, not business logic correctness.',
    ],
    sampleCode: `const visibleItems = useMemo(() => {
  return items.filter((item) => item.label.includes(query))
}, [items, query])`,
    exploreCode: `const memoizedResult = useMemo(
  () => expensiveFilter(sourceItems, query, category),
  [query, category]
)

const visibleItems = useMemoEnabled ? memoizedResult : directResult`,
    exploreGoal: 'Compare memoized vs non-memoized computation during unrelated rerenders.',
    exploreSteps: [
      'Keep Using useMemo enabled and click Unrelated rerender several times.',
      'Switch to No memoization and click Unrelated rerender again.',
      'Apply a query and category filter, then repeat rerender clicks.',
      'Describe when caching helps and when it adds little value.',
    ],
    exploreNotes: [
      'Search and category updates change dependencies and recompute filter.',
      'Unrelated rerender button changes separate state to test cache behavior.',
      'Memo toggle compares cached versus always-recomputed paths.',
      'Item count confirms filtered result while interaction reveals cost pattern.',
    ],
    commonMistake: 'Memoizing trivial values, adding complexity with little benefit.',
    guidedChallenge:
      'Add profiling marks to compare filtered list performance with and without memoization.',
    practiceTasks: [
      'Add a large dataset and compare typed input responsiveness with and without memo.',
      'Identify dependencies precisely and remove non-essential ones.',
      'Memoize one object prop passed to a child and observe identity stability.',
      'Write down when you would remove useMemo from this component.',
    ],
    recap: 'Memoization is a performance tool, not a correctness tool.',
    understandingQuestions: [
      'What exactly is cached by useMemo, and when is cache invalidated?',
      'Why can overusing useMemo hurt readability more than it helps speed?',
      'How does useMemo interact with referential equality in child props?',
    ],
    understandingAnswers: [
      'The returned computed value is cached and replaced when dependencies differ from previous render.',
      'Extra memo wrappers make code harder to reason about when the work is cheap anyway.',
      'Memoized values keep stable references, helping memoized children skip rerenders.',
    ],
    interviewQuestions: [
      'How would you prove useMemo is needed in a real component?',
      'What dependency mistakes make useMemo ineffective?',
      'When is manual memoization better replaced by simpler code?',
    ],
    interviewAnswers: [
      'Profile before and after, then show measurable render-time improvement in relevant interactions.',
      'Missing dependencies create stale values; extra unstable dependencies force recomputation every render.',
      'If computation is cheap and clarity suffers, remove memoization and keep straightforward code.',
    ],
    availability: 'available',
  },
  {
    slug: 'use-callback',
    title: 'useCallback',
    tagline: 'Stabilize function identity when it matters.',
    track: 'core-hooks',
    problem: 'Child components or effects rerun because callback references change every render.',
    reactTracks: 'React reuses callback references when dependencies stay stable.',
    explainLines: [
      'useCallback keeps the same function reference between renders.',
      'This helps when children are memoized or effects depend on callback identity.',
      'Dependencies decide when React should create a new callback.',
      'Inline callbacks are okay unless identity changes cause real performance issues.',
      'Optimize callback stability after profiling, not by default everywhere.',
    ],
    sampleCode: `const onSelect = useCallback((id: string) => {
  setSelectedId(id)
}, [])

return <MemoizedList onSelect={onSelect} />`,
    exploreCode: `const stableSelectA = useCallback(() => setSelected('A'), [])
const inlineSelectA = () => setSelected('A')

const onSelectA = useCallbackEnabled ? stableSelectA : inlineSelectA

<ChildButton onSelect={onSelectA} />`,
    exploreGoal:
      'Understand callback identity stability and how it supports memoized child boundaries.',
    exploreSteps: [
      'Keep Using useCallback on, click Select A/B, then trigger unrelated parent rerenders.',
      'Switch to Inline callbacks and trigger unrelated parent rerenders again.',
      'Observe that behavior stays correct while callback identity strategy changes.',
      'Use the code map to explain where stable references come from.',
    ],
    exploreNotes: [
      'Mode toggle switches between stable callback and inline callback modes.',
      'Parent rerender button updates unrelated state to test callback identity.',
      'Memoized child receives onSelect prop and benefits from stable references.',
      'Selection state confirms callback behavior stays functionally correct.',
    ],
    commonMistake:
      'Using useCallback everywhere rather than where referential stability is needed.',
    guidedChallenge: 'Pair memoized children with callbacks and observe rerender differences.',
    practiceTasks: [
      'Add a third memoized child and observe prop identity behavior in both modes.',
      'Introduce one callback with dependencies and explain why they are required.',
      'Move one inline callback to useCallback only if it changes rerender behavior.',
      'Write a rule of thumb for when to keep inline callbacks.',
    ],
    recap: 'Callback memoization is for inter-component contracts and effect dependencies.',
    understandingQuestions: [
      'How is useCallback related to useMemo under the hood?',
      'Why can stable callback identity reduce rerenders for memoized children?',
      'What bugs appear when callback dependency arrays are incomplete?',
    ],
    understandingAnswers: [
      'useCallback is like useMemo for functions; it caches function references by dependencies.',
      'Memoized children compare props by reference, so stable callbacks prevent unnecessary prop changes.',
      'Missing dependencies can freeze old values inside callbacks and produce stale behavior.',
    ],
    interviewQuestions: [
      'When does useCallback improve performance, and when is it unnecessary?',
      'How do you debug callback dependency issues in large components?',
      'How would you combine React.memo and useCallback in a design system component?',
    ],
    interviewAnswers: [
      'It helps when callback identity affects memoization/effects; it is unnecessary for simple local handlers.',
      'Use lint rules, inspect dependency usage, and refactor logic to reduce unstable captures.',
      'Memoize child components and pass stable callbacks for high-frequency paths with measured rerender costs.',
    ],
    availability: 'available',
  },
]

export function getHookLesson(slug: string) {
  return hookLessons.find((lesson) => lesson.slug === slug)
}

export function getAvailableHookLessons() {
  return hookLessons.filter((lesson) => lesson.availability === 'available')
}
