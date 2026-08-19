#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRootDir = path.resolve(__dirname, '..');
const userCwd = process.cwd();

const command = process.argv[2];
const arg = process.argv[3];

function printHelp() {
  console.log(`
🚀 Floogic UI CLI

Usage:
  npx floogic-ui <command> [options]

Commands:
  init-ai             Safely initialize AI rules & skills in your project (non-destructive)
  check-compliance    Audit your project codebase against Floogic UI compliance rules
  mcp                 Launch the Floogic UI Model Context Protocol (MCP) server
  create-component    Scaffold a new component following COMPONENT_GUIDELINES.md
  help                Show this help message
`);
}

function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function safeAppend(filePath, appendText, marker = 'Floogic UI') {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `# Project Guidelines\n\n${appendText.trim()}\n`, 'utf-8');
    console.log(`  ✅ Created ${path.relative(userCwd, filePath)}`);
    return;
  }

  const existingContent = fs.readFileSync(filePath, 'utf-8');
  if (!existingContent.includes(marker)) {
    fs.writeFileSync(filePath, `${existingContent.trim()}\n\n${appendText.trim()}\n`, 'utf-8');
    console.log(`  ✅ Appended Floogic UI reference to existing ${path.relative(userCwd, filePath)} (No overwrite)`);
  } else {
    console.log(`  ℹ️  ${path.relative(userCwd, filePath)} already contains Floogic UI references.`);
  }
}

function initAi() {
  console.log('🤖 Setting up Floogic UI AI rules & skills in your project (Non-destructive)...\n');

  // 1. Copy full .ai bundle (manifests, rules, and skills) into .ai/floogic-ui/
  const packageAiDir = path.join(packageRootDir, '.ai');
  const targetAiDir = path.join(userCwd, '.ai/floogic-ui');
  copyDirRecursive(packageAiDir, targetAiDir);
  console.log('  ✅ Installed AI manifests, rules & skills package into .ai/floogic-ui/');

  // 2. Add Cursor MDC rule (scoped file name, avoids overwriting other rules)
  const cursorSrc = path.join(packageRootDir, '.cursor/rules/floogic-ui.mdc');
  const cursorDest = path.join(userCwd, '.cursor/rules/floogic-ui.mdc');
  if (fs.existsSync(cursorSrc)) {
    const cursorDir = path.dirname(cursorDest);
    if (!fs.existsSync(cursorDir)) fs.mkdirSync(cursorDir, { recursive: true });
    fs.copyFileSync(cursorSrc, cursorDest);
    console.log('  ✅ Installed Cursor rule: .cursor/rules/floogic-ui.mdc');
  }

  // 3. Safe append to existing CLAUDE.md, GEMINI.md, CODEX.md, copilot-instructions.md
  safeAppend(
    path.join(userCwd, 'CLAUDE.md'),
    '## Floogic UI Design System\nRefer to `.ai/floogic-ui/rules/CLAUDE.md`, `.ai/floogic-ui/llms.txt`, and `.ai/floogic-ui/skills/floogic-ui/component-usage/SKILL.md` for components and StyleX guidelines.'
  );

  safeAppend(
    path.join(userCwd, 'GEMINI.md'),
    '## Floogic UI Design System\nRefer to `.ai/floogic-ui/rules/GEMINI.md`, `.ai/floogic-ui/llms.txt`, and `.ai/floogic-ui/skills/floogic-ui/component-usage/SKILL.md` for components and StyleX guidelines.'
  );

  safeAppend(
    path.join(userCwd, 'CODEX.md'),
    '## Floogic UI Design System\nRefer to `.ai/floogic-ui/rules/CODEX.md`, `.ai/floogic-ui/llms.txt`, and `.ai/floogic-ui/skills/floogic-ui/component-usage/SKILL.md` for components and StyleX guidelines.'
  );

  safeAppend(
    path.join(userCwd, '.github/copilot-instructions.md'),
    '## Floogic UI Design System\nRefer to `.ai/floogic-ui/rules/GEMINI.md`, `.ai/floogic-ui/llms.txt`, and `.ai/floogic-ui/skills/floogic-ui/component-usage/SKILL.md` for components and StyleX guidelines.'
  );


  console.log('\n🎉 Floogic UI AI setup complete! Zero existing files were overwritten.');
}

function checkCompliance(targetDirArg) {
  const targetDir = targetDirArg ? path.resolve(userCwd, targetDirArg) : path.join(userCwd, 'src');
  const validatorScript = path.join(packageRootDir, 'scripts/validate-ai-code.mjs');

  const proc = spawn('node', [validatorScript, targetDir], { stdio: 'inherit' });
  proc.on('exit', (code) => {
    process.exit(code || 0);
  });
}

function createComponent(name) {
  if (!name) {
    console.error('❌ Please specify a component name e.g. yarn floogic-ui create-component MyComponent');
    process.exit(1);
  }

  const compName = name.charAt(0).toUpperCase() + name.slice(1);
  const targetDir = path.join(userCwd, 'src/components', compName);

  if (fs.existsSync(targetDir)) {
    console.error(`❌ Component directory already exists: ${targetDir}`);
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });

  // 1. StyleX definitions
  const stylexContent = `import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { borders } from '../../tokens/borders.stylex';

export const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.space2,
    backgroundColor: colors.backgroundBase,
    borderRadius: shape.radiusMd,
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    borderColor: colors.strokeWeak,
    padding: spacing.space4,
  },
});
`;
  fs.writeFileSync(path.join(targetDir, `${compName}.stylex.ts`), stylexContent, 'utf-8');

  // 2. Component JSX
  const tsxContent = `import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './${compName}.stylex';

export interface ${compName}Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const ${compName}Root = forwardRef<HTMLDivElement, ${compName}Props>(
  ({ style, children, ...props }, ref) => {
    const resolved = stylex.props(styles.root, style);
    return (
      <div ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </div>
    );
  }
);
${compName}Root.displayName = '${compName}';

export const ${compName} = Object.assign(${compName}Root, {});
`;
  fs.writeFileSync(path.join(targetDir, `${compName}.tsx`), tsxContent, 'utf-8');

  // 3. Component index.ts
  const indexContent = `export { ${compName} } from './${compName}';
export type { ${compName}Props } from './${compName}';
`;
  fs.writeFileSync(path.join(targetDir, 'index.ts'), indexContent, 'utf-8');

  // 4. Update root src/index.ts
  const rootIndex = path.join(userCwd, 'src/index.ts');
  if (fs.existsSync(rootIndex)) {
    const rootIndexContent = fs.readFileSync(rootIndex, 'utf-8');
    const exportLine = `export * from './components/${compName}';`;
    if (!rootIndexContent.includes(exportLine)) {
      fs.writeFileSync(rootIndex, `${exportLine}\n${rootIndexContent}`, 'utf-8');
    }
  }

  console.log(`\n🎉 Successfully created component '${compName}' at src/components/${compName}/ in full compliance with COMPONENT_GUIDELINES.md!`);
}

function runMcp() {
  const mcpScript = path.join(packageRootDir, 'scripts/mcp-server.mjs');
  const proc = spawn('node', [mcpScript], { stdio: 'inherit' });
  proc.on('exit', (code) => {
    process.exit(code || 0);
  });
}

switch (command) {
  case 'init-ai':
    initAi();
    break;
  case 'check-compliance':
  case 'check':
    checkCompliance(arg);
    break;
  case 'create-component':
  case 'create':
    createComponent(arg);
    break;
  case 'mcp':
    runMcp();
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    printHelp();
    break;
}
