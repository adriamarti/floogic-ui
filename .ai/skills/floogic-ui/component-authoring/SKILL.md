---
name: floogic-ui-authoring
description: Developer guide and skill for authoring new components in floogic-ui following the 7 core architectural guidelines (Compound components, StyleX, Tokens, Radix UI, Accessibility). Use whenever adding a new component or modifying existing components in floogic-ui codebase.
---

# Floogic UI — Component Authoring Skill (`floogic-ui-authoring`)

Use this skill when developing or contributing new components to the **`floogic-ui`** codebase in strict compliance with [COMPONENT_GUIDELINES.md](../../../../COMPONENT_GUIDELINES.md).

---

## 1. CLI Scaffolding Tool
Maintainers can scaffold starter boilerplate immediately:
```bash
yarn floogic-ui create-component NewComponent
```

---

## 2. File Structure for a New Component (`src/components/NewComponent/`)

```
src/components/NewComponent/
├── NewComponent.tsx        # Component logic, JSX, and compound export
├── NewComponent.stylex.ts  # StyleX definitions using design tokens
└── index.ts                # Public exports (parent component and types only)
```

---

## 3. The 7 Non-Negotiable Authoring Rules

1. **Compound Component Export Strategy**:
   - `export const Parent = Object.assign(ParentRoot, { Child1, Child2 })`
   - In `index.ts`, export ONLY `Parent` and TypeScript prop interfaces. Do NOT export child components separately.
2. **Universal `style` Prop Support**:
   - Accept `style?: stylex.StyleXStyles` and resolve via `stylex.props(styles.root, style)`.
3. **Radix Primitive Integration**:
   - Extend Radix UI primitive props where applicable, omitting `className` and native `style`.
4. **HTML Element & Accessibility Props**:
   - Extend `React.HTMLAttributes<T>` for `id`, `aria-*`, `data-*`, and event handlers.
5. **Strict Token Usage**:
   - Import tokens directly from `../../tokens/*.stylex`. Zero hardcoded numbers/pixels/hex values in `.stylex.ts`.
6. **StyleX Styling Only**:
   - All component styles MUST be configured via StyleX (`stylex.props(...)`). Zero native inline `style={{ ... }}` in `.tsx`.
7. **English Comments & JSDoc**:
   - Write all code comments and JSDoc strings in English.

---

## 4. Audit & Verification

Before finalizing a new component:
1. Run `yarn build` to verify TypeScript and StyleX compilation.
2. Run `yarn check:ai-compliance` to verify compliance with Floogic UI standards.
