import * as stylex from '@stylexjs/stylex';
import { spacing } from '../../tokens/spacing.stylex';

const VIEWPORT_PADDING = spacing.space4;

const slideIn = stylex.keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}))` },
  to: { transform: 'translateX(0)' },
});

const hide = stylex.keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const swipeOut = stylex.keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}))` },
});

export const styles = stylex.create({
  viewport: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: VIEWPORT_PADDING,
    gap: spacing.space3,
    width: '390px',
    maxWidth: '100vw',
    margin: 0,
    listStyle: 'none',
    zIndex: 2147483647,
    outline: 'none',
    pointerEvents: 'none', // Allow clicking through the empty space of the viewport
  },
  listItem: {
    width: '100%',
  },
  root: {
    all: 'unset',
    pointerEvents: 'auto',
    width: '100%',
    
    // Animations
    '@media (prefers-reduced-motion: no-preference)': {
      ':not([data-state="closed"])': {
        animationName: slideIn,
        animationDuration: '150ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      '[data-state="closed"]': {
        animationName: hide,
        animationDuration: '100ms',
        animationTimingFunction: 'ease-in',
      },
      '[data-swipe="move"]': {
        transform: 'translateX(var(--radix-toast-swipe-move-x))',
      },
      '[data-swipe="cancel"]': {
        transform: 'translateX(0)',
        transition: 'transform 200ms ease-out',
      },
      '[data-swipe="end"]': {
        animationName: swipeOut,
        animationDuration: '100ms',
        animationTimingFunction: 'ease-out',
      },
    }
  }
});
