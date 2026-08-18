# Component Development Guidelines (`floogic-ui`)

This guide outlines the mandatory rules, patterns, and architectural standards for contributing new components or updating existing components in **floogic-ui**.

---

## Core Architectural Principles

All components in `floogic-ui` must strictly adhere to the following **7 core rules**:

### 1. Compound Components Export Strategy
- **Rule**: All multi-part components must export subcomponents as static properties on the main compound parent component (`Object.assign(ParentRoot, { Child1, Child2 })`).
- **DO NOT export child components separately**: Child components (e.g. `CardHeader`, `ModalContent`, `AccordionItem`) **must NOT** be exported as standalone named exports in `index.ts` or `src/index.ts`.
- **Example**:
  ```tsx
  // Card.tsx
  const CardRoot = forwardRef<HTMLDivElement, CardProps>(...);
  const CardContent = forwardRef<HTMLDivElement, CardContentProps>(...);
  const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(...);

  export const Card = Object.assign(CardRoot, {
    Content: CardContent,
    Heading: CardHeading,
  });

  // index.ts
  export { Card } from './Card';
  export type { CardProps, CardContentProps, CardHeadingProps } from './Card';
  ```

### 2. Universal `style` Prop Support (`StyleXStyles`)
- **Rule**: Every root component and subcomponent must accept the `style` prop typed as `style?: stylex.StyleXStyles`.
- **Implementation**:
  - `style` must be applied inside the component using `stylex.props(...)`.
  - Always allow passing single style objects or arrays of style objects.
- **Example**:
  ```tsx
  export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
    style?: stylex.StyleXStyles;
  }
  ```

### 3. Radix Primitive Integration & Props Inheritance
- **Rule**: Components extending Radix UI primitives must expose and forward Radix component props without restriction.
- **Implementation**:
  - Extend Radix props interfaces while omitting native `className` and `style` to enforce StyleX usage.
- **Example**:
  ```tsx
  export interface DialogProps extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, 'className' | 'style'> {
    style?: stylex.StyleXStyles;
  }
  ```

### 4. HTML Element Props & Accessibility Support
- **Rule**: All components must permit standard HTML element attributes (`React.HTMLAttributes<T>` or `React.ComponentPropsWithoutRef<T>`) to support accessibility (`aria-*`, `data-*`, `id`, `tabIndex`, event handlers).
- **Example**:
  ```tsx
  export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> {
    tone?: BadgeTone;
    style?: stylex.StyleXStyles;
  }
  ```

### 5. Strict Token Usage (No Hardcoded Styles)
- **Rule**: NEVER hardcode raw pixels (`16px`, `8px`), radii (`9999px`), numerical dimensions, font sizes, or color hex/rgba strings in `.stylex.ts` or `.tsx` files.
- **Always import tokens from `src/tokens/`**:
  - `colors`: `colors.textStrong`, `colors.fillBrandStrong`, `colors.strokeWeak`, `colors.fillOverlay`, etc.
  - `spacing`: `spacing.space1`, `spacing.space2`, `spacing.space4`, `spacing.space6`, etc.
  - `shape`: `shape.radiusSm`, `shape.radiusMd`, `shape.radiusLg`, `shape.radiusFull`, etc.
  - `borders`: `borders.hairline`, `borders.medium`, `borders.accent`.
  - `typography`: `fonts.sans`, `fontSizes.h6`, `fontSizes.caption`, `fontWeights.medium`, `lineHeights.body`.
  - `elevation`: `elevation.elev1`, `elevation.elev2`, `elevation.elev3`.
  - `motion`: `durations.fast`, `easings.standard`.

### 6. StyleX Styling Only (No Native React `style={{ ... }}`)
- **Rule**: ALL component styles must be configured via StyleX (`stylex.props(...)`). Direct inline `style={{ ... }}` attributes on JSX elements are **strictly forbidden**.
- **Dynamic styles**: Use dynamic style functions inside `stylex.create` if runtime values are required.
- **Example**:
  ```tsx
  // Correct:
  const resolved = stylex.props(styles.root, styles.dynamicZIndex(zIndex), style);
  return <div className={resolved.className} style={resolved.style} />;

  // Incorrect:
  return <div style={{ zIndex, fontSize: '14px' }} />; // FORBIDDEN!
  ```

### 7. English Code Comments & JSDoc
- **Rule**: All code comments, docstrings, token descriptions, and commit messages must be written in **English**. No Spanish or mixed-language comments permitted.

---

## Directory & File Structure

When adding a new component (e.g. `NewComponent`), create the following directory structure inside `src/components/`:

```
src/components/NewComponent/
├── NewComponent.tsx        # Component logic, JSX, and compound export
├── NewComponent.stylex.ts  # StyleX definitions using design tokens
└── index.ts                # Public exports (parent component and types only)
```

---

## Step-by-Step Component Creation Template

### Step 1: Define Styles (`NewComponent.stylex.ts`)

```ts
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { borders } from '../../tokens/borders.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.space2,
    backgroundColor: colors.backgroundBase,
    borderRadius: shape.radiusMd,
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    borderColor: colors.strokeWeak,
    padding: spacing.space4,
  },
  title: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h6,
    fontWeight: fontWeights.semiBold,
    color: colors.textStrong,
    margin: 0,
  },
  content: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    color: colors.textWeak,
  },
});
```

### Step 2: Write Component Logic (`NewComponent.tsx`)

```tsx
import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './NewComponent.stylex';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface NewComponentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const NewComponentRoot = forwardRef<HTMLDivElement, NewComponentProps>(
  ({ style, children, ...props }, ref) => {
    const resolved = stylex.props(styles.root, style);
    return (
      <div ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </div>
    );
  }
);
NewComponentRoot.displayName = 'NewComponent';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface NewComponentTitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const NewComponentTitle = forwardRef<HTMLHeadingElement, NewComponentTitleProps>(
  ({ style, children, ...props }, ref) => {
    const resolved = stylex.props(styles.title, style);
    return (
      <h4 ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </h4>
    );
  }
);
NewComponentTitle.displayName = 'NewComponent.Title';

export interface NewComponentContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const NewComponentContent = forwardRef<HTMLDivElement, NewComponentContentProps>(
  ({ style, children, ...props }, ref) => {
    const resolved = stylex.props(styles.content, style);
    return (
      <div ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </div>
    );
  }
);
NewComponentContent.displayName = 'NewComponent.Content';

// ---------------------------------------------------------------------------
// Compound Export
// ---------------------------------------------------------------------------

export const NewComponent = Object.assign(NewComponentRoot, {
  Title: NewComponentTitle,
  Content: NewComponentContent,
});
```

### Step 3: Module Export (`index.ts`)

```ts
export { NewComponent } from './NewComponent';
export type {
  NewComponentProps,
  NewComponentTitleProps,
  NewComponentContentProps,
} from './NewComponent';
```

### Step 4: Add to Root Package (`src/index.ts`)

Add the export line to `src/index.ts`:

```ts
export * from './components/NewComponent';
```

### Step 5: Verification & Package Manager

Always verify compilation and type checks using **Yarn**:

```bash
yarn build
```

---

## Verification Checklist

Before opening a pull request or completing a component, check off each item:

- [ ] Compound component exported as parent object (`Object.assign`).
- [ ] Child components NOT exported separately in `index.ts`.
- [ ] `style?: stylex.StyleXStyles` prop accepted on root and all child components.
- [ ] Props interface extends `React.HTMLAttributes<T>` or Radix primitive props.
- [ ] Zero hardcoded styles in `.stylex.ts` (all values come from `src/tokens/`).
- [ ] Zero native inline `style={{ ... }}` attributes in `.tsx` files.
- [ ] All code comments and JSDoc strings are in English.
- [ ] `yarn build` completes with zero errors.
