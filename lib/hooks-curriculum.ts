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
  implementationGuide: string
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
      'You need the UI to react to user input and previous interaction history, but plain local variables reset on every render. useState gives each component instance reliable memory so button clicks, typing, and toggles always map to predictable UI changes.',
    reactTracks:
      'React stores state per component instance, then queues updates and processes them before the next render. During that next render, your component receives the latest value so the screen and state stay aligned.',
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
    implementationGuide:
      'Build a quantity selector like a shopping cart stepper: expose + and - controls, keep the current quantity in state, and use functional updates when quantity depends on its previous value. This is the same pattern used in scoreboards, pagination, and quantity pickers.',
    practiceTasks: [
      'Implement increment and decrement with a dynamic step control.',
      'Add a hard limit where count cannot go below zero.',
      'Refactor all dependent updates to functional setters.',
      'Write one sentence explaining stale closure in your own words.',
    ],
    recap:
      'State is the memory of your component, and rerenders are how that memory is projected into the UI. Keep state minimal, prefer derived values in render, and use functional updates whenever the next value depends on the previous one. That combination prevents stale closure bugs and keeps transitions predictable.',
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
      'Some work should happen after paint or when specific values change, such as timers, subscriptions, requests, and external APIs. Render should stay pure, while effect handles synchronization with systems that live outside React rendering.',
    reactTracks:
      'React commits UI first, then runs effects. On later renders, React compares dependencies and reruns only when one changed, running cleanup first so old work is stopped before new work starts.',
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
    implementationGuide:
      'Implement a live-search panel: trigger a debounced request when the query changes, cancel the previous timer or request in cleanup, and show only the latest result. This same effect pattern is used in auto-save, polling, and subscription lifecycle management.',
    practiceTasks: [
      'Create a fetch-like effect using setTimeout and dependency-driven query.',
      'Add cancellation logic in cleanup so old requests do not win race conditions.',
      'Move one non-side-effect expression out of effect into render.',
      'List every dependency and explain why it belongs in the array.',
    ],
    recap:
      'Effects are for synchronization, not for deriving UI state that could be computed during render. Think in lifecycle order: render -> commit -> effect -> cleanup -> rerun. If you keep dependencies complete and cleanup correct, your component avoids stale data, race conditions, and memory leaks.',
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
    problem:
      'You need persistent data or element handles across renders, but updating them should not cause a visual rerender. useRef is ideal for storing DOM references, timer IDs, and transient counters that support behavior rather than display.',
    reactTracks:
      'React creates one stable ref object per component instance. Across rerenders the object identity stays the same, and only .current changes, which is why ref updates do not trigger rendering.',
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
    implementationGuide:
      'Create a form helper that focuses the first invalid field: store element references with useRef, update validation state with useState, and call ref.current.focus() when submit fails. This mirrors real-world focus management, scroll restoration, and imperative bridge logic.',
    practiceTasks: [
      'Add a previous value tracker using a ref and show it on sync.',
      'Implement a focus-on-error interaction with an input ref.',
      'Track timer id in ref and clear it in cleanup safely.',
      'Explain one case where ref is better than state and one where it is not.',
    ],
    recap:
      'Refs hold mutable instance values outside render output. Use them when you need persistence without rerender, and copy ref values into state only when the UI must reflect the change. A good rule: visual truth belongs in state, imperative handles belong in refs.',
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
    problem:
      'Multiple nested components need the same values or actions, and passing props through every layer creates noise and fragile coupling. Context lets you publish a value once and consume it where needed deeper in the tree.',
    reactTracks:
      'React subscribes each consumer to its nearest provider value. When provider value identity changes, React rerenders consumers that read that context, so provider stability directly affects rendering cost.',
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
    implementationGuide:
      'Implement an app preferences provider for theme, language, and text scale. Expose both values and actions through context, then memoize provider values so consumers rerender only when relevant state changes. This pattern maps directly to auth, feature flags, and global settings.',
    practiceTasks: [
      'Add a third consumer and verify it updates from the same provider.',
      'Split context into state and actions contexts to compare rerenders.',
      'Memoize provider value and describe the rerender impact.',
      'Document where context should stop and local state should begin.',
    ],
    recap:
      'Context is dependency injection for component trees, not a replacement for all state management. Keep provider boundaries intentional, stabilize value identity, and split contexts when consumers need different slices. That keeps shared state ergonomic without creating broad rerender cascades.',
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
    problem:
      'Repeated expensive calculations can make typing, filtering, and sorting feel sluggish because every rerender recomputes the same result. useMemo caches that computed result until its dependencies actually change.',
    reactTracks:
      'React stores the previous memoized value and dependency list, then reuses the cached value when dependencies are referentially equal. If any dependency changes, React recomputes and stores a new cached result.',
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
    implementationGuide:
      'Build a product catalog with text search and category filters over a large list. Memoize the filtered dataset and any derived summary stats, then profile rerenders with and without memoization. This is a direct implementation pattern for dashboards and searchable admin tables.',
    practiceTasks: [
      'Add a large dataset and compare typed input responsiveness with and without memo.',
      'Identify dependencies precisely and remove non-essential ones.',
      'Memoize one object prop passed to a child and observe identity stability.',
      'Write down when you would remove useMemo from this component.',
    ],
    recap:
      'Memoization is a performance tool, not a correctness tool. Apply it when profiling shows repeated expensive work or unstable object identities causing rerenders, and keep dependencies precise. If the calculation is cheap, simpler code is usually better than extra memo layers.',
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
    problem:
      'Child components and effects may rerun because callback references are recreated on each render. When those references are part of memoized prop contracts or effect dependencies, unstable identity can cause avoidable work.',
    reactTracks:
      'React keeps the previous function reference and dependency list for useCallback. If dependencies are unchanged, the same function object is reused; otherwise React creates a new function for the latest closure values.',
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
    implementationGuide:
      'Create a filter toolbar component that passes handlers into memoized child buttons. Stabilize handlers with useCallback only where memoized children or effects depend on identity. This mirrors reusable component libraries where prop stability matters for performance.',
    practiceTasks: [
      'Add a third memoized child and observe prop identity behavior in both modes.',
      'Introduce one callback with dependencies and explain why they are required.',
      'Move one inline callback to useCallback only if it changes rerender behavior.',
      'Write a rule of thumb for when to keep inline callbacks.',
    ],
    recap:
      'Callback memoization is most useful for inter-component contracts and effect dependency stability. Use it selectively where function identity has measurable impact, and keep dependencies complete to avoid stale closures. Prefer clear inline handlers until a real identity-related cost appears.',
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
  {
    slug: 'use-reducer',
    title: 'useReducer',
    tagline: 'Model complex state transitions with explicit actions.',
    track: 'core-hooks',
    problem:
      'As component state grows, many setState calls can become hard to reason about. useReducer centralizes transition rules so updates are predictable, testable, and easier to audit.',
    reactTracks:
      'React stores reducer state and dispatch function per component instance. Each dispatch queues an action, runs the reducer with current state, and rerenders with the returned next state.',
    explainLines: [
      'useReducer moves state transition logic into one reducer function.',
      'dispatch(action) describes what happened; reducer decides how state changes.',
      'Reducers should be pure: same input state/action must return same output.',
      'useReducer shines when many fields change together from one event.',
      'You can still derive display values during render instead of storing everything.',
    ],
    sampleCode: `type Action = { type: 'increment' } | { type: 'reset' }

function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'reset':
      return 0
  }
}

const [count, dispatch] = useReducer(reducer, 0)`,
    exploreCode: `dispatch({ type: 'add', amount: 5 })
dispatch({ type: 'add', amount: 5 })

// reducer controls both count and history updates
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + action.amount,
      }
  }
}`,
    exploreGoal:
      'Observe how one dispatch pipeline coordinates related state fields more reliably than scattered setters.',
    exploreSteps: [
      'Dispatch Add 1 and Add 5 actions in different orders.',
      'Trigger Undo Last Action and compare state/history updates.',
      'Reset the reducer state and run another action sequence.',
      'Identify which transitions belong in reducer versus derived render logic.',
    ],
    exploreNotes: [
      'Every button dispatches a typed action instead of mutating directly.',
      'Reducer returns the full next state object in one place.',
      'History list helps verify deterministic transition behavior.',
      'Undo works because previous transitions are captured as actions.',
    ],
    commonMistake:
      'Using reducer for trivial single-value state, or mutating state directly inside reducer.',
    implementationGuide:
      'Build a checkout state machine with actions like add-item, remove-item, apply-discount, and reset-cart. Keep all cart transitions inside one reducer so pricing and quantity logic stay consistent.',
    practiceTasks: [
      'Add a decrement action with floor-at-zero guard logic.',
      'Add undo support for the latest dispatched action.',
      'Extract action types into a clear discriminated union.',
      'List one rule that must remain pure inside the reducer.',
    ],
    recap:
      'useReducer is ideal when state transitions are event-driven and interconnected. It improves predictability by making action intent explicit and centralizing the next-state rules in one pure function.',
    understandingQuestions: [
      'When is useReducer a better fit than multiple useState calls?',
      'Why must reducer functions stay pure?',
      'What is the advantage of dispatching actions instead of direct setters?',
    ],
    understandingAnswers: [
      'When several fields change together from shared events and transition logic gets scattered.',
      'Purity ensures deterministic behavior, easier testing, and reliable rerender outcomes.',
      'Actions describe intent, making transition flows easier to trace, debug, and evolve.',
    ],
    interviewQuestions: [
      'How do you structure reducer state for long-lived feature modules?',
      'What anti-patterns make reducers hard to maintain?',
      'How would you combine useReducer with context for app-wide workflows?',
    ],
    interviewAnswers: [
      'Keep state normalized by concern, and group transitions around clear domain actions.',
      'State mutation, huge switch statements without helper functions, and unclear action naming.',
      'Provide state/dispatch through context while keeping reducer pure and action contracts typed.',
    ],
    availability: 'available',
  },
  {
    slug: 'use-layout-effect',
    title: 'useLayoutEffect',
    tagline: 'Run DOM measurements before paint to avoid visual jumps.',
    track: 'core-hooks',
    problem:
      'Some UI logic depends on reading layout synchronously, such as measuring widths or positioning popovers. useEffect runs after paint and can cause visible flicker, while useLayoutEffect runs before paint.',
    reactTracks:
      'React runs layout effects synchronously after DOM mutations but before the browser repaints. This lets you measure and apply adjustments in the same frame.',
    explainLines: [
      'useLayoutEffect runs earlier than useEffect in the commit lifecycle.',
      'Use it when you must read layout and update UI before paint.',
      'Because it blocks paint, keep layout effects small and focused.',
      'Most side effects should remain in useEffect for better responsiveness.',
      'Only choose layout effect when visual correctness depends on it.',
    ],
    sampleCode: `useLayoutEffect(() => {
  const width = titleRef.current?.offsetWidth ?? 0
  setUnderlineWidth(width)
}, [title])`,
    exploreCode: `const runEffect = mode === 'layout' ? useLayoutEffect : useEffect

runEffect(() => {
  const next = textRef.current?.offsetWidth ?? 0
  setIndicatorWidth(next)
}, [text, mode])`,
    exploreGoal:
      'Compare visual behavior when DOM measurements are applied before paint versus after paint.',
    exploreSteps: [
      'Start in Layout mode and type quickly in the input.',
      'Switch to Effect mode and repeat the same typing pattern.',
      'Watch indicator width updates and note visual smoothness differences.',
      'Explain why pre-paint measurement can prevent layout flash.',
    ],
    exploreNotes: [
      'Both modes measure the same element width from the DOM.',
      'Layout mode applies width before paint for a stable frame.',
      'Effect mode applies width after paint, which may show temporary mismatch.',
      'Use layout effects sparingly because they block paint work.',
    ],
    commonMistake:
      'Using useLayoutEffect for network requests or non-layout tasks that belong in useEffect.',
    implementationGuide:
      'Implement a tooltip/popover that measures trigger position and updates placement before paint. This pattern is common in menus, floating panels, and caret-position overlays.',
    practiceTasks: [
      'Add a max indicator width clamp to avoid overflow.',
      'Fallback to default width if element ref is missing.',
      'Move non-layout logic out of layout effect into events/effects.',
      'Document when your component truly requires pre-paint measurement.',
    ],
    recap:
      'useLayoutEffect is a precision tool for visual correctness at paint time. Prefer useEffect by default, and use layout effect only when measuring or mutating layout before repaint prevents visible artifacts.',
    understandingQuestions: [
      'What timing difference matters between useEffect and useLayoutEffect?',
      'Why can overusing useLayoutEffect harm performance?',
      'What kinds of UI problems justify useLayoutEffect?',
    ],
    understandingAnswers: [
      'useLayoutEffect runs before paint; useEffect runs after paint.',
      'Layout effects block painting, so heavy work can delay frames and hurt responsiveness.',
      'Pre-paint measurement/positioning scenarios like tooltips, anchors, and dynamic indicators.',
    ],
    interviewQuestions: [
      'How do you decide between useEffect and useLayoutEffect in production UI?',
      'What profiling signals indicate a layout effect bottleneck?',
      'How would you reduce layout thrashing in measurement-heavy components?',
    ],
    interviewAnswers: [
      'Default to useEffect; switch only when post-paint updates cause visible flicker or incorrect placement.',
      'Long main-thread blocks around commit/paint and reduced frame rate during interactions.',
      'Batch reads/writes, minimize sync work, and cache measurements when possible.',
    ],
    availability: 'available',
  },
  {
    slug: 'use-transition',
    title: 'useTransition',
    tagline: 'Keep urgent interactions responsive while deferring heavy updates.',
    track: 'core-hooks',
    problem:
      'Expensive updates can make typing and clicks feel laggy. useTransition marks non-urgent updates so urgent interactions stay responsive while background rendering catches up.',
    reactTracks:
      'React schedules transition updates at lower priority. Urgent updates render first, while transition work can be interrupted and resumed for smoother interactivity.',
    explainLines: [
      'useTransition separates urgent and non-urgent updates.',
      'startTransition wraps updates that can lag slightly without hurting UX.',
      'isPending indicates transition work is still processing.',
      'Do not use transition for controlled input value itself.',
      'Use transitions where computation-heavy rendering follows fast input events.',
    ],
    sampleCode: `const [isPending, startTransition] = useTransition()

function onQueryChange(value: string) {
  setQuery(value) // urgent
  startTransition(() => {
    setFiltered(expensiveFilter(items, value)) // non-urgent
  })
}`,
    exploreCode: `setQuery(value)

if (useTransitionMode) {
  startTransition(() => setFilterQuery(value))
} else {
  setFilterQuery(value)
}`,
    exploreGoal:
      'Compare typing responsiveness when heavy filtering updates are scheduled as transitions.',
    exploreSteps: [
      'Keep Transition mode on and type quickly in the search field.',
      'Switch to Immediate mode and type the same sequence.',
      'Watch pending badge and overall responsiveness differences.',
      'Describe which updates are urgent versus deferrable in this UI.',
    ],
    exploreNotes: [
      'Query state updates immediately to reflect user typing.',
      'Filter query can be deferred as transition work.',
      'Pending state exposes active transition processing.',
      'Large dataset filtering amplifies scheduling differences.',
    ],
    commonMistake:
      'Wrapping input value state in startTransition, which can make controlled input feel wrong.',
    implementationGuide:
      'Build a searchable analytics table where typing stays immediate while filtering/sorting large rows runs in a transition. This pattern is effective for admin tools and reporting pages.',
    practiceTasks: [
      'Add an item-count summary and keep it synced with filtered output.',
      'Toggle between transition and immediate update strategies.',
      'Display pending state without blocking typing interactions.',
      'Write down one update that must remain urgent in this component.',
    ],
    recap:
      'useTransition helps preserve perceived performance by prioritizing what users feel first. Keep immediate UI feedback urgent, and defer expensive render work that can complete shortly after.',
    understandingQuestions: [
      'What updates should remain urgent when using useTransition?',
      'Why is isPending useful for UX feedback?',
      'How does useTransition differ from debouncing input?',
    ],
    understandingAnswers: [
      'Direct interaction feedback like controlled input value and critical button state.',
      'It lets you communicate background rendering without freezing urgent interactions.',
      'Transition changes scheduling priority; debounce delays updates by time.',
    ],
    interviewQuestions: [
      'When would you choose useTransition over manual throttling/debouncing?',
      'How do you identify transition candidates in an existing app?',
      'What pitfalls appear when everything is wrapped in startTransition?',
    ],
    interviewAnswers: [
      'When heavy UI rendering is the bottleneck and urgent interactions must remain immediate.',
      'Profile interactions and mark expensive non-blocking updates after user input as candidates.',
      'Critical updates may feel delayed, causing confusing UX and state lag where immediacy is required.',
    ],
    availability: 'available',
  },
  {
    slug: 'use-deferred-value',
    title: 'useDeferredValue',
    tagline: 'Keep fast input updates while expensive UI lags safely behind.',
    track: 'core-hooks',
    problem:
      'Sometimes you want typed input to stay instant while heavy rendering catches up a little later. useDeferredValue lets rendering that depends on a value trail behind urgent input updates.',
    reactTracks:
      'React keeps a deferred version of a value at lower priority. Urgent renders see the latest value immediately, while expensive subtrees can render from the deferred value when time allows.',
    explainLines: [
      'useDeferredValue returns a lagging version of a changing value.',
      'Use the original value for urgent UI like controlled inputs.',
      'Use the deferred value for expensive filtering/rendering work.',
      'Lag is scheduling-based, not a fixed timer delay.',
      'It complements transitions when you pass a value downstream.',
    ],
    sampleCode: `const [query, setQuery] = useState('')
const deferredQuery = useDeferredValue(query)

const visible = useMemo(() => {
  return expensiveFilter(items, deferredQuery)
}, [deferredQuery])`,
    exploreCode: `setQuery(value) // urgent input update
const deferredQuery = useDeferredValue(query)

const results = useMemo(
  () => expensiveFilter(items, deferredQuery),
  [deferredQuery]
)`,
    exploreGoal:
      'Observe how typing remains immediate while expensive result rendering follows deferred value updates.',
    exploreSteps: [
      'Type quickly into the input and watch immediate query text.',
      'Compare immediate query and deferred query values.',
      'Observe result list updates while deferred query catches up.',
      'Identify which parts of UI should stay urgent versus deferred.',
    ],
    exploreNotes: [
      'Input field always reflects the latest query immediately.',
      'Deferred query may trail behind during heavy computation.',
      'Filtering work subscribes to deferred query, not urgent query.',
      'Deferred lag is intentional to preserve interaction responsiveness.',
    ],
    commonMistake:
      'Replacing urgent interaction state with deferred state everywhere, causing confusing UI lag.',
    implementationGuide:
      'Build a large searchable table where the textbox updates instantly, but expensive row filtering and chart previews use deferred query values. This pattern keeps admin tools responsive under large datasets.',
    practiceTasks: [
      'Add a badge that indicates when deferred value is behind the input value.',
      'Move expensive list computation to depend only on deferred query.',
      'Keep validation and input echo on urgent query state.',
      'Write one rule for choosing deferred versus urgent consumers.',
    ],
    recap:
      'useDeferredValue protects interaction responsiveness by allowing heavy render paths to lag behind urgent updates. Keep immediate user feedback tied to the source value, and attach expensive rendering to the deferred value.',
    understandingQuestions: [
      'How is useDeferredValue different from debouncing?',
      'Which UI parts should consume deferred values?',
      'Why should controlled input value not use deferred state?',
    ],
    understandingAnswers: [
      'Deferred value changes by rendering priority, not a fixed time delay like debounce.',
      'Expensive computations and large rendering subtrees are best deferred consumers.',
      'Input echo must remain immediate; deferring it can make typing feel broken.',
    ],
    interviewQuestions: [
      'When would you choose useDeferredValue over useTransition?',
      'How can you expose deferred lag state in UX safely?',
      'What profiling signs suggest deferred value could help?',
    ],
    interviewAnswers: [
      'Use deferred value when a child subtree depends on a changing value and can lag.',
      'Compare source and deferred values to show a subtle pending indicator only when lag exists.',
      'Typing/input events stay fast, but expensive render work causes frame drops in dependent UI.',
    ],
    availability: 'available',
  },
  {
    slug: 'use-id',
    title: 'useId',
    tagline: 'Generate stable, unique IDs for accessible UI wiring.',
    track: 'core-hooks',
    problem:
      'Reusable form components need unique IDs for labels, hints, and error messages without collisions. useId provides stable IDs that work safely with server rendering and hydration.',
    reactTracks:
      'React generates deterministic IDs scoped to the component tree, so server and client markup stay consistent across hydration while keeping IDs unique per rendered instance.',
    explainLines: [
      'useId generates unique IDs for accessibility relationships.',
      'It is ideal for label htmlFor and aria-describedby wiring.',
      'IDs remain stable for a component instance across rerenders.',
      'Do not use useId as list keys; keys come from your data.',
      'Reusable components become safer because each instance gets unique IDs.',
    ],
    sampleCode: `const inputId = useId()
const hintId = useId()

return (
  <>
    <label htmlFor={inputId}>Email</label>
    <input id={inputId} aria-describedby={hintId} />
    <p id={hintId}>We will never share your email.</p>
  </>
)`,
    exploreCode: `function Field({ label }: { label: string }) {
  const id = useId()
  const hintId = \`\${id}-hint\`

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={hintId} />
      <p id={hintId}>Helper text</p>
    </>
  )
}`,
    exploreGoal:
      'Verify that repeated field components get unique, stable IDs while preserving accessibility links.',
    exploreSteps: [
      'Render multiple field instances generated from one reusable component.',
      'Inspect displayed IDs and confirm each instance is unique.',
      'Focus labels and verify they target the correct input.',
      'Explain why this remains safe in SSR and hydration contexts.',
    ],
    exploreNotes: [
      'Each field instance receives a unique base ID from useId.',
      'Derived IDs can connect hints/errors via aria-describedby.',
      'Label click should always focus the matching input.',
      'useId IDs are deterministic for server-client consistency.',
    ],
    commonMistake: 'Using array index or random values for accessibility IDs in reusable forms.',
    implementationGuide:
      'Create a shared FormField component used across signup, profile, and settings pages. Generate input/hint/error IDs with useId so every instance remains accessible and collision-free.',
    practiceTasks: [
      'Add error text element with aria-describedby chaining.',
      'Render two copies of the same field component and compare IDs.',
      'Document why list keys and useId serve different purposes.',
      'Add one checkbox and wire label association with useId.',
    ],
    recap:
      'useId is an accessibility and SSR consistency tool for unique element relationships. It prevents ID collisions in reusable components while keeping label and ARIA wiring robust.',
    understandingQuestions: [
      'Why is useId preferred over random IDs in SSR apps?',
      'What relationships are commonly wired with useId?',
      'Why should useId not be used as React list keys?',
    ],
    understandingAnswers: [
      'useId is deterministic across server and client renders, avoiding hydration mismatch risk.',
      'htmlFor/id and ARIA links like aria-describedby and aria-labelledby.',
      'Keys identify data identity for reconciliation; useId identifies DOM element relationships.',
    ],
    interviewQuestions: [
      'How do you build accessible reusable field components at scale?',
      'What SSR pitfalls does useId help prevent?',
      'How would you combine useId with form libraries?',
    ],
    interviewAnswers: [
      'Standardize field primitives that generate IDs and connect label/hint/error semantics automatically.',
      'It avoids server-client ID divergence and cross-instance collisions during hydration.',
      'Use useId for DOM accessibility wiring while libraries manage value/validation state.',
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
