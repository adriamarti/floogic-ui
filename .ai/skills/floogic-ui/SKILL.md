---
name: floogic-ui
description: Complete guide, architectural constraints, token references, and component recipes for Floogic UI (React + StyleX + Radix UI). Use whenever creating or modifying React UI interfaces in projects using floogic-ui.
---

# Floogic UI Skill (`floogic-ui`)

This skill equips AI agents with full knowledge of **Floogic UI**, a token-driven React Design System built with StyleX (`@stylexjs/stylex`) and Radix UI primitives.

## 1. Non-Negotiable Architectural Rules

### Rule 1: Compound Components API Only
All multi-part components export child elements strictly as static properties on the main compound parent component.
- **ALWAYS write**: `<Card.Content>`, `<Modal.Title>`, `<Accordion.Item>`, `<Alert.Heading>`, `<Select.Item>`, `<Tabs.List>`, `<Switch.Field>`, `<TextInput.Field>`.
- **NEVER import standalone subcomponents**: `import { CardContent, ModalTitle }` IS STRICTLY FORBIDDEN and will cause build failures.

### Rule 2: StyleX Styling Engine Only
Custom component styling is accepted exclusively via `style?: stylex.StyleXStyles`.
- **ALWAYS use StyleX**: Pass custom styles created with `stylex.create(...)`.
- **NEVER use native CSS classes or inline styles**: `className="..."` and `style={{ ... }}` on Floogic components are forbidden.

### Rule 3: Direct Token References
Never hardcode hex colors (`#ffffff`), raw pixel values (`16px`), or font families.
- Import design tokens directly from token files for StyleX rules:
  ```tsx
  import { colors } from 'floogic-ui/tokens/colors.stylex';
  import { spacing } from 'floogic-ui/tokens/spacing.stylex';
  import { shape } from 'floogic-ui/tokens/shape.stylex';
  import { borders } from 'floogic-ui/tokens/borders.stylex';
  ```

---

## 2. Component Catalog & Exact Compound APIs

- **Accordion**: `<Accordion type="single"|"multiple"><Accordion.Item value="1"><Accordion.Trigger>Title</Accordion.Trigger><Accordion.Content>Body</Accordion.Content></Accordion.Item></Accordion>`
- **Alert**: `<Alert tone="error"|"warning"|"success"|"neutral"><Alert.Icon /><Alert.Heading>Title</Alert.Heading><Alert.Description>Msg</Alert.Description></Alert>`
- **Avatar**: `<Avatar size="large"><Avatar.Fallback>AD</Avatar.Fallback><Avatar.Badge><BadgeDot status="online" /></Avatar.Badge></Avatar>`
- **Button**: `<Button variant="primary" tone="brand" size="medium"><Button.Icon><Icon /></Button.Icon><Button.Label>Click</Button.Label></Button>`
- **Card**: `<Card variant="elevated"><Card.Media src="..." /><Card.Content><Card.Heading>Heading</Card.Heading><Card.Description>Desc</Card.Description><Card.Footer><Button ... /></Card.Footer></Card.Content></Card>`
- **Modal**: `<Modal open={open} onOpenChange={setOpen}><Modal.Content><Modal.Header><Modal.Title>Title</Modal.Title><Modal.CloseButton aria-label="Close" /></Modal.Header><Modal.Body>Body</Modal.Body><Modal.Footer><Button ... /></Modal.Footer></Modal.Content></Modal>`
- **Select**: `<Select><Select.Trigger placeholder="Select..." /><Select.Content><Select.Item value="a">Option A</Select.Item></Select.Content></Select>`
- **Switch**: `<Switch><Switch.Label>Toggle</Switch.Label><Switch.Field checked={val} onCheckedChange={setVal} /></Switch>`
- **Tabs**: `<Tabs defaultValue="tab1"><Tabs.List><Tabs.Item value="tab1">Tab 1</Tabs.Item></Tabs.List><Tabs.Panel value="tab1">Panel 1</Tabs.Panel></Tabs>`
- **TextInput**: `<TextInput><TextInput.Label>Label</TextInput.Label><TextInput.Field placeholder="..." value={val} onChange={...} /></TextInput>`
- **TextArea**: `<TextArea><TextArea.Label>Label</TextArea.Label><TextArea.Field placeholder="..." value={val} onChange={...} /></TextArea>`

---

## 3. UI Assembly Recipes Reference

For complete page compositions (Auth Forms, Settings Panels, Data Tables, Modal Workflows), refer to pre-built recipes in `src/recipes/` or `.ai/llms-full.txt`.
