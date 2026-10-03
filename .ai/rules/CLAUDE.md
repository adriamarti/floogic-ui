# Claude Code Guide for Floogic UI (`@floogic/ui`)

This project uses **@floogic/ui**, a token-driven React Design System built with StyleX and Radix UI.

## Mandatory Rules for Claude

1. **Compound Component Syntax**:
   - Use `<Card.Heading>`, `<Modal.Title>`, `<Modal.CloseButton>`, `<Accordion.Item>`, `<Select.Item>`, `<Tabs.List>`.
   - Never import subcomponents directly (`import { CardHeading }` is invalid).

2. **StyleX Styling (`stylex` prop)**:
   - Pass custom StyleX overrides using `stylex={styles.custom}`:
     `<Card stylex={styles.card}>`
   - NEVER pass StyleX objects to native `style={...}`.
   - Native `className` and standard inline `style` objects are supported via `mergeStyles` for non-StyleX overrides.

3. **Design Tokens**:
   - Import tokens from `@floogic/ui`:
     `import { colors, spacing, shape, borders, fonts, fontSizes, fontWeights, elevation } from '@floogic/ui';`
   - Zero hardcoded pixel or hex color values.

4. **Component Patterns**:
   - **Modal**: `<Modal open={open} onOpenChange={setOpen}><Modal.Content><Modal.Header><Modal.Title>Title</Modal.Title><Modal.CloseButton aria-label="Close" /></Modal.Header><Modal.Body>...</Modal.Body><Modal.Footer><Button ... /></Modal.Footer></Modal.Content></Modal>`
   - **Card**: `<Card stylex={styles.card}><Card.Media src="..." /><Card.Content><Card.Heading>Title</Card.Heading><Card.Description>Desc</Card.Description><Card.Footer><Button ... /></Card.Footer></Card.Content></Card>`
   - **Button**: `<Button variant="primary" tone="brand" size="medium"><Button.Icon><Icon /></Button.Icon><Button.Label>Action</Button.Label></Button>`
   - **TextInput**: `<TextInput><TextInput.Label>Label</TextInput.Label><TextInput.Field value={val} onChange={...} /></TextInput>`

### Context Index
- See `.ai/floogic-ui/llms.txt` and `.ai/floogic-ui/llms-full.txt` for all 34 component specs.
- See `.ai/floogic-ui/skills/floogic-ui/component-usage/SKILL.md` for usage guidelines and examples.
