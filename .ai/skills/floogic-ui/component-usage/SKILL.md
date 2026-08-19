---
name: floogic-ui-usage
description: Guide, architectural constraints, token references, and component recipes for consuming Floogic UI (React + StyleX + Radix UI). Use whenever creating or modifying React UI interfaces in applications using floogic-ui.
---

# Floogic UI — Component Usage Skill (`floogic-ui-usage`)

This skill equips AI agents with full knowledge of **Floogic UI** for building React user interfaces.

## 1. Architectural Rules for Consumers
- **Compound Components Only**: Use `<Card.Heading>`, `<Modal.Title>`, `<Accordion.Item>`, `<Select.Item>`, `<Tabs.List>`, `<Switch.Field>`, `<TextInput.Field>`. Never import standalone child components (`import { CardHeading }` is forbidden).
- **StyleX Engine Only**: Custom component overrides are passed strictly via `style?: stylex.StyleXStyles`. Native `className="..."` and `style={{ ... }}` are forbidden.
- **Design Tokens Only**: All color, spacing, radius, and font values must reference `floogic-ui` tokens (`colors`, `spacing`, `shape`, `borders`).

---

## 2. Component Catalog Summary
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

---

## 3. UI Assembly Recipes Reference
For complete page compositions (Auth Forms, Settings Panels, Data Tables, Modal Workflows), refer to pre-built recipes in `src/recipes/` or `.ai/llms-full.txt`.
