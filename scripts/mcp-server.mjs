#!/usr/bin/env node

/**
 * Floogic UI — Model Context Protocol (MCP) Server
 *
 * Implements the standard MCP Stdio transport protocol (JSON-RPC 2.0).
 * Exposes tools, resources, and prompts for component discovery, documentation lookup, and code validation.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load AI Catalog metadata
let catalog = null;
const catalogPath = path.join(rootDir, '.ai/ai-catalog.json');
if (fs.existsSync(catalogPath)) {
  try {
    catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
  } catch (e) {
    catalog = null;
  }
}

// Tool definitions
const TOOLS = [
  {
    name: 'search_components',
    description: 'Search Floogic UI components by keyword, intent, synonym (e.g. dialog, dropdown, input), or use case.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term e.g. "modal dialog", "form inputs", "tabs navigation", "dropdown picker"' },
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
        componentName: { type: 'string', description: 'Name of the component e.g. "Card", "Modal", "Select", "TextInput", "Button"' },
      },
      required: ['componentName'],
    },
  },
  {
    name: 'validate_code',
    description: 'Validate React code against Floogic UI compliance rules (Compound syntax, StyleX stylex prop, Design Tokens).',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'React JSX code string to validate' },
      },
      required: ['code'],
    },
  },
];

// MCP Resources
const RESOURCES = [
  {
    uri: 'floogic://guidelines',
    name: 'Floogic UI Architectural Guidelines',
    description: 'Core rules for using Floogic UI: Compound components, StyleX stylex prop, and Design Tokens',
    mimeType: 'text/markdown',
  },
  {
    uri: 'floogic://tokens',
    name: 'Floogic UI Design Tokens Reference',
    description: 'Available design tokens (colors, spacing, shape, borders, typography, elevation)',
    mimeType: 'application/json',
  },
];

// MCP Prompts
const PROMPTS = [
  {
    name: 'scaffold_screen',
    description: 'Generate a prompt for scaffolding a full screen using Floogic UI components and StyleX tokens',
    arguments: [
      { name: 'screenName', description: 'Name/purpose of the screen (e.g. User Profile, Dashboard Overview)', required: true },
    ],
  },
  {
    name: 'review_code',
    description: 'Audit a React code snippet against Floogic UI compound exports, StyleX prop, and Design Tokens',
    arguments: [
      { name: 'code', description: 'React code snippet to review', required: true },
    ],
  },
];

// Execute MCP Tool
function executeTool(name, args) {
  if (name === 'search_components') {
    const q = (args.query || '').toLowerCase().trim();
    if (!catalog) return { error: 'Catalog metadata not available.' };

    const matches = catalog.components.filter(c => {
      const matchName = c.name.toLowerCase().includes(q);
      const matchExport = c.compoundExport.toLowerCase().includes(q);
      const matchDesc = c.description && c.description.toLowerCase().includes(q);
      const matchKeywords = c.keywords && c.keywords.some(k => k.toLowerCase().includes(q));
      return matchName || matchExport || matchDesc || matchKeywords;
    });

    return {
      query: args.query,
      resultsCount: matches.length,
      components: matches.map(c => ({
        name: c.name,
        description: c.description,
        compoundExport: c.compoundExport,
        keywords: c.keywords,
      })),
    };
  }

  if (name === 'get_component_doc') {
    const target = (args.componentName || '').toLowerCase().trim();
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
      description: match.description,
      compoundExport: match.compoundExport,
      subcomponents: match.subcomponents,
      interfaces: match.interfaces,
      rules: [
        `Use compound exports: <${match.name}.${match.subcomponents[0] || 'Child'}>`,
        `Pass StyleX styles via 'stylex?: stylex.StyleXStyles' (e.g. <${match.name} stylex={styles.custom}>). Never pass StyleX objects to native 'style={...}'.`,
        `Import tokens from '@floogic/ui' (colors, spacing, shape, borders, typography, elevation)`,
        `Standard HTML attributes (className, style, aria-*, id) are forwarded via mergeStyles for native overrides.`
      ],
      exampleSnippet: `<${match.name} stylex={styles.root}>\n  ${match.subcomponents.length > 0 ? `<${match.name}.${match.subcomponents[0]}>...</${match.name}.${match.subcomponents[0]}>` : '...'}\n</${match.name}>`
    };
  }

  if (name === 'validate_code') {
    const code = args.code || '';
    const issues = [];

    // Check standalone exports
    const standaloneMatch = code.match(
      /\b(CardContent|CardHeading|CardDescription|CardMedia|CardFooter|ModalHeader|ModalTitle|ModalContent|ModalBody|ModalFooter|AlertHeading|AlertDescription|AlertIcon|AccordionItem|AccordionTrigger|AccordionContent|TabsList|TabsItem|TabsPanel|SelectItem|SelectTrigger|SelectContent)\b/g
    );
    if (standaloneMatch) {
      issues.push(`Forbidden standalone import/use of '${standaloneMatch.join(', ')}'. Use compound parent syntax like '<Card.Content>'.`);
    }

    // Check passing StyleX styles to native style prop instead of stylex
    if (/<[A-Z]\w+[^>]*\bstyle=\{styles\./.test(code)) {
      issues.push("Passing StyleX styles to native 'style={styles...}' detected. In Floogic UI, use 'stylex={styles...}' for StyleX styles.");
    }

    // Check hardcoded colors
    if (/#([0-9a-fA-F]{3}){1,2}\b/.test(code)) {
      issues.push("Hardcoded hex color found. Use 'colors.*' design tokens from '@floogic/ui'.");
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
        capabilities: { 
          tools: {},
          resources: {},
          prompts: {}
        },
        serverInfo: {
          name: 'floogic-ui-mcp',
          version: '0.1.1',
        },
      },
    });
    return;
  }

  if (method === 'notifications/initialized') {
    return;
  }

  // Tools
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

  // Resources
  if (method === 'resources/list') {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: { resources: RESOURCES },
    });
    return;
  }

  if (method === 'resources/read') {
    const uri = params?.uri;
    let contentText = '';

    if (uri === 'floogic://guidelines') {
      contentText = `# Floogic UI Guidelines\n1. Use compound syntax: <Card.Content>, <Modal.Title>, <Modal.CloseButton>.\n2. Pass StyleX styles via 'stylex={styles.custom}'. Never pass StyleX objects to native 'style={...}'.\n3. Use design tokens: import { colors, spacing, shape, borders, fonts } from '@floogic/ui'.`;
    } else if (uri === 'floogic://tokens') {
      contentText = JSON.stringify(catalog?.tokens || [], null, 2);
    } else {
      sendJsonRpc({
        jsonrpc: '2.0',
        id,
        error: { code: -32602, message: `Resource not found: ${uri}` },
      });
      return;
    }

    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: {
        contents: [
          {
            uri,
            mimeType: 'text/plain',
            text: contentText,
          },
        ],
      },
    });
    return;
  }

  // Prompts
  if (method === 'prompts/list') {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: { prompts: PROMPTS },
    });
    return;
  }

  if (method === 'prompts/get') {
    const promptName = params?.name;
    const promptArgs = params?.arguments || {};

    if (promptName === 'scaffold_screen') {
      const screen = promptArgs.screenName || 'New Screen';
      sendJsonRpc({
        jsonrpc: '2.0',
        id,
        result: {
          description: `Scaffold ${screen} with Floogic UI`,
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Please design and implement the screen "${screen}" using @floogic/ui. Follow these constraints strictly:\n1. Use Compound Component syntax exclusively (<Card.Content>, <Modal.Header>, etc.).\n2. Use StyleX for custom styling via 'stylex={styles.custom}'. Do not pass StyleX to native 'style={...}'.\n3. Import all tokens from '@floogic/ui' (colors, spacing, shape, borders, fonts).\n4. Ensure full accessibility.`
              }
            }
          ]
        }
      });
      return;
    }

    if (promptName === 'review_code') {
      const code = promptArgs.code || '';
      sendJsonRpc({
        jsonrpc: '2.0',
        id,
        result: {
          description: `Review code for Floogic UI compliance`,
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Please audit the following React code for compliance with @floogic/ui architectural guidelines:\n\n\`\`\`tsx\n${code}\n\`\`\`\n\nVerify:\n1. Are all Floogic UI components using compound syntax (e.g. <Card.Content> instead of standalone imports)?\n2. Are StyleX styles passed via the 'stylex' prop and not native 'style'?\n3. Are design tokens used instead of hardcoded hex colors or pixel values?`
              }
            }
          ]
        }
      });
      return;
    }

    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      error: { code: -32602, message: `Prompt not found: ${promptName}` },
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
