# Hook Lab

An interactive learning platform for React hooks, design patterns, and JavaScript fundamentals — built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

### React Hooks Curriculum (`/hooks`)

11 interactive lessons covering every core React hook:

| Hook               | Topic                                  |
| ------------------ | -------------------------------------- |
| `useState`         | State counter demo                     |
| `useEffect`        | Effect dependency visualizer           |
| `useRef`           | Ref signal demo                        |
| `useContext`       | Theme context demo                     |
| `useMemo`          | Memo filter demo                       |
| `useCallback`      | Callback stability demo                |
| `useReducer`       | Reducer workflow with undo/history     |
| `useLayoutEffect`  | DOM measurement (layout vs paint)      |
| `useTransition`    | Urgent vs deferred search updates      |
| `useDeferredValue` | Lag status visualization               |
| `useId`            | Accessible form fields with unique IDs |

### React Patterns Curriculum (`/patterns`)

5 lessons on essential React design patterns, each with a live interactive demo:

- **State Colocation** — lifted vs colocated state with sibling render tracking
- **Controlled Forms** — field-level validation + submit-time rule toggling
- **Context Composition** — combined vs composed provider patterns
- **Custom Hook Design** — inline logic vs extracted custom hook comparison
- **Render Profiling** — React `Profiler` API with optimized/unoptimized modes

### JavaScript Quiz (`/quiz`)

155 questions (20 per page, 8 pages) sourced from [javascript-questions](https://github.com/lydiahallie/javascript-questions) by Lydia Hallie:

- Click any option to instantly reveal correct/incorrect with color feedback
- Explanation panel per question
- Live progress bar and score counter
- Page-level reset + previous/next navigation

Topics covered: hoisting, closures, prototypes, classes, type coercion, async/promises, event loop, generators, spread/destructuring, modules, WeakMap, Proxy, tagged templates, and more.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with oklch color tokens
- **Components:** shadcn/ui
- **Testing:** Vitest
- **Progress tracking:** `localStorage` via custom `useLearningProgress` hook

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck   # TypeScript check
npm test            # Vitest unit tests
npm run build       # Production build
```

## Project Structure

```
app/
  hooks/            # Unified curriculum index + individual hook lesson pages
  patterns/         # Pattern lesson pages
  quiz/             # JS quiz index + paginated quiz pages
components/
  learning/         # Lesson shell, nav, progress, interactive demos
  quiz/             # Quiz client component
  ui/               # shadcn/ui primitives
lib/
  hooks-curriculum.ts         # Hook lesson data
  react-patterns-curriculum.ts # Pattern lesson data
  js-questions-parser.ts      # Markdown parser for JS quiz questions
  learning-progress.ts        # Progress state management
public/
  source/
    js-questions.md           # 155 JS questions source file
```
