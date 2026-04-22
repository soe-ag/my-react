## Plan: React Hooks Learning App

Build a hook-learning app that teaches through interactive explanation first, with small guided experiments instead of a full sandbox in v1. This best matches the current blank Next 16 + React 19 + shadcn workspace, keeps scope controlled, and still supports later expansion into broader React patterns.

**Steps**

1. Phase 1 — Define the learning model and content shape. Establish a lesson schema for each hook page with these sections: overview, mental model, common mistakes, interactive demo, guided experiment, recap, and next pattern. Start with core hooks only: useState, useEffect, useRef, useMemo, useCallback, useContext. Design the schema so broader React patterns can be added later without changing page structure.
2. Phase 2 — Replace the starter home page with a product landing page that explains the learning modes. The landing page should clearly separate: quick concept explanation, interactive visualization, and coding-along challenges. This page also acts as the index into the hook lessons. Depends on step 1.
3. Phase 3 — Create a lesson route structure for hooks, likely under app/hooks/[slug]/page.tsx or an equivalent grouped route. Each lesson page should use a consistent composition: theory area, live visualization area, and challenge area. Depends on step 1 and can begin in parallel with step 2 once the lesson schema is fixed.
4. Phase 4 — Build reusable teaching components. Create components for lesson shell, concept cards, state timeline/event log, dependency visualizer, challenge prompt, and self-check recap. These components should favor controlled props and clear composition over one-off page logic. Depends on step 3.
5. Phase 5 — Implement the first lesson set. Start with useState and useEffect as the highest-value pair, then add useRef and useContext. Delay useMemo and useCallback until the learning framing is established, since they are easier to misuse when introduced too early. Depends on step 4.
6. Phase 6 — Add lightweight progression. For v1, track completed lessons and challenge answers locally in browser storage only. Do not add auth or backend persistence. This should support your personal learning now while keeping a path open for later public sharing. Depends on step 5.
7. Phase 7 — Prepare for future expansion into broader React patterns. Reserve a second taxonomy level for patterns such as controlled forms, lifting state, context architecture, custom hooks, composition, and rendering behavior. This is a content and routing design concern only for v1, not a requirement to implement those lessons now. Can be planned in parallel with steps 4 through 6.

**Relevant files**

- d:\WebDev\my-react\app\page.tsx — replace the starter page with the learning app landing page and lesson index entry point.
- d:\WebDev\my-react\app\layout.tsx — update metadata, app framing, and global navigation for lesson discovery.
- d:\WebDev\my-react\app\globals.css — establish the visual system for the educational experience, including spacing, typography, and any visualization styles.
- d:\WebDev\my-react\components\ui\tabs.tsx — reuse for lesson mode switching such as Explain, Explore, and Practice.
- d:\WebDev\my-react\components\ui\card.tsx — reuse for modular lesson sections and challenge blocks.
- d:\WebDev\my-react\components\ui\form.tsx — reuse later if challenge steps include small answer inputs or reflection prompts.
- d:\WebDev\my-react\components\ui\chart.tsx — optional reuse for visualizing state updates or render/event timelines.
- d:\WebDev\my-react\lib\utils.ts — existing utility for class composition.
- d:\WebDev\my-react\vitest.config.ts — extend test coverage for lesson components and interaction behavior once implementation begins.

**Verification**

1. Validate the information architecture manually: a new user should be able to answer what this app teaches, how they learn, and where to start within 10 seconds of landing.
2. For each hook lesson, verify the interactive explanation demonstrates one core mental model and one common failure mode.
3. Run the app-level quality checks after implementation: lint, typecheck, and vitest.
4. Manually test responsive behavior on desktop and mobile for the landing page and one lesson page.
5. Confirm local progress state survives refresh and is clearly resettable.

**Decisions**

- Primary mode: interactive explanation first, not text-only and not a heavy code playground in v1.
- Audience: personal learning now, but the structure should be clean enough to polish for others later.
- Initial scope: core hooks only.
- Planned expansion: broader React patterns later, using the same lesson architecture.
- Explicitly excluded from v1: authentication, backend progress sync, public multi-user features, and a full in-browser code editor.

**Further Considerations**

1. Recommended pedagogy: each hook lesson should answer three questions in order — what problem this hook solves, what React is tracking internally, and what mistake beginners usually make.
2. Recommended product shape: use a hybrid of short text, visual interaction, and tiny coding decisions. Text-only will be easier to build but weaker for hook intuition; a full sandbox is more work than necessary for the first version.
3. Recommended content order: useState, useEffect, useRef, useContext, useMemo, useCallback, then custom hooks and broader patterns.
