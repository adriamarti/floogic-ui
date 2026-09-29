import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../tokens/typography.stylex';
import { spacing } from '../../tokens/spacing.stylex';

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
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.space2,
  },
  itemsGroup: {
    display: 'flex',
    gap: spacing.space2,
  },
  layoutVertical: {
    flexDirection: 'column',
  },
  layoutHorizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: spacing.space3,
    rowGap: spacing.space2,
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space2,
  },
  checkboxRoot: {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    borderRadius: shape.radiusSm,
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.fillWeak,
    },
    borderColor: {
      default: colors.strokeStrong,
      ':hover': colors.strokeStrong,
    },
    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: spacing.space05,
    },
  },
  checkboxControl: {
    width: spacing.space4,
    height: spacing.space4,
  },
  checkboxRootChecked: {
    backgroundColor: {
      default: colors.fillBrandStrong,
      ':hover': colors.fillBrandStrong,
    },
    borderColor: {
      default: colors.fillBrandStrong,
      ':hover': colors.fillBrandStrong,
    },
  },
  checkboxRootInvalid: {
    borderColor: colors.strokeErrorStrong,
    backgroundColor: colors.fillErrorWeak,
  },
  checkboxRootDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    backgroundColor: colors.fillDisabled,
    borderColor: colors.strokeDisabled,
  },
  indicator: {
    color: colors.textInverseStrong,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyMd,
    lineHeight: lineHeights.bodyMd,
    color: colors.textStrong,
    cursor: 'pointer',
    userSelect: 'none',
  },
  itemLabelDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
});
