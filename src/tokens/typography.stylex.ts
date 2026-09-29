import * as stylex from '@stylexjs/stylex';

export const fonts = stylex.defineVars({
  serif: "'Source Serif 4', Georgia, 'Times New Roman', serif",
  sans: "'Source Sans 3', system-ui, -apple-system, sans-serif",
  mono: "'Source Code Pro', ui-monospace, 'SF Mono', monospace",
});

export const fontSizes = stylex.defineVars({
  displayLg: '72px',
  displayMd: '56px',
  displaySm: '40px',
  h1: '40px',
  h2: '28px',
  h3: '20px',
  h4: '18px',
  h5: '16px',
  h6: '14px',
  bodyLg: '18px',
  bodyMd: '16px',
  bodySm: '14px',
  captionLg: '18px',
  captionMd: '16px',
  captionSm: '14px',
});

export const lineHeights = stylex.defineVars({
  displayLg: '1.05',
  displayMd: '1.1',
  displaySm: '1.15',
  h1: '1.05',
  h2: '1.15',
  h3: '1.3',
  h4: '1.4',
  h5: '1.4',
  h6: '1.4',
  bodyLg: '1.6',
  bodyMd: '1.6',
  bodySm: '1.5',
  captionLg: '1.6',
  captionMd: '1.6',
  captionSm: '1.5',
});

export const fontWeights = stylex.defineVars({
  extraLight: '200',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  black: '900',
});

export const letterSpacings = stylex.defineVars({
  displayLg: '-0.02em',
  displayMd: '-0.02em',
  displaySm: '-0.01em',
  h1: '-0.01em',
  h2: '-0.01em',
  caption: '0.02em',
});
