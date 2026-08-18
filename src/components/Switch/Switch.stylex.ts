import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { borders } from '../../tokens/borders.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
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
  trackMedium: {
    width: spacing.space9,
    height: spacing.space5,
  },
  trackSmall: {
    width: spacing.space7,
    height: spacing.space4,
  },
  thumb: {
    display: 'block',
    boxSizing: 'border-box',
    backgroundColor: colors.backgroundBase,
    borderStyle: 'solid',
    borderWidth: borders.hairline,
    borderColor: colors.strokeStrong,
    borderRadius: shape.radiusFull,
    transitionProperty: 'transform, background-color, border-color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
  },
  thumbChecked: {
    backgroundColor: colors.backgroundBase,
    borderColor: colors.backgroundBase,
  },
  thumbMedium: {
    width: spacing.space4,
    height: spacing.space4,
    transform: 'translateX(0)',
  },
  thumbMediumChecked: {
    transform: 'translateX(16px)',
  },
  thumbSmall: {
    width: spacing.space3,
    height: spacing.space3,
    transform: 'translateX(0)',
  },
  thumbSmallChecked: {
    transform: 'translateX(12px)',
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h6,
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
