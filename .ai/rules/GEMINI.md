# Gemini & Antigravity Guide for Floogic UI (`floogic-ui`)

This repository uses **floogic-ui**, a token-driven React Design System built with StyleX and Radix UI primitives.

## Mandatory Rules for Gemini & Antigravity Assistants

1. **Compound Component Exports Only**:
   - Multi-part components export child elements strictly as static properties on the main component (e.g. `<Card.Content>`, `<Modal.Title>`, `<Accordion.Item>`, `<Select.Item>`).
   - DO NOT import subcomponents as standalone imports (`import { CardContent }` IS FORBIDDEN).

2. **StyleX Styling Engine Only**:
   - Custom component styling is passed exclusively via `style?: stylex.StyleXStyles`.
   - Native inline styles (`style={{ ... }}`) and CSS class names (`className="..."`) are STRICTLY FORBIDDEN on Floogic UI components.

3. **Strict Design Tokens**:
   - Import design tokens directly from token files for StyleX rules:
     ```tsx
     import { colors } from 'floogic-ui/tokens/colors.stylex';
     import { spacing } from 'floogic-ui/tokens/spacing.stylex';
     import { shape } from 'floogic-ui/tokens/shape.stylex';
     ```

4. **Reference Files**:
   - Consult `.ai/llms.txt` and `.ai/llms-full.txt` for full component API signatures.
