import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { borders } from '../../tokens/borders.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../tokens/typography.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.space2,
  },
  track: {
    all: 'unset',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: borders.hairline,
    borderRadius: shape.radiusFull,
    transitionProperty: 'background-color, border-color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    boxSizing: 'border-box',
    padding: spacing.space05,
    width: spacing.space9,
    height: spacing.space5,
    borderColor: {
      default: colors.strokeStrong,
      ':hover': colors.strokeStrong,
    },
    backgroundColor: {
      default: colors.backgroundBase,
      ':hover': colors.fillWeak,
    },
    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: spacing.space05,
    }
  },
  trackChecked: {
    borderColor: {
      default: colors.fillBrandStrong,
      ':hover': colors.fillBrandStrong,
    },
    backgroundColor: {
      default: colors.fillBrandStrong,
      ':hover': colors.fillBrandStrong,
    },
  },
  trackDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    backgroundColor: colors.fillDisabled,
    borderColor: colors.strokeDisabled,
  },
  thumb: {
    display: 'block',
    boxSizing: 'border-box',
    width: spacing.space4,
    height: spacing.space4,
    backgroundColor: colors.backgroundBase,
    borderStyle: 'solid',
    borderWidth: borders.hairline,
    borderColor: colors.strokeStrong,
    borderRadius: shape.radiusFull,
    transform: 'translateX(0)',
    transitionProperty: 'transform, background-color, border-color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
  },
  thumbChecked: {
    backgroundColor: colors.backgroundBase,
    borderColor: colors.backgroundBase,
    transform: 'translateX(16px)',
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyMd,
    lineHeight: lineHeights.bodyMd,
    fontWeight: fontWeights.medium,
    color: colors.textStrong,
    userSelect: 'none',
    cursor: 'pointer',
  },
  requiredAsterisk: {
    color: colors.textError,
  },
  labelDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
});
