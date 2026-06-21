---
name: maintainable-code
description: Use whenever writing, editing, refactoring, reviewing, or generating any code, component, function, module, script, config, test, or change to an existing codebase — including new features, bug fixes, refactors, styling tweaks, copy edits, dependency changes, scaffolding, and one-off scripts. Establishes the architecture, naming, structure, and quality guardrails that every code change in this project must follow.
---

# Maintainable Code — Architecture Guardrails

These rules apply to **every** coding action in this repository. Follow them before, during, and after writing or editing code. If a rule conflicts with an explicit user instruction, the user wins — otherwise, these guardrails are mandatory.

## 1. Respect the existing architecture

- **Read before you write.** Before adding or editing anything non-trivial, inspect the surrounding folder (`app/`, `components/`, `data/`, etc.) and at least one neighboring file in the same layer. Mirror its conventions (imports, exports, file layout, naming).
- **Don't invent new top-level folders** unless the user asks. Place new code where similar code already lives.
- **Don't duplicate logic.** If a helper, component, type, or constant already exists, import it. Search first (`grep`/Explore) before defining a new one.
- **One responsibility per file/function.** If a file is doing two unrelated things, that's a signal — extract or relocate before piling on more.

## 2. Naming and structure

- **Descriptive names over short names.** `getUserOrders` beats `getData`. `isCheckoutDisabled` beats `flag`.
- **Match the project's casing conventions.** React components: `PascalCase.tsx`. Hooks: `useThing.ts`. Utilities: `camelCase.ts`. Route segments: lower-case per Next.js conventions.
- **Co-locate related code.** A component's styles, sub-components, and tests live next to it unless the project already has a different pattern.
- **Public exports go through an `index.ts`** only if that pattern is already used in the folder. Don't introduce barrel files unilaterally.

## 3. Types and contracts (TypeScript)

- **No `any` unless justified.** Prefer `unknown` and narrow, or define a proper type. If `any` is the only path, leave a one-line comment with the reason.
- **Define shared types once.** Put cross-file types in a shared `types.ts` (or the project's existing equivalent) instead of redeclaring.
- **Props and function signatures must be typed.** No implicit `any` parameters. Return types on exported functions when they're non-obvious.
- **Prefer `type` for unions/aliases, `interface` for object shapes that may be extended** — but follow whatever the project already does.

## 4. React / Next.js specifics

- **Server vs. client components:** default to server components in the `app/` directory. Only add `"use client"` when the file actually needs browser APIs, state, effects, or event handlers.
- **Hooks at the top level.** Never inside conditions, loops, or nested functions.
- **Keys must be stable and unique** — never the array index when the list can reorder.
- **Don't fetch in `useEffect` when you can fetch on the server.** Prefer server components / route handlers for data loading.
- **Accessibility is not optional.** Buttons are `<button>`, links are `<a>`/`<Link>`, images have `alt`, interactive elements are keyboard reachable.

## 5. State, side effects, and data flow

- **Lift state only as far as it needs to go.** Don't put local UI state in a global store.
- **Pure functions where possible.** Side effects belong in clearly named handlers, effects, or server actions — not in render bodies or selectors.
- **No silent failures.** Errors at system boundaries (network, parsing, user input) must be handled visibly. Don't swallow with empty `catch` blocks.

## 6. Styling

- **Use the project's styling system as-is** (Tailwind, CSS modules, etc. — check `app/globals.css` and existing components first).
- **No inline magic numbers** when a design token or utility class already covers it.
- **Don't introduce a new styling library** without asking.

## 7. Dependencies

- **Don't add packages casually.** Check `package.json` first — the dependency may already be installed. If a new package is genuinely needed, mention it to the user before installing.
- **Don't downgrade or remove dependencies** without explicit approval.
- **Prefer the platform.** If the standard library, Next.js, or React already does it, don't pull in a package.

## 8. What NOT to add

- **No speculative abstractions.** Don't build a generic helper for a single caller. Three similar lines beats a premature abstraction.
- **No dead code.** Don't leave commented-out blocks, `console.log`s, unused imports, or `// TODO` notes without a concrete follow-up.
- **No backward-compat shims** for code that hasn't shipped. Just change it.
- **No comments that restate the code.** Only comment the *why* when it's non-obvious (a constraint, a workaround, a subtle invariant).
- **No new README/docs files** unless the user asks.

## 9. Before you finish

Run this mental checklist on every change:

1. Does this match the conventions of the file/folder it lives in?
2. Are names self-explanatory?
3. Are types tight (no stray `any`)?
4. Is anything duplicated that should be imported instead?
5. Is anything added that the task didn't actually require?
6. Will another contributor understand this in six months without asking?

If any answer is "no," fix it before reporting done.

## 10. When in doubt

- **Read more code before writing more code.**
- **Ask the user** rather than guessing on architectural decisions (new folder, new library, new pattern).
- **Smaller, focused diffs** beat sweeping rewrites.
