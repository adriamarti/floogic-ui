import fs from 'fs';
import { blue, blueDark, slate, slateDark, red, redDark, green, greenDark, amber, amberDark } from '@radix-ui/colors';

const content = `import * as stylex from '@stylexjs/stylex';

// Mapeo semántico generado automáticamente (Light y Dark Mode)
export const colors = stylex.defineVars({
  // --- BACKGROUNDS ---
  backgroundNeutral: {
    default: '${slate.slate1}',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate1}',
  },
  backgroundNeutralHover: {
    default: '${slate.slate2}',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate2}',
  },

  // --- FILLS (Botones, Cajas de color sólido) ---
  fillBrandStrong: {
    default: '${blue.blue9}',
    '@media (prefers-color-scheme: dark)': '${blueDark.blue9}',
  },
  fillBrandStrongHover: {
    default: '${blue.blue10}',
    '@media (prefers-color-scheme: dark)': '${blueDark.blue10}',
  },
  fillNeutralWeak: {
    default: '${slate.slate3}',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate3}',
  },
  fillNeutralWeakHover: {
    default: '${slate.slate4}',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate4}',
  },
  fillErrorStrong: {
    default: '${red.red9}',
    '@media (prefers-color-scheme: dark)': '${redDark.red9}',
  },
  fillSuccessStrong: {
    default: '${green.green9}',
    '@media (prefers-color-scheme: dark)': '${greenDark.green9}',
  },
  fillWarningStrong: {
    default: '${amber.amber9}',
    '@media (prefers-color-scheme: dark)': '${amberDark.amber9}',
  },

  // --- TEXT ---
  textStrong: {
    default: '${slate.slate12}',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate12}',
  },
  textWeak: {
    default: '${slate.slate11}',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate11}',
  },
  textBrand: {
    default: '${blue.blue11}',
    '@media (prefers-color-scheme: dark)': '${blueDark.blue11}',
  },
  textInverse: {
    default: '#ffffff',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate12}',
  },

  // --- STROKE / BORDERS ---
  strokeStrong: {
    default: '${slate.slate8}',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate8}',
  },
  strokeWeak: {
    default: '${slate.slate6}',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate6}',
  },

  // --- ICONS ---
  iconNeutral: {
    default: '${slate.slate11}',
    '@media (prefers-color-scheme: dark)': '${slateDark.slate11}',
  },
  iconBrand: {
    default: '${blue.blue11}',
    '@media (prefers-color-scheme: dark)': '${blueDark.blue11}',
  },
});
`;

fs.writeFileSync('src/tokens/colors.stylex.ts', content);
console.log('Colors generated successfully.');
