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

const catalog = {
  name: 'floogic-ui',
  description: 'Token-driven React Design System built with StyleX and Radix UI Primitives',
  generatedAt: new Date().toISOString(),
  components: [],
  tokens: [
    'colors', 'spacing', 'shape', 'borders', 'fonts', 
    'fontSizes', 'fontWeights', 'lineHeights', 'elevation', 'durations', 'easings'
  ],
  rules: [
    'Use compound exports exclusively (e.g. Card.Content, Modal.Header)',
    'Use StyleX style prop exclusively (style?: stylex.StyleXStyles)',
    'Never use inline styles style={{ ... }} or native CSS className',
    'Import tokens from floogic-ui instead of hardcoding raw pixel or color values'
  ]
};

const dirs = fs.readdirSync(componentsDir, { withFileTypes: true });

for (const dir of dirs) {
  if (dir.isDirectory()) {
    const compName = dir.name;
    const tsxPath = path.join(componentsDir, compName, `${compName}.tsx`);
    
    let subcomponents = [];
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
    }

    catalog.components.push({
      name: compName,
      compoundExport: subcomponents.length > 0 ? `${compName}.${subcomponents.join(`, ${compName}.`)}` : compName,
      subcomponents: subcomponents,
      path: `src/components/${compName}`
    });
  }
}

const jsonContent = JSON.stringify(catalog, null, 2);
fs.writeFileSync(path.join(aiDir, 'ai-catalog.json'), jsonContent, 'utf-8');
fs.writeFileSync(path.join(distDir, 'ai-catalog.json'), jsonContent, 'utf-8');

console.log(`✅ AI Catalog successfully generated at: .ai/ai-catalog.json and dist/ai-catalog.json`);
