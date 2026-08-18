# GitHub Copilot Custom Instructions for Floogic UI

When suggesting code or generating components for this workspace:

1. Always use **Compound Component** exports (e.g. `<Card.Content>`, `<Modal.Header>`, `<Accordion.Item>`). Never suggest standalone imports like `CardContent`.
2. Always use **StyleX** styling with `style?: stylex.StyleXStyles`. Never suggest native inline `style={{ ... }}` or CSS `className="..."` on Floogic UI components.
3. Always reference **Design Tokens** (`colors`, `spacing`, `shape`, `borders`, `fonts`) instead of hardcoding raw pixel values or hex color strings.
4. Consult `llms.txt` and `llms-full.txt` for exact component props and code recipes.
