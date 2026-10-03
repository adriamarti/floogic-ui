# Gemini & Antigravity Guide for Floogic UI (`@floogic/ui`)

This repository uses **@floogic/ui**, a token-driven React Design System built with StyleX and Radix UI primitives.

## Mandatory Rules for Gemini & Antigravity Assistants

1. **Compound Component Exports Only**:
   - Multi-part components export child elements strictly as static properties on the main component (e.g. `<Card.Content>`, `<Modal.Title>`, `<Modal.CloseButton>`, `<Accordion.Item>`, `<Select.Item>`).
   - DO NOT import subcomponents as standalone imports (`import { CardContent }` IS FORBIDDEN).

2. **StyleX Styling Engine (`stylex` prop)**:
   - Custom component styling is passed via `stylex?: stylex.StyleXStyles` (e.g. `<Card stylex={styles.card}>`).
   - DO NOT pass StyleX objects to native `style={...}`.
   - Native `className` and standard inline `style` objects are supported via `mergeStyles` for non-StyleX overrides, but StyleX + tokens is the primary styling method.

3. **Strict Design Tokens**:
   - Import design tokens directly from `@floogic/ui` or token subpaths:
     ```tsx
     import { colors, spacing, shape, borders, fonts, fontSizes, fontWeights, elevation } from '@floogic/ui';
     ```

4. **Component Patterns**:
   - **Modal**: `<Modal open={open} onOpenChange={setOpen}><Modal.Content><Modal.Header><Modal.Title>Title</Modal.Title><Modal.CloseButton aria-label="Close" /></Modal.Header><Modal.Body>...</Modal.Body><Modal.Footer><Button ... /></Modal.Footer></Modal.Content></Modal>`
   - **Card**: `<Card stylex={styles.card}><Card.Media src="..." /><Card.Content><Card.Heading>Title</Card.Heading><Card.Description>Desc</Card.Description><Card.Footer><Button ... /></Card.Footer></Card.Content></Card>`
   - **Button**: `<Button variant="primary" tone="brand" size="medium"><Button.Icon><Icon /></Button.Icon><Button.Label>Action</Button.Label></Button>`
   - **TextInput**: `<TextInput><TextInput.Label>Label</TextInput.Label><TextInput.Field value={val} onChange={...} /></TextInput>`

5. **Reference Files & Skills**:
   - Consult `.ai/floogic-ui/llms.txt` and `.ai/floogic-ui/llms-full.txt` for all 34 component specs.
   - Consult `.ai/floogic-ui/skills/floogic-ui/component-usage/SKILL.md` for usage guidelines and examples.
