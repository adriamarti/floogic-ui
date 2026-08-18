import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { fonts } from '../../tokens/typography.stylex';

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
    fontSize: '14px',
    fontWeight: 500,
    color: colors.textStrong,
  },
  labelSmall: {
    fontSize: '13px',
  },
  labelLarge: {
    fontSize: '14px',
  },
  requiredAsterisk: {
    color: colors.textError,
  },
  hint: {
    fontFamily: 'var(--font-sans)',
    color: colors.textWeak,
    marginTop: spacing.space1,
  },
  hintSmall: {
    fontSize: '12px',
  },
  hintLarge: {
    fontSize: '13px',
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
    fontFamily: 'var(--font-sans)',
    color: colors.textError,
  },
  errorTextSmall: {
    fontSize: '12px',
  },
  errorTextLarge: {
    fontSize: '13px',
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
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '50%',
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
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
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
    width: '16px',
    height: '16px',
  },
  radioLarge: {
    width: '20px',
    height: '20px',
  },
  indicator: {
    display: 'block',
    width: '40%',
    height: '40%',
    borderRadius: '50%',
    backgroundColor: colors.fillWhite,
    flexShrink: 0,
  },
  indicatorInvalid: {
    backgroundColor: colors.fillWhite,
  },
  itemLabel: {
    fontFamily: 'var(--font-sans)',
    color: colors.textStrong,
    cursor: 'pointer',
    userSelect: 'none',
  },
  itemLabelSmall: {
    fontSize: '13px',
  },
  itemLabelLarge: {
    fontSize: '14px',
  },
  itemLabelDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  }
});
