import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';

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
    fontSize: fontSizes.h6,
    fontWeight: fontWeights.medium,
    color: colors.textStrong,
  },
  labelSmall: {
    fontSize: fontSizes.caption,
  },
  labelLarge: {
    fontSize: fontSizes.h6,
  },
  requiredAsterisk: {
    color: colors.textError,
  },
  hint: {
    fontFamily: fonts.sans,
    color: colors.textWeak,
    marginTop: spacing.space1,
  },
  hintSmall: {
    fontSize: fontSizes.caption,
  },
  hintLarge: {
    fontSize: fontSizes.caption,
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.space1,
    color: colors.textError,
    marginTop: spacing.space1,
  },
  errorIcon: {
    flexShrink: 0,
    marginTop: spacing.space05,
  },
  errorText: {
    fontFamily: fonts.sans,
    color: colors.textError,
  },
  errorTextSmall: {
    fontSize: fontSizes.caption,
  },
  errorTextLarge: {
    fontSize: fontSizes.caption,
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
  radioRoot: {
    all: 'unset',
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    borderRadius: shape.radiusFull,
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
  radioRootChecked: {
    backgroundColor: {
      default: colors.fillBrandStrong,
      ':hover': colors.fillBrandStrong,
    },
    borderColor: {
      default: colors.fillBrandStrong,
      ':hover': colors.fillBrandStrong,
    },
  },
  radioRootInvalid: {
    borderColor: colors.strokeErrorStrong,
    backgroundColor: colors.fillErrorWeak,
  },
  radioRootInvalidChecked: {
    borderColor: colors.fillErrorStrong,
    backgroundColor: colors.fillErrorStrong,
  },
  radioRootDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    backgroundColor: colors.fillDisabled,
    borderColor: colors.strokeDisabled,
  },
  radioSmall: {
    width: spacing.space4,
    height: spacing.space4,
  },
  radioLarge: {
    width: spacing.space5,
    height: spacing.space5,
  },
  indicator: {
    display: 'block',
    width: '40%',
    height: '40%',
    borderRadius: shape.radiusFull,
    backgroundColor: colors.fillWhite,
    flexShrink: 0,
  },
  indicatorInvalid: {
    backgroundColor: colors.fillWhite,
  },
  itemLabel: {
    fontFamily: fonts.sans,
    color: colors.textStrong,
    cursor: 'pointer',
    userSelect: 'none',
  },
  itemLabelSmall: {
    fontSize: fontSizes.caption,
  },
  itemLabelLarge: {
    fontSize: fontSizes.h6,
  },
  itemLabelDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  }
});
