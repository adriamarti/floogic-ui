# @floogic/ui

## 0.2.0

### Minor Changes

- **Breaking Change**: Renamed StyleX style prop from `style` to `stylex` across all 34 design system components.
- **Native HTML Overrides**: Enabled standard `className` and HTML `style` overrides using `mergeStyles` utility across all components.
- **Semantic HTML & Accessibility**: Added accessible default HTML tags and attributes (`type="button"`, `type="text"`, `<p>` for descriptions, `role="group"` / `role="radiogroup"`).
- **Unified Design Tokens**: Added grouped token imports via `@floogic/ui/tokens` powered by `@floogic/ui/babel` pre-transform plugin.
- **Recipe Extraction**: Cleaned library footprint and extracted recipes to documentation app.

## 0.1.1

### Patch Changes

- 4ed5c1f: Export token subpaths (`./tokens/*`) in package.json exports map
