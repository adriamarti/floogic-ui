#!/usr/bin/env node

/**
 * Floogic UI — Model Context Protocol (MCP) Server
 *
 * Implements the standard MCP Stdio transport protocol (JSON-RPC 2.0).
 * Exposes tools for component discovery, documentation lookup, recipe fetching, and code validation.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readline } from 'node:readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load AI Catalog metadata
let catalog = null;
const catalogPath = path.join(rootDir, '.ai/ai-catalog.json');
if (fs.existsSync(catalogPath)) {
  catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
}

// Helper: Read recipes
function getRecipeCode(recipeName) {
  const nameMap = {
    auth: 'AuthRecipe.tsx',
    settings: 'SettingsRecipe.tsx',
    'data-table': 'DataTableRecipe.tsx',
    datatable: 'DataTableRecipe.tsx',
    'modal-workflow': 'ModalWorkflowRecipe.tsx',
    modal: 'ModalWorkflowRecipe.tsx',
  };

  const fileName = nameMap[recipeName.toLowerCase()] || `${recipeName}.tsx`;
  const filePath = path.join(rootDir, 'src/recipes', fileName);

  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return null;
}

// Tool definitions
const TOOLS = [
  {
    name: 'search_components',
    description: 'Search Floogic UI components by keyword, intent, or usage description.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term e.g. "modal dialog", "form inputs", "tabs navigation"' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_component_doc',
    description: 'Get full technical specification, props, subcomponents, and usage rules for a component.',
    inputSchema: {
      type: 'object',
      properties: {
        componentName: { type: 'string', description: 'Name of the component e.g. "Card", "Modal", "Select", "TextInput"' },
      },
      required: ['componentName'],
    },
  },
  {
    name: 'get_recipe',
    description: 'Get production-ready pre-assembled UI recipe code (auth, settings, data-table, modal-workflow).',
    inputSchema: {
      type: 'object',
      properties: {
        recipeName: { type: 'string', description: 'Recipe key: "auth", "settings", "data-table", "modal-workflow"' },
      },
      required: ['recipeName'],
    },
  },
  {
    name: 'validate_code',
    description: 'Validate React code against Floogic UI compliance rules (Compound syntax, StyleX, Design Tokens).',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'React JSX code string to validate' },
      },
      required: ['code'],
    },
  },
];

// Execute MCP Tool
function executeTool(name, args) {
  if (name === 'search_components') {
    const q = (args.query || '').toLowerCase();
    if (!catalog) return { error: 'Catalog metadata not available.' };

    const matches = catalog.components.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.compoundExport.toLowerCase().includes(q)
    );

    return {
      query: args.query,
      resultsCount: matches.length,
      components: matches,
    };
  }

  if (name === 'get_component_doc') {
    const target = (args.componentName || '').toLowerCase();
    if (!catalog) return { error: 'Catalog metadata not available.' };

    const match = catalog.components.find(c => c.name.toLowerCase() === target);
    if (!match) {
      return { 
        error: `Component '${args.componentName}' not found.`,
        availableComponents: catalog.components.map(c => c.name)
      };
    }

    return {
      component: match.name,
      compoundExport: match.compoundExport,
      subcomponents: match.subcomponents,
      rules: [
        `Use compound exports: <${match.name}.${match.subcomponents[0] || 'Child'}>`,
        'Use style?: stylex.StyleXStyles for custom styles',
        'Import tokens from floogic-ui/tokens/*.stylex'
      ]
    };
  }

  if (name === 'get_recipe') {
    const code = getRecipeCode(args.recipeName);
    if (!code) {
      return { 
        error: `Recipe '${args.recipeName}' not found.`,
        availableRecipes: ['auth', 'settings', 'data-table', 'modal-workflow']
      };
    }

    return {
      recipe: args.recipeName,
      code: code
    };
  }

  if (name === 'validate_code') {
    const code = args.code || '';
    const issues = [];

    // Check standalone exports
    const standaloneMatch = code.match(/\b(CardContent|CardHeading|ModalHeader|ModalTitle|AlertHeading)\b/g);
    if (standaloneMatch) {
      issues.push(`Forbidden standalone import/use of '${standaloneMatch.join(', ')}'. Use compound parent syntax like '<Card.Heading>'.`);
    }

    // Check className
    if (code.includes('className=')) {
      issues.push("Native 'className' detected. Use 'style?: stylex.StyleXStyles' and StyleX for styling.");
    }

    // Check inline style
    if (/style\s*=\s*\{\{\s*[^}]+\}\}/.test(code)) {
      issues.push("Native inline style={{ ... }} detected. Floogic UI strictly enforces StyleX styles.");
    }

    // Check hardcoded colors
    if (/#([0-9a-fA-F]{3}){1,2}\b/.test(code)) {
      issues.push("Hardcoded hex color found. Use 'colors.*' design tokens.");
    }

    return {
      valid: issues.length === 0,
      issuesCount: issues.length,
      issues: issues
    };
  }

  return { error: `Unknown tool: ${name}` };
}

// Process JSON-RPC messages from stdin
let buffer = '';

process.stdin.on('data', (chunk) => {
  buffer += chunk.toString('utf-8');
  const lines = buffer.split('\n');
  buffer = lines.pop();

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const msg = JSON.parse(line.trim());
      handleJsonRpcMessage(msg);
    } catch (err) {
      // Ignore invalid JSON chunks
    }
  }
});

function sendJsonRpc(response) {
  process.stdout.write(JSON.stringify(response) + '\n');
}

function handleJsonRpcMessage(msg) {
  if (!msg.jsonrpc && !msg.id && !msg.method) return;

  const { id, method, params } = msg;

  if (method === 'initialize') {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: {
          name: 'floogic-ui-mcp',
          version: '0.1.0',
        },
      },
    });
    return;
  }

  if (method === 'notifications/initialized') {
    return;
  }

  if (method === 'tools/list') {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: { tools: TOOLS },
    });
    return;
  }

  if (method === 'tools/call') {
    const { name, arguments: toolArgs } = params || {};
    const toolResult = executeTool(name, toolArgs || {});

    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: {
        content: [
          {
            type: 'text',
            text: JSON.stringify(toolResult, null, 2),
          },
        ],
      },
    });
    return;
  }

  if (id) {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    });
  }
}
