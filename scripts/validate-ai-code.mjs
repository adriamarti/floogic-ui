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
  collectFiles(path.join(rootDir, 'src/recipes'));
}

console.log(`🔍 Auditing ${filesToScan.length} file(s) for Floogic UI AI Compliance...\n`);

let totalErrors = 0;

for (const filePath of filesToScan) {
  const relPath = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check 1: Forbidden standalone exports (e.g. CardContent, ModalHeader, AlertHeading)
    const standaloneMatch = line.match(/import\s*\{[^}]*\b(CardContent|CardHeading|ModalHeader|ModalTitle|AlertHeading|AlertDescription)\b[^}]*\}\s*from\s*['"]floogic-ui['"]/);
    if (standaloneMatch) {
      console.error(`❌ [${relPath}:${lineNum}] Forbidden standalone import: '${standaloneMatch[1]}'. Use compound parent syntax like '<Card.${standaloneMatch[1].replace('Card', '')}>' instead.`);
      totalErrors++;
    }

    // Check 2: Forbidden native className usage
    if (line.includes('className=')) {
      console.warn(`⚠️ [${relPath}:${lineNum}] Native 'className' detected. Ensure you use 'style?: stylex.StyleXStyles' and StyleX for styling.`);
    }

    // Check 3: Forbidden inline style object style={{ ... }}
    if (/style\s*=\s*\{\{\s*[^}]+\}\}/.test(line) && !line.includes('//') && !line.includes('*')) {
      console.warn(`⚠️ [${relPath}:${lineNum}] Native inline style={{ ... }} detected. Floogic UI strictly enforces StyleX styles.`);
    }

    // Check 4: Hardcoded color hex strings
    if (/#([0-9a-fA-F]{3}){1,2}\b/.test(line)) {
      console.warn(`⚠️ [${relPath}:${lineNum}] Hardcoded hex color found. Use 'colors.*' design tokens from floogic-ui.`);
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
