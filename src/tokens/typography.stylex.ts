import * as stylex from '@stylexjs/stylex';

export const fonts = stylex.defineVars({
  serif: "'Source Serif 4', Georgia, 'Times New Roman', serif",
  sans: "'IBM Plex Sans', system-ui, -apple-system, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', monospace",
});

export const fontSizes = stylex.defineVars({
  display: '64px',
  h1: '40px',
  h2: '28px',
  h3: '20px',
  h4: '18px',
  h5: '16px',
  h6: '14px',
  bodyLg: '18px',
  body: '16px',
  caption: '12px',
});

export const lineHeights = stylex.defineVars({
  display: '1',
  h1: '1.05',
  h2: '1.15',
  h3: '1.3',
  h4: '1.4',
  h5: '1.4',
  h6: '1.4',
  body: '1.6', // applies to both body and bodyLg
});

export const fontWeights = stylex.defineVars({
  regular: '400',
  medium: '500',
  semiBold: '600',
});

export const letterSpacings = stylex.defineVars({
  display: '-0.02em',
  h1: '-0.01em',
  caption: '0.06em',
});
