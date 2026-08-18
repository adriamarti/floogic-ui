import * as stylex from '@stylexjs/stylex';

const DARK = '@media (prefers-color-scheme: dark)';

export const elevation = stylex.defineVars({
  elev1: {
    default: '0 1px 2px rgba(16,18,20,.06), 0 1px 1px rgba(16,18,20,.05)',
    [DARK]: '0 1px 2px rgba(0,0,0,.45)',
  },
  elev2: {
    default: '0 2px 6px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.02)',
    [DARK]: '0 4px 10px rgba(0,0,0,0.15)',
  },
  elev3: {
    default: '0 4px 12px rgba(0,0,0,0.03), 0 8px 16px rgba(0,0,0,0.03)',
    [DARK]: '0 6px 16px rgba(0,0,0,0.25)',
  },
  elev4: {
    default: '0 6px 16px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.04)',
    [DARK]: '0 8px 24px rgba(0,0,0,0.35)',
  },
});
