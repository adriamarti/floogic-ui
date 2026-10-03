import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const targetPaths = process.argv.slice(2);
const filesToScan = [];

function collectFiles(dirOrFile) {
  const stat = fs.statSync(dirOrFile);
  if (stat.isDirectory()) {
    const entries = fs.readdirSync(dirOrFile);
    for (const entry of entries) {
      if (entry !== 'node_modules' && entry !== 'dist' && entry !== '.git') {
        collectFiles(path.join(dirOrFile, entry));
      }
    }
  } else if (stat.isFile() && (dirOrFile.endsWith('.tsx') || dirOrFile.endsWith('.jsx'))) {
    filesToScan.push(dirOrFile);
  }
}

if (targetPaths.length > 0) {
  for (const p of targetPaths) {
    if (fs.existsSync(p)) collectFiles(path.resolve(p));
  }
} else {
  collectFiles(path.join(rootDir, 'src/components'));
}

console.log(`🔍 Auditing ${filesToScan.length} file(s) for Floogic UI AI Compliance...\n`);

let totalErrors = 0;

for (const filePath of filesToScan) {
  const relPath = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const isTestFile = filePath.endsWith('.test.tsx') || filePath.endsWith('.test.ts') || filePath.endsWith('.spec.tsx');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check 1: Forbidden standalone exports
    const standaloneMatch = line.match(
      /import\s*\{[^}]*\b(CardContent|CardHeading|CardDescription|CardMedia|CardFooter|ModalHeader|ModalTitle|ModalContent|ModalBody|ModalFooter|AlertHeading|AlertDescription|AlertIcon|AccordionItem|AccordionTrigger|AccordionContent|TabsList|TabsItem|TabsPanel|SelectItem|SelectTrigger|SelectContent)\b[^}]*\}\s*from\s*['"](@floogic\/ui|floogic-ui)['"]/
    );
    if (standaloneMatch) {
      console.error(`❌ [${relPath}:${lineNum}] Forbidden standalone import: '${standaloneMatch[1]}'. Use compound parent syntax (e.g. '<Card.Content>') from '@floogic/ui'.`);
      totalErrors++;
    }

    // Only warn on consumer code, skip test files
    if (!isTestFile) {
      // Check 2: Native className usage warning
      if (line.includes('className=') && !line.includes('//') && !line.includes('mergeStyles')) {
        console.warn(`⚠️ [${relPath}:${lineNum}] Native 'className' detected. Consider using 'stylex={styles.custom}' with StyleX for design system consistency.`);
      }

      // Check 3: Forbidden inline style object style={{ ... }}
      if (/style\s*=\s*\{\{\s*[^}]+\}\}/.test(line) && !line.includes('//') && !line.includes('*')) {
        console.warn(`⚠️ [${relPath}:${lineNum}] Native inline style={{ ... }} detected. Prefer 'stylex={styles.custom}' with Floogic UI design tokens.`);
      }

      // Check 4: Hardcoded color hex strings
      if (/#([0-9a-fA-F]{3}){1,2}\b/.test(line)) {
        console.warn(`⚠️ [${relPath}:${lineNum}] Hardcoded hex color found. Use 'colors.*' design tokens from '@floogic/ui'.`);
      }
    }
  });
}

if (totalErrors === 0) {
  console.log('✅ Floogic UI AI Compliance Audit Passed with 0 errors!\n');
  process.exit(0);
} else {
  console.error(`❌ Audit failed with ${totalErrors} error(s).\n`);
  process.exit(1);
}
