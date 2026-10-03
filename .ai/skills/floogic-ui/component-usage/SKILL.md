---
name: floogic-ui-usage
description: Complete guide, architectural constraints, design token references, and component syntax guidelines for consuming Floogic UI (React + StyleX + Radix UI). Use whenever creating or modifying React UI interfaces in applications using floogic-ui.
---

# Floogic UI — Component Usage Skill (`floogic-ui-usage`)

This skill equips AI agents with complete, up-to-date knowledge of **Floogic UI** for building React user interfaces.

## 1. Architectural Constraints for Consumers
- **Compound Components Only**: Use `<Card.Heading>`, `<Modal.Title>`, `<Accordion.Item>`, `<Select.Item>`, `<Tabs.List>`, `<Switch.Field>`, `<TextInput.Field>`. Never import standalone child components (`import { CardHeading }` is forbidden).
- **StyleX Styling Engine & Native Overrides**: Custom StyleX overrides are passed via `stylex?: stylex.StyleXStyles`. Native CSS class names (`className="..."`) and inline styles (`style={{ ... }}`) are fully supported and forwarded to underlying elements.
- **Design Tokens Only**: All color, spacing, radius, typography, and elevation values must reference `@floogic/ui` tokens (`colors`, `spacing`, `shape`, `borders`, `typography`, `elevation`, `motion`).

---

## 2. Design Token Exports (`@floogic/ui/tokens` or `@floogic/ui`)

Tokens can be imported together from `@floogic/ui/tokens` (recommended):
```tsx
import { colors, spacing, shape, fonts, borders, elevation, durations, easings } from '@floogic/ui/tokens';
```
Or directly from `@floogic/ui`:
```tsx
import { colors, spacing, shape } from '@floogic/ui';
```

| Token Export | Keys & Usage |
| :--- | :--- |
| **`colors`** | `backgroundBase`, `backgroundRaised`, `fillBrandStrong`, `fillNeutralWeak`, `textStrong`, `textWeak`, `strokeWeak`, `statusError`, `statusSuccess` |
| **`spacing`** | `space1` (4px), `space2` (8px), `space3` (12px), `space4` (16px), `space6` (24px), `space8` (32px), `space12` (48px) |
| **`shape`** | `radiusNone`, `radiusSm`, `radiusMd`, `radiusLg`, `radiusFull` |
| **`borders`** | `hairline`, `medium`, `thick`, `accent` |
| **`typography`** | `fonts.sans`, `fontSizes.h1`..`h6`, `fontSizes.body`, `fontSizes.caption`, `fontWeights.medium`..`bold` |
| **`elevation`** | `elev1`, `elev2`, `elev3` |
| **`motion`** | `durations.fast`, `durations.normal`, `easings.standard` |

---

## 3. Full 34-Component Catalog Reference

- **Accordion**: `<Accordion type="single"|"multiple"><Accordion.Item value="1"><Accordion.Trigger>Title</Accordion.Trigger><Accordion.Content>Body</Accordion.Content></Accordion.Item></Accordion>`
- **Alert**: `<Alert tone="error"|"warning"|"success"|"neutral"><Alert.Icon /><Alert.Heading>Title</Alert.Heading><Alert.Description>Msg</Alert.Description><Alert.Actions><Button ... /></Alert.Actions></Alert>`
- **AlertGlobal**: `<AlertGlobal tone="warning"><AlertGlobal.Icon /><AlertGlobal.Description>System notice</AlertGlobal.Description><AlertGlobal.Actions><Button ... /></AlertGlobal.Actions></AlertGlobal>`
- **Avatar**: `<Avatar size="large"><Avatar.Image src="..." /><Avatar.Fallback>AD</Avatar.Fallback><Avatar.Badge><BadgeDot status="online" /></Avatar.Badge></Avatar>`
- **Badge**: `<Badge tone="brand" size="medium"><Badge.Icon><Icon /></Badge.Icon><Badge.Label>Label</Badge.Label></Badge>`
- **BadgeCount**: `<BadgeCount count={5} max={99} overflow="ellipsis" />`
- **BadgeDot**: `<BadgeDot status="online"|"offline"|"busy"|"away" />`
- **Breadcrumbs**: `<Breadcrumbs><Breadcrumbs.Item href="#">Home</Breadcrumbs.Item><Breadcrumbs.Item current>Current</Breadcrumbs.Item></Breadcrumbs>`
- **Button**: `<Button variant="primary" tone="brand" size="medium"><Button.Icon><Icon /></Button.Icon><Button.Label>Click</Button.Label></Button>`
- **ButtonGroup**: `<ButtonGroup orientation="horizontal" size="medium"><Button ... /><Button ... /></ButtonGroup>`
- **Card**: `<Card variant="elevated"><Card.Media src="..." /><Card.Content><Card.Heading>Heading</Card.Heading><Card.Description>Desc</Card.Description><Card.Footer><Button ... /></Card.Footer></Card.Content></Card>`
- **CheckboxGroup**: `<CheckboxGroup><CheckboxGroup.Label>Options</CheckboxGroup.Label><CheckboxGroup.Item value="1">Choice 1</CheckboxGroup.Item><CheckboxGroup.Hint>Help text</CheckboxGroup.Hint></CheckboxGroup>`
- **DatePicker**: `<DatePicker date={date} onDateChange={setDate} />`
- **Divider**: `<Divider orientation="horizontal"|"vertical" />`
- **Drawer**: `<Drawer open={open} onOpenChange={setOpen} position="right"><Drawer.Content><Drawer.Header><Drawer.Title>Title</Drawer.Title><Drawer.CloseButton aria-label="Close" /></Drawer.Header><Drawer.Body>Body</Drawer.Body><Drawer.Footer><Button ... /></Drawer.Footer></Drawer.Content></Drawer>`
- **HoverCard**: `<HoverCard><HoverCard.Trigger>Hover me</HoverCard.Trigger><HoverCard.Content>Hover content</HoverCard.Content></HoverCard>`
- **IconButton**: `<IconButton aria-label="Action description" variant="secondary"><Icon /></IconButton>`
- **IconContainer**: `<IconContainer size="md" shape="circle" tone="brand"><Icon /></IconContainer>`
- **Modal**: `<Modal open={open} onOpenChange={setOpen}><Modal.Content size="medium"><Modal.Header><Modal.Title>Title</Modal.Title><Modal.CloseButton aria-label="Close" /></Modal.Header><Modal.Body>Body</Modal.Body><Modal.Footer><Button ... /></Modal.Footer></Modal.Content></Modal>`
- **Pagination**: `<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />`
- **Popover**: `<Popover><Popover.Trigger><Button ... /></Popover.Trigger><Popover.Content><Popover.Close />Content</Popover.Content></Popover>`
- **Progress**: `<Progress value={60} max={100} showLabel />`
- **RadioGroup**: `<RadioGroup value={val} onValueChange={setVal}><RadioGroup.Label>Options</RadioGroup.Label><RadioGroup.Item value="1">Choice 1</RadioGroup.Item></RadioGroup>`
- **SegmentedControl**: `<SegmentedControl value={val} onValueChange={setVal}><SegmentedControl.Item value="a">Option A</SegmentedControl.Item><SegmentedControl.Item value="b">Option B</SegmentedControl.Item></SegmentedControl>`
- **Select**: `<Select value={val} onValueChange={setVal}><Select.Trigger placeholder="Select..." /><Select.Content><Select.Group><Select.Item value="a">Option A</Select.Item></Select.Group></Select.Content></Select>`
- **Slider**: `<Slider value={[50]} min={0} max={100} onValueChange={setVal} />`
- **Steps**: `<Steps currentStep={1} steps={[{ title: 'Step 1' }, { title: 'Step 2' }]} />`
- **Switch**: `<Switch><Switch.Label>Toggle</Switch.Label><Switch.Field checked={val} onCheckedChange={setVal} /></Switch>`
- **Tabs**: `<Tabs defaultValue="tab1"><Tabs.List><Tabs.Item value="tab1">Tab 1</Tabs.Item></Tabs.List><Tabs.Panel value="tab1">Panel 1</Tabs.Panel></Tabs>`
- **TextArea**: `<TextArea><TextArea.Label>Bio</TextArea.Label><TextArea.Field placeholder="Tell us about yourself..." /></TextArea>`
- **TextInput**: `<TextInput><TextInput.Label>Label</TextInput.Label><TextInput.Field placeholder="..." value={val} onChange={...} /></TextInput>`
- **Toast**: `<Toast open={open} onOpenChange={setOpen}><Toast.Title>Notice</Toast.Title><Toast.Description>Details</Toast.Description><Toast.Close /></Toast>`
- **Tooltip**: `<Tooltip><Tooltip.Trigger><Button ... /></Tooltip.Trigger><Tooltip.Content>Tooltip text</Tooltip.Content></Tooltip>`
- **Typography**: `<Typography variant="h1"|"h2"|"h3"|"body"|"caption">Text content</Typography>`

---

## 4. Component Composition Example (Auth Card)

```tsx
import React from 'react';
import { Card, TextInput, Button, colors, spacing } from '@floogic/ui';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    maxWidth: '400px',
    margin: `${spacing.space8} auto`,
    backgroundColor: colors.backgroundRaised,
  },
});

export function AuthCard() {
  return (
    <Card stylex={styles.container}>
      <Card.Content>
        <Card.Heading>Sign In</Card.Heading>
        <Card.Description>Enter your credentials to continue.</Card.Description>
        <TextInput>
          <TextInput.Label>Email</TextInput.Label>
          <TextInput.Field placeholder="user@example.com" type="email" />
        </TextInput>
        <Card.Footer>
          <Button variant="primary" tone="brand">
            <Button.Label>Continue</Button.Label>
          </Button>
        </Card.Footer>
      </Card.Content>
    </Card>
  );
}
```

