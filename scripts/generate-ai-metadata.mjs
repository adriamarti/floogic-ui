import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const componentsDir = path.resolve(rootDir, 'src/components');
const distDir = path.resolve(rootDir, 'dist');
const aiDir = path.resolve(rootDir, '.ai');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
if (!fs.existsSync(aiDir)) {
  fs.mkdirSync(aiDir, { recursive: true });
}

const KEYWORDS = {
  Accordion: ['collapse', 'expansion', 'faq', 'disclosure', 'fold'],
  Alert: ['notification', 'banner', 'message', 'warning', 'error', 'callout', 'toast'],
  AlertGlobal: ['system notice', 'top banner', 'global alert', 'broadcast'],
  Avatar: ['profile photo', 'user picture', 'initials', 'avatar fallback'],
  Badge: ['tag', 'chip', 'pill', 'label', 'status indicator'],
  BadgeCount: ['counter', 'unread', 'notification count', 'number badge'],
  BadgeDot: ['online status', 'presence', 'indicator dot'],
  Breadcrumbs: ['navigation', 'path', 'trail', 'hierarchy'],
  Button: ['action', 'cta', 'click', 'submit'],
  ButtonGroup: ['segmented buttons', 'button cluster', 'toolbar'],
  Card: ['container', 'box', 'panel', 'tile', 'card surface'],
  CheckboxGroup: ['multiple choice', 'checkbox list', 'form options'],
  DatePicker: ['calendar', 'date selection', 'schedule'],
  Divider: ['separator', 'horizontal line', 'hr', 'vertical divider'],
  Drawer: ['sidebar', 'offcanvas', 'sliding panel', 'sheet', 'drawer overlay'],
  HoverCard: ['popover on hover', 'preview card', 'tooltip card'],
  IconButton: ['icon action', 'close button', 'glyph button'],
  IconContainer: ['icon wrapper', 'circular icon', 'shaped icon'],
  Modal: ['dialog', 'popup', 'alertdialog', 'lightbox', 'modal window'],
  Pagination: ['page navigation', 'pager', 'next previous'],
  Popover: ['flyout', 'floating card', 'dropdown anchor', 'popup menu'],
  Progress: ['progress bar', 'meter', 'loader', 'completion'],
  RadioGroup: ['single choice', 'radio buttons', 'form selection'],
  SegmentedControl: ['pill switcher', 'toggle group', 'segmented tabs'],
  Select: ['dropdown', 'combobox', 'picker', 'options menu'],
  Slider: ['range input', 'scrubber', 'numeric slider'],
  Steps: ['stepper', 'wizard', 'progress steps', 'multi-step form'],
  Switch: ['toggle', 'checkbox switch', 'boolean toggle'],
  Tabs: ['tab navigation', 'tabbed panel', 'segmented views'],
  TextArea: ['multiline input', 'text box', 'message input'],
  TextInput: ['input field', 'text field', 'form input', 'textbox'],
  Toast: ['snackbar', 'transient notification', 'toast message'],
  Tooltip: ['hint', 'hover tooltip', 'context title'],
  Typography: ['text', 'heading', 'paragraph', 'title', 'caption'],
};

function extractDescription(content, compName) {
  const jsdocRegex = new RegExp(`/\\*\\*\\s*\\n\\s*\\*\\s*${compName}\\s*\\n\\s*\\*?\\s*\\n?([^*]+)\\*/`, 'i');
  const match = content.match(jsdocRegex);
  if (match) {
    return match[1].split('\n').map(l => l.replace(/^\s*\*\s?/, '').trim()).filter(Boolean).join(' ');
  }
  return '';
}

function extractInterfaces(content) {
  const interfaces = [];
  const interfaceRegex = /export\s+interface\s+(\w+)\s+(?:extends\s+[^{]+)?\{([^}]+)\}/g;
  let match;
  while ((match = interfaceRegex.exec(content)) !== null) {
    const name = match[1];
    const props = match[2]
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('//') && !l.startsWith('/*') && !l.startsWith('*'))
      .map(l => l.replace(/;$/, ''));
    interfaces.push({ name, props });
  }
  return interfaces;
}

const catalog = {
  name: '@floogic/ui',
  description: 'Token-driven React Design System built with StyleX and Radix UI Primitives',
  generatedAt: new Date().toISOString(),
  components: [],
  tokens: [
    'colors', 'spacing', 'shape', 'borders', 'fonts', 
    'fontSizes', 'fontWeights', 'lineHeights', 'elevation', 'durations', 'easings'
  ],
  rules: [
    'Use compound exports exclusively (e.g. Card.Content, Modal.Header, Modal.CloseButton)',
    'Use StyleX overrides via stylex prop (stylex?: stylex.StyleXStyles). Never pass StyleX objects to native style={...}.',
    'Import tokens from @floogic/ui instead of hardcoding raw pixel or color values'
  ]
};

const dirs = fs.readdirSync(componentsDir, { withFileTypes: true });

for (const dir of dirs) {
  if (dir.isDirectory()) {
    const compName = dir.name;
    const tsxPath = path.join(componentsDir, compName, `${compName}.tsx`);
    
    let subcomponents = [];
    let description = '';
    let interfaces = [];

    if (fs.existsSync(tsxPath)) {
      const content = fs.readFileSync(tsxPath, 'utf-8');
      
      // Look for compound export pattern Object.assign(Root, { Sub1, Sub2 })
      const compoundMatch = content.match(/Object\.assign\(\s*\w+,\s*\{([^}]+)\}\s*\)/s);
      if (compoundMatch) {
        const inner = compoundMatch[1];
        subcomponents = inner
          .split(',')
          .map(line => line.trim().split(':')[0].trim())
          .filter(Boolean);
      }

      description = extractDescription(content, compName);
      interfaces = extractInterfaces(content);
    }

    catalog.components.push({
      name: compName,
      description: description || `${compName} component`,
      compoundExport: subcomponents.length > 0 ? `${compName}.${subcomponents.join(`, ${compName}.`)}` : compName,
      subcomponents: subcomponents,
      keywords: KEYWORDS[compName] || [],
      interfaces: interfaces,
      path: `src/components/${compName}`
    });
  }
}

const jsonContent = JSON.stringify(catalog, null, 2);
fs.writeFileSync(path.join(aiDir, 'ai-catalog.json'), jsonContent, 'utf-8');
fs.writeFileSync(path.join(distDir, 'ai-catalog.json'), jsonContent, 'utf-8');

console.log(`✅ AI Catalog successfully generated with ${catalog.components.length} components at: .ai/ai-catalog.json and dist/ai-catalog.json`);
