# OpenAI Codex & ChatGPT Guide for Floogic UI (`floogic-ui`)

System guidance for OpenAI Codex and ChatGPT when generating React interfaces for this repository.

## Core Directives

1. **Compound Component Syntax**:
   - Use `<Card.Heading>`, `<Modal.Title>`, `<Accordion.Item>`, `<Select.Item>`, `<Tabs.List>`.
   - Standalone subcomponent imports (e.g. `import { CardHeading }`) do not exist and will break compilation.

2. **StyleX Styling Only**:
   - Apply component overrides using `style?: stylex.StyleXStyles`.
   - Never output native HTML `style={{ ... }}` objects or `className="..."` strings.

3. **Design Tokens**:
   - Always use design tokens (`colors`, `spacing`, `shape`, `borders`, `fonts`) instead of raw pixel values or hex codes.

4. **Detailed Reference**:
   - Read `.ai/llms.txt` and `.ai/llms-full.txt` for exact component props and code recipes.
