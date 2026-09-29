import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../tokens/typography.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.space1,
    width: '100%',
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space1,
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyMd,
    lineHeight: lineHeights.bodyMd,
    fontWeight: fontWeights.medium,
    color: colors.textStrong,
  },
  requiredAsterisk: {
    color: colors.textError,
  },
  hint: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyMd,
    lineHeight: lineHeights.bodyMd,
    fontWeight: fontWeights.regular,
    color: colors.textWeak,
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.space1,
    color: colors.textError,
  },
  errorIcon: {
    flexShrink: 0,
    marginTop: spacing.space05,
  },
  errorText: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyMd,
    lineHeight: lineHeights.bodyMd,
    fontWeight: fontWeights.regular,
    color: colors.textError,
  },
  fieldWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  field: {
    width: '100%',
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyMd,
    lineHeight: lineHeights.bodyMd,
    color: colors.textStrong,
    backgroundColor: {
      default: colors.backgroundBase,
      ':hover': colors.fillWeak,
      ':active': colors.fillPress,
    },
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    borderColor: {
      default: colors.strokeStrong,
      ':hover': colors.strokeStrong,
      ':focus': colors.strokeFocus,
    },
    borderRadius: shape.radiusMd,
    paddingTop: spacing.space2,
    paddingBottom: spacing.space2,
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
    outline: 'none',
    transitionProperty: 'border-color, background-color, color, box-shadow',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    '::placeholder': {
      color: colors.textWeak,
    },
    ':focus': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: spacing.space05,
    }
  },
  fieldDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    backgroundColor: colors.fillDisabled,
    borderColor: colors.strokeDisabled,
  },
  fieldInvalid: {
    borderColor: colors.strokeErrorStrong,
    backgroundColor: colors.fillErrorWeak,
    ':focus': {
      borderColor: colors.strokeErrorStrong,
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.textError,
      outlineOffset: spacing.space05,
    }
  }
});
