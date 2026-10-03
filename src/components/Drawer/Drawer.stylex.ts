import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { durations, easings } from '../../tokens/motion.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { fonts, fontSizes, lineHeights } from '../../tokens/typography.stylex';

const overlayShow = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideInRight = stylex.keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});
const slideInLeft = stylex.keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' },
});
const slideInTop = stylex.keyframes({
  from: { transform: 'translateY(-100%)' },
  to: { transform: 'translateY(0)' },
});
const slideInBottom = stylex.keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});

export const styles = stylex.create({
  overlay: {
    backgroundColor: colors.fillOverlay,
    backdropFilter: 'blur(4px)',
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    animationName: overlayShow,
    animationDuration: durations.base,
    animationTimingFunction: easings.standard,
  },
  content: {
    backgroundColor: colors.backgroundOverlay,
    position: 'fixed',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: elevation.elev3,
  },
  
  // Position Variants
  positionRight: {
    top: 0,
    right: 0,
    bottom: 0,
    borderLeftStyle: 'solid',
    borderLeftWidth: borders.hairline,
    borderLeftColor: colors.strokeWeak,
    animationName: slideInRight,
    animationDuration: durations.base,
    animationTimingFunction: easings.decelerate,
  },
  positionLeft: {
    top: 0,
    left: 0,
    bottom: 0,
    borderRightStyle: 'solid',
    borderRightWidth: borders.hairline,
    borderRightColor: colors.strokeWeak,
    animationName: slideInLeft,
    animationDuration: durations.base,
    animationTimingFunction: easings.decelerate,
  },
  positionTop: {
    top: 0,
    left: 0,
    right: 0,
    borderBottomStyle: 'solid',
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.strokeWeak,
    animationName: slideInTop,
    animationDuration: durations.base,
    animationTimingFunction: easings.decelerate,
  },
  positionBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    borderTopStyle: 'solid',
    borderTopWidth: borders.hairline,
    borderTopColor: colors.strokeWeak,
    animationName: slideInBottom,
    animationDuration: durations.base,
    animationTimingFunction: easings.decelerate,
  },

  // Size Variants (applied based on position)
  sizeSmallHorizontal: {
    width: '20rem',
    maxWidth: '100vw',
  },
  sizeMediumHorizontal: {
    width: '25rem',
    maxWidth: '100vw',
  },
  sizeLargeHorizontal: {
    width: '30rem',
    maxWidth: '100vw',
  },
  sizeSmallVertical: {
    height: 'auto',
    maxHeight: '80vh',
  },
  sizeMediumVertical: {
    height: 'auto',
    maxHeight: '80vh',
  },
  sizeLargeVertical: {
    height: 'auto',
    maxHeight: '80vh',
  },

  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: spacing.space4,
    paddingBottom: spacing.space4,
    paddingLeft: spacing.space5,
    paddingRight: spacing.space5,
    borderBottomStyle: 'solid',
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.strokeWeak,
    flexShrink: 0,
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: spacing.space5,
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyMd,
    lineHeight: lineHeights.bodyMd,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.space3,
    paddingTop: spacing.space4,
    paddingBottom: spacing.space4,
    paddingLeft: spacing.space5,
    paddingRight: spacing.space5,
    borderTopStyle: 'solid',
    borderTopWidth: borders.hairline,
    borderTopColor: colors.strokeWeak,
    flexShrink: 0,
  }
});
