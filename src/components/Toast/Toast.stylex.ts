import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { shape } from '../../tokens/shape.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

const VIEWPORT_OFFSET = spacing.space6;

const slideIn = stylex.keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_OFFSET}))` },
  to: { transform: 'translateX(0)' },
});

const hide = stylex.keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const swipeOut = stylex.keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_OFFSET}))` },
});

export const styles = stylex.create({
  viewport: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    gap: spacing.space3,
    width: '24.375rem',
    maxWidth: 'calc(100vw - 48px)',
    margin: 0,
    listStyle: 'none',
    zIndex: 2147483647,
    outline: 'none',
    pointerEvents: 'none',
  },
  positionTopLeft: {
    top: VIEWPORT_OFFSET,
    left: VIEWPORT_OFFSET,
    bottom: 'auto',
    right: 'auto',
  },
  positionTopCenter: {
    top: VIEWPORT_OFFSET,
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 'auto',
    right: 'auto',
  },
  positionTopRight: {
    top: VIEWPORT_OFFSET,
    right: VIEWPORT_OFFSET,
    bottom: 'auto',
    left: 'auto',
  },
  positionBottomLeft: {
    bottom: VIEWPORT_OFFSET,
    left: VIEWPORT_OFFSET,
    top: 'auto',
    right: 'auto',
  },
  positionBottomCenter: {
    bottom: VIEWPORT_OFFSET,
    left: '50%',
    transform: 'translateX(-50%)',
    top: 'auto',
    right: 'auto',
  },
  positionBottomRight: {
    bottom: VIEWPORT_OFFSET,
    right: VIEWPORT_OFFSET,
    top: 'auto',
    left: 'auto',
  },
  listItem: {
    width: '100%',
  },
  root: {
    all: 'unset',
    pointerEvents: 'auto',
    width: '100%',
    backgroundColor: colors.backgroundRaised,
    borderRadius: shape.radiusMd,
    boxShadow: elevation.elev3,
    
    '@media (prefers-reduced-motion: no-preference)': {
      ':not([data-state="closed"])': {
        animationName: slideIn,
        animationDuration: durations.fast,
        animationTimingFunction: easings.decelerate,
      },
      '[data-state="closed"]': {
        animationName: hide,
        animationDuration: durations.fast,
        animationTimingFunction: easings.standard,
      },
      '[data-swipe="move"]': {
        transform: 'translateX(var(--radix-toast-swipe-move-x))',
      },
      '[data-swipe="cancel"]': {
        transform: 'translateX(0)',
        transitionProperty: 'transform',
        transitionDuration: durations.fast,
        transitionTimingFunction: easings.standard,
      },
      '[data-swipe="end"]': {
        animationName: swipeOut,
        animationDuration: durations.fast,
        animationTimingFunction: easings.standard,
      },
    }
  }
});
