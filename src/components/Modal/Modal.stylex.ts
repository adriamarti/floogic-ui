import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { durations, easings } from '../../tokens/motion.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, lineHeights } from '../../tokens/typography.stylex';

const overlayShow = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const contentShow = stylex.keyframes({
  from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
  to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
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
    
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: shape.radiusLg,
    maxHeight: '85vh',
    animationName: contentShow,
    animationDuration: durations.base,
    animationTimingFunction: easings.decelerate,
  },

  // Size Variants
  sizeSmall: {
    width: '25rem',
    maxWidth: '90vw',
  },
  sizeMedium: {
    width: '37.5rem',
    maxWidth: '90vw',
  },
  sizeLarge: {
    width: '50rem',
    maxWidth: '90vw',
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
    gap: spacing.space4,
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
