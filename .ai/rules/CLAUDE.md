# Claude Code Guide for Floogic UI (`floogic-ui`)

This project uses **floogic-ui**, a token-driven React Design System built with StyleX and Radix UI.

## Mandatory Rules for Claude
1. **Compound Component Syntax**:
   - Use `<Card.Heading>`, `<Modal.Title>`, `<Accordion.Item>`, `<Select.Item>`, `<Tabs.List>`.
   - Never import subcomponents directly (e.g. `import { CardHeading }` is incorrect).

2. **StyleX Styling Only**:
   - Components accept styling strictly via `style?: stylex.StyleXStyles`.
   - Do NOT use native `className="..."` or inline `style={{ ... }}`.

3. **Design Tokens**:
   - Import tokens from `floogic-ui/tokens/...`: `colors`, `spacing`, `shape`, `borders`, `fonts`, `fontSizes`, `fontWeights`, `elevation`.
   - Zero hardcoded pixel or color values.

### Context Index
- See `.ai/llms.txt` and `.ai/llms-full.txt` for full component and API specifications.
