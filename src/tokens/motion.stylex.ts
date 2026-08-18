import * as stylex from '@stylexjs/stylex';

export const durations = stylex.defineVars({
  instant: '0ms',
  fast: '120ms',
  base: '200ms',
  slow: '320ms',
  slower: '480ms',
});

export const easings = stylex.defineVars({
  standard: 'cubic-bezier(.2,0,0,1)',
  decelerate: 'cubic-bezier(0,0,0,1)',
  accelerate: 'cubic-bezier(.4,0,1,1)',
});
