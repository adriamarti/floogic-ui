# Floogic UI AI Architecture & Integration Guide

> Complete reference on how to interact with and integrate **Floogic UI** using LLMs and AI coding assistants (Antigravity, Claude, Cursor, Copilot, ChatGPT).

---

## 1. Quick Start via CLI (`npx floogic-ui`)

Any developer installing or downloading `floogic-ui` via npm can execute the built-in CLI commands directly:

```bash
# 1. Initialize AI agent rules (.cursorrules, CLAUDE.md, GEMINI.md, etc.) in your project
npx floogic-ui init-ai

# 2. Audit your project's codebase against Floogic UI rules (StyleX, tokens, compound syntax)
npx floogic-ui check-compliance

# 3. Launch the Floogic UI Model Context Protocol (MCP) server
npx floogic-ui mcp
```

---

## 2. Key Principles Every LLM Must Obey

1. **Compound Component Syntax**: Always write `<Card.Heading>`, `<Modal.Title>`, `<Accordion.Item>`, `<Select.Item>`. Never import standalone child components (`import { CardHeading }` is forbidden).
2. **StyleX Engine Only**: Component overrides are passed strictly via `style?: stylex.StyleXStyles`. Native `className="..."` and `style={{ ... }}` are forbidden.
3. **Design Tokens Only**: All color, spacing, radius, and font values must reference `floogic-ui` tokens (`colors`, `spacing`, `shape`, `borders`).

---

## 3. Setting Up AI Rules in Your Project Manually

If you prefer installing rules manually instead of `npx floogic-ui init-ai`, copy the rules for your preferred tool:

### Cursor AI
Copy `.cursor/rules/floogic-ui.mdc` from `node_modules/floogic-ui/` to `.cursor/rules/floogic-ui.mdc`.

### Anthropic Claude Code
Copy `.ai/rules/CLAUDE.md` from `node_modules/floogic-ui/` to your root as `CLAUDE.md`.

### Google Gemini & Antigravity IDE/CLI
Copy `.ai/rules/GEMINI.md` to your root as `GEMINI.md`, OR register `.ai/skills/floogic-ui/SKILL.md`.

### GitHub Copilot
Copy `.github/copilot-instructions.md` into your `.github/` folder.

---

## 4. Connecting the Model Context Protocol (MCP) Server

Add the following to your MCP settings (`claude_desktop_config.json` or Cursor MCP settings):

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

### Available MCP Tools

- `search_components({ query: "modal dialog" })`: Searches components by use-case or keyword.
- `get_component_doc({ componentName: "Card" })`: Returns complete props signature and compound hierarchy.
- `get_recipe({ recipeName: "auth" })`: Returns pre-assembled, production-ready TSX code recipes.
- `validate_code({ code: "..." })`: Audits JSX code snippets against Floogic UI guidelines.
