# Floogic UI AI Architecture & Integration Guide

> Complete reference on how to interact with and integrate **Floogic UI** using LLMs and AI coding assistants (Antigravity, Claude, Cursor, Copilot, ChatGPT).

---

## 1. Quick Start via CLI (`npx @floogic/ui`)

Any developer installing or downloading `@floogic/ui` via npm can execute the built-in CLI commands directly:

```bash
# 1. Initialize AI agent rules & skills safely (non-destructive) in your project
npx @floogic/ui init-ai

# 2. Audit your project's codebase against Floogic UI rules (StyleX, tokens, compound syntax)
npx @floogic/ui check-compliance

# 3. Launch the Floogic UI Model Context Protocol (MCP) server
npx @floogic/ui mcp
```

---

## 2. AI Context Manifests (`llms.txt` & `llms-full.txt`)

`floogic-ui` ships with standard machine-readable documentation manifests:

* **`llms.txt`**: Lightweight standard manifest providing a token-efficient summary of architectural rules, token tables, and component APIs. Perfect for fast context loading in prompts.
* **`llms-full.txt`**: Exhaustive technical reference containing full TypeScript interfaces, props contracts, and component specifications for all 34 components. Ideal for **Claude Projects**, **Custom GPTs**, and **RAG vector search** in IDEs.

---

## 3. Key Principles Every LLM Must Obey

1. **Compound Component Syntax**: Always write `<Card.Heading>`, `<Modal.Title>`, `<Modal.CloseButton>`, `<Accordion.Item>`, `<Select.Item>`. Never import standalone child components (`import { CardHeading }` is forbidden).
2. **StyleX Engine (`stylex` prop)**: Component overrides are passed strictly via `stylex?: stylex.StyleXStyles` (e.g. `<Card stylex={styles.custom}>`). Never pass StyleX objects to native `style={...}`. Standard HTML `className` and `style` are cleanly forwarded via `mergeStyles` for external overrides.
3. **Design Tokens Only**: All color, spacing, radius, and font values must reference `@floogic/ui` tokens (`colors`, `spacing`, `shape`, `borders`, `fonts`, `elevation`).

---

## 4. Setting Up AI Rules in Your Project Manually

If you prefer installing rules manually instead of `npx @floogic/ui init-ai`, copy the rules for your preferred tool:

### Cursor AI
Copy `.cursor/rules/floogic-ui.mdc` from `node_modules/@floogic/ui/.cursor/rules/` (or `.ai/rules/cursor/`) to `.cursor/rules/floogic-ui.mdc`.

### Windsurf (Cascade)
Copy `.ai/rules/windsurf/.windsurfrules` from `node_modules/@floogic/ui/` to your project root as `.windsurfrules`.

### Anthropic Claude Code
Copy `.ai/rules/CLAUDE.md` from `node_modules/@floogic/ui/` to your root as `CLAUDE.md`.

### Google Gemini & Antigravity IDE/CLI
Copy `.ai/rules/GEMINI.md` to your root as `GEMINI.md`, AND/OR copy `.ai/skills/floogic-ui/` to `.gemini/skills/floogic-ui/`.

### Cline / Roo Code
Copy `.ai/rules/cline/.clinerules` from `node_modules/@floogic/ui/` to your root as `.clinerules`.

### Universal Agent Instruction (`AGENTS.md`)
Copy `.ai/rules/GEMINI.md` to your root as `AGENTS.md` for universal autonomous AI agent instructions.

### GitHub Copilot
Copy `.github/copilot-instructions.md` into your `.github/` folder.

> 💡 **Why are rule files (`CLAUDE.md`, `GEMINI.md`, `CODEX.md`, `floogic-ui.mdc`, `.windsurfrules`) formatted differently?**
> While all rule files enforce the exact same core architectural principles (StyleX, Compound Components, Tokens), each file is tailored specifically for its target AI tool:
> - **Tool Discovery**: Different IDEs and CLI tools scan for specific filenames in project root (`CLAUDE.md` for Claude Code, `GEMINI.md` for Gemini/Antigravity, `.cursor/rules/*.mdc` for Cursor, `.windsurfrules` for Windsurf, `.clinerules` for Cline).
> - **Model Prompt Optimization**: Each LLM architecture responds best to specific prompt structures — Claude prefers concise token-efficient lists, Gemini excels with explicit code snippets, and OpenAI/Codex requires strict imperative negative constraints to prevent hallucinations.

---

## 5. Connecting the Model Context Protocol (MCP) Server

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
- `validate_code({ code: "..." })`: Audits JSX code snippets against Floogic UI guidelines.
