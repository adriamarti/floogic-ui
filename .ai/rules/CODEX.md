# OpenAI Codex & ChatGPT Guide for Floogic UI (`@floogic/ui`)

System guidance for OpenAI Codex and ChatGPT when generating React interfaces for this repository.

## Core Directives

1. **Compound Component Syntax**:
   - Use `<Card.Heading>`, `<Modal.Title>`, `<Modal.CloseButton>`, `<Accordion.Item>`, `<Select.Item>`, `<Tabs.List>`.
   - Standalone subcomponent imports (e.g. `import { CardHeading }`) do not exist and will break compilation.

2. **StyleX Styling Engine (`stylex` prop)**:
   - Apply component overrides using `stylex={styles.custom}`:
     `<Card stylex={styles.card}>`
   - NEVER pass StyleX objects to `style={...}`.
   - Native `className` and standard inline `style` objects are supported via `mergeStyles` for non-StyleX overrides, but StyleX + tokens is the primary styling method.

3. **Design Tokens**:
   - Always import and use design tokens from `@floogic/ui` (or subpaths `@floogic/ui/tokens`):
     `import { colors, spacing, shape, borders, fonts, fontSizes, fontWeights, elevation } from '@floogic/ui';`
   - Zero raw pixel values or hex codes.

4. **Component Patterns**:
   - **Modal**: `<Modal open={open} onOpenChange={setOpen}><Modal.Content><Modal.Header><Modal.Title>Title</Modal.Title><Modal.CloseButton aria-label="Close" /></Modal.Header><Modal.Body>...</Modal.Body><Modal.Footer><Button ... /></Modal.Footer></Modal.Content></Modal>`
   - **Card**: `<Card stylex={styles.card}><Card.Media src="..." /><Card.Content><Card.Heading>Title</Card.Heading><Card.Description>Desc</Card.Description><Card.Footer><Button ... /></Card.Footer></Card.Content></Card>`
   - **Button**: `<Button variant="primary" tone="brand" size="medium"><Button.Icon><Icon /></Button.Icon><Button.Label>Action</Button.Label></Button>`
   - **TextInput**: `<TextInput><TextInput.Label>Label</TextInput.Label><TextInput.Field value={val} onChange={...} /></TextInput>`

5. **Detailed Reference & Skills**:
   - Read `.ai/floogic-ui/llms.txt` and `.ai/floogic-ui/llms-full.txt` for exact component props and code examples.
   - Read `.ai/floogic-ui/skills/floogic-ui/component-usage/SKILL.md` for full usage skill.
