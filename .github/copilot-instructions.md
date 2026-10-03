# GitHub Copilot Custom Instructions for Floogic UI (`@floogic/ui`)

When suggesting code or generating components for this workspace:

1. **Compound Component Syntax**:
   - Multi-part components export child elements strictly as static properties on the main component.
   - ALWAYS use: `<Card.Content>`, `<Card.Heading>`, `<Modal.Header>`, `<Modal.Title>`, `<Modal.CloseButton>`, `<Accordion.Item>`, `<Select.Item>`, `<Tabs.List>`, `<Tabs.Item>`, `<Tabs.Panel>`.
   - NEVER suggest standalone child imports (e.g. `import { CardContent }` is forbidden).

2. **StyleX Styling (`stylex` prop)**:
   - Apply custom styles via `stylex={styles.custom}` using `stylex.create(...)`.
   - Example: `<Card stylex={styles.card}>`, `<Button stylex={styles.btn}>`.
   - NEVER pass StyleX objects to native `style={...}`.

3. **Design Tokens**:
   - Always import design tokens from `@floogic/ui`:
     `import { colors, spacing, shape, borders, fonts, fontSizes, fontWeights, elevation } from '@floogic/ui';`
   - Zero hardcoded pixel values or hex colors. Examples: `colors.fillBrandStrong`, `spacing.space4`, `shape.radiusMd`.

4. **Component Cheatsheet**:
   - **Modal**: `<Modal open={open} onOpenChange={setOpen}><Modal.Content size="medium"><Modal.Header><Modal.Title>Title</Modal.Title><Modal.CloseButton aria-label="Close" /></Modal.Header><Modal.Body>...</Modal.Body><Modal.Footer><Button ... /></Modal.Footer></Modal.Content></Modal>`
   - **Card**: `<Card stylex={styles.card}><Card.Media src="..." /><Card.Content><Card.Heading>Title</Card.Heading><Card.Description>Desc</Card.Description><Card.Footer><Button ... /></Card.Footer></Card.Content></Card>`
   - **Button**: `<Button variant="primary" tone="brand" size="medium"><Button.Icon><Icon /></Button.Icon><Button.Label>Action</Button.Label></Button>`
   - **TextInput**: `<TextInput><TextInput.Label>Label</TextInput.Label><TextInput.Field value={val} onChange={...} /></TextInput>`
   - **Select**: `<Select value={val} onValueChange={setVal}><Select.Trigger placeholder="Select..." /><Select.Content><Select.Group><Select.Item value="a">A</Select.Item></Select.Group></Select.Content></Select>`

