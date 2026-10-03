# Floogic UI

A modern, highly accessible, token-driven Design System built with **React**, **StyleX** (`@stylexjs/stylex`), and **Radix UI Primitives**.

---

## Features

- 🎨 **Token-Driven Architecture**: Fully powered by StyleX design tokens (`colors`, `spacing`, `shape`, `borders`, `typography`, `elevation`, `motion`). Zero hardcoded styles.
- 📦 **Compound Components**: Clean API surface using compound parent exports (e.g. `<Modal.Header>`, `<Card.Content>`, `<Accordion.Item>`).
- 💅 **StyleX & CSS Override Support**: Every component accepts a `stylex?: stylex.StyleXStyles` prop for type-safe StyleX overrides, plus full support for standard HTML `className` and inline `style` attributes.

---

## Installation

Install `floogic-ui` and its peer dependencies using **Yarn**:

```bash
yarn add @floogic/ui @stylexjs/stylex
```

Be sure to include the generated StyleX CSS file in your application's entry point:

```tsx
import '@floogic/ui/style.css';
```

---

## Usage Example

```tsx
import React from 'react';
import { 
  Button, 
  Card, 
  Modal, 
  Toast, 
  colors, 
  spacing 
} from '@floogic/ui';
import * as stylex from '@stylexjs/stylex';

const customStyles = stylex.create({
  cardOverride: {
    padding: spacing.space6,
    backgroundColor: colors.backgroundRaised,
  },
});

export function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <main>
      <Card stylex={customStyles.cardOverride}>
        <Card.Media src="/hero.jpg" alt="Hero image" />
        <Card.Content>
          <Card.Heading>Welcome to Floogic UI</Card.Heading>
          <Card.Description>
            A modern React design system styled with StyleX and powered by Radix UI.
          </Card.Description>
          <Card.Footer>
            <Button variant="primary" tone="brand" onClick={() => setOpen(true)}>
              <Button.Label>Open Modal</Button.Label>
            </Button>
          </Card.Footer>
        </Card.Content>
      </Card>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content size="medium">
          <Modal.Header>
            <Modal.Title>Modal Dialog</Modal.Title>
            <Modal.CloseButton aria-label="Close" />
          </Modal.Header>
          <Modal.Body>
            This is a fully accessible modal dialog.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" tone="neutral" onClick={() => setOpen(false)}>
              <Button.Label>Cancel</Button.Label>
            </Button>
            <Button variant="primary" tone="brand" onClick={() => setOpen(false)}>
              <Button.Label>Confirm</Button.Label>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </main>
  );
}
```

---

## Component Suite

| Component | Description | Compound API Example |
| :--- | :--- | :--- |
| **Accordion** | Collapsible content panels | `<Accordion.Item>`, `<Accordion.Trigger>`, `<Accordion.Content>` |
| **Alert** | Contextual feedback messages | `<Alert.Icon>`, `<Alert.Heading>`, `<Alert.Description>`, `<Alert.Actions>` |
| **AlertGlobal** | Banner notification for global alerts | `<AlertGlobal.Icon>`, `<AlertGlobal.Description>`, `<AlertGlobal.Actions>` |
| **Avatar** | Entity representation with fallback initials/images | `<Avatar.Image>`, `<Avatar.Fallback>`, `<Avatar.Badge>`, `<Avatar.Group>` |
| **Badge** | Small status display tag | `<Badge.Label>`, `<Badge.Icon>` |
| **BadgeCount** | Numerical counter badge | `<BadgeCount>` |
| **BadgeDot** | Minimal status indicator dot | `<BadgeDot>` |
| **Breadcrumbs** | Navigation path trail | `<Breadcrumbs.Item>` |
| **Button** | Interactive trigger for actions | `<Button.Label>`, `<Button.Icon>` |
| **ButtonGroup** | Connected set of action buttons | `<ButtonGroup>` |
| **Card** | Surface container for related content | `<Card.Media>`, `<Card.Content>`, `<Card.Heading>`, `<Card.Description>`, `<Card.Footer>` |
| **CheckboxGroup** | Selectable checkbox option set | `<CheckboxGroup.Label>`, `<CheckboxGroup.Item>`, `<CheckboxGroup.Hint>`, `<CheckboxGroup.Error>` |
| **DatePicker** | Date selection popover with calendar | `<DatePicker>` |
| **Divider** | Content separator line | `<Divider>` |
| **Drawer** | Sliding side panel overlay | `<Drawer.Content>`, `<Drawer.Header>`, `<Drawer.Body>`, `<Drawer.Footer>` |
| **HoverCard** | Popover card displayed on hover | `<HoverCard.Trigger>`, `<HoverCard.Content>` |
| **IconButton** | Icon-only button with forced accessibility label | `<IconButton aria-label="Close">` |
| **IconContainer**| Shaped wrapper for icons | `<IconContainer>` |
| **Modal** | Focused dialog overlay | `<Modal.Content>`, `<Modal.Header>`, `<Modal.Title>`, `<Modal.CloseButton>`, `<Modal.Body>`, `<Modal.Footer>` |
| **Pagination** | Multi-page navigation control | `<Pagination>` |
| **Popover** | Floating card anchored to a trigger element | `<Popover.Trigger>`, `<Popover.Content>`, `<Popover.Close>` |
| **Progress** | Linear progress indicator | `<Progress>` |
| **RadioGroup** | Single-select radio button set | `<RadioGroup.Label>`, `<RadioGroup.Item>`, `<RadioGroup.Hint>`, `<RadioGroup.Error>` |
| **SegmentedControl**| Inline horizontal option switcher | `<SegmentedControl.Item>` |
| **Select** | Dropdown option picker (single & multi) | `<Select.Trigger>`, `<Select.Content>`, `<Select.Item>`, `<Select.Group>` |
| **Slider** | Range input slider | `<Slider>` |
| **Steps** | Multi-step process progress track | `<Steps>` |
| **Switch** | Binary toggle control | `<Switch.Field>`, `<Switch.Label>` |
| **Tabs** | Tabbed content container | `<Tabs.List>`, `<Tabs.Trigger>`, `<Tabs.Content>` |
| **TextArea** | Multiline text input field | `<TextArea>` |
| **TextInput** | Single-line text input field | `<TextInput>` |
| **Toast** | Temporary notification message | `<Toast.Title>`, `<Toast.Description>`, `<Toast.Action>`, `<Toast.Close>` |
| **Tooltip** | Hover/focus contextual helper | `<Tooltip.Trigger>`, `<Tooltip.Content>` |
| **Typography** | Semantic text rendering component | `<Typography variant="h1">` |

---

## Design Tokens

Tokens are defined using `stylex.defineVars` and exported for direct usage in custom StyleX rules:

```tsx
import { 
  colors, 
  spacing, 
  shape, 
  borders, 
  fonts, 
  fontSizes, 
  fontWeights, 
  lineHeights, 
  elevation, 
  durations, 
  easings 
} from '@floogic/ui';
```

---

## 🤖 AI-First & LLM Integration Guide

> 📖 **Complete AI Guide**: For detailed instructions on setting up AI rules, skills, RAG manifests, and MCP servers, read the **[.ai/ Architecture & Integration Guide](./.ai/README.md)**.

`floogic-ui` is built natively to work with AI coding assistants (Antigravity, Cursor, Claude Code, Copilot, ChatGPT).


### 1. Unified CLI (`npx @floogic/ui`)
Run CLI commands directly in any consumer project:
```bash
# Initialize AI rules (.cursorrules, CLAUDE.md, GEMINI.md, etc.) in your project
npx @floogic/ui init-ai

# Audit AI-generated code against Floogic UI rules
npx @floogic/ui check-compliance

# Launch the Model Context Protocol (MCP) server
npx @floogic/ui mcp
```

### 2. AI Manifests (`llms.txt` & `llms-full.txt`)
`floogic-ui` exports standard machine-readable documentation:
- **`llms.txt`**: Concise standard manifest (token-efficient index) for prompt context.
- **`llms-full.txt`**: Exhaustive technical documentation (complete TypeScript signatures & component contracts) for **Claude Projects**, **Custom GPTs**, and **RAG search** in IDEs.

### 3. Connect Model Context Protocol (MCP) Server
Enable your AI assistant to search components, fetch specs, and validate code via MCP:
```json
{
  "mcpServers": {
    "floogic-ui": {
      "command": "npx",
      "args": ["floogic-mcp"]
    }
  }
}
```

For complete AI integration documentation, read [.ai/README.md](./.ai/README.md).

---

## 🚀 Versioning & Release Process

`@floogic/ui` uses **Changesets** and **GitHub Actions** for automated Semantic Versioning (SemVer) and releases.

### 1. Document Changes (`yarn changeset`)
Whenever you add a component, fix a bug, or make changes, run:
```bash
yarn changeset
```
Follow the interactive prompt to select the version bump type (`patch`, `minor`, or `major`) and enter a summary description. Commit the generated `.changeset/*.md` file with your PR.

### 2. Automated Release Workflow
1. When your PR is merged to `main`, GitHub Actions automatically creates or updates a **`chore(release): version package`** Pull Request with the updated `package.json` version and `CHANGELOG.md`.
2. Merging the release PR automatically:
   - Builds and publishes the package to NPM as **`@floogic/ui`**.
   - Creates and pushes the traditional Git tag **`vX.Y.Z`** (e.g. `v0.1.0`) to GitHub.

---

## Documentation & Contribution

For guidelines on creating new components and maintaining design system compliance, please read [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md).

---

## License

MIT © Floogic
