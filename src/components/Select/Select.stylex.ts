import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { elevation } from '../../tokens/elevation.stylex';

export const styles = stylex.create({
  root: {
    width: '100%',
  },
  commandRoot: {
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
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 500,
    color: colors.textStrong,
  },
  requiredAsterisk: {
    color: colors.textError,
  },
  hint: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: colors.textWeak,
    marginTop: spacing.space05,
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.space1,
    color: colors.textError,
    marginTop: spacing.space05,
  },
  errorIcon: {
    flexShrink: 0,
    marginTop: spacing.space05,
  },
  errorText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: colors.textError,
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.space1,
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: colors.textStrong,
    backgroundColor: {
      default: colors.backgroundBase,
      ':hover': colors.fillWeak,
      ':active': colors.fillPress,
    },
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: colors.strokeStrong,
      ':hover': colors.strokeStrong,
    },
    borderRadius: '6px',
    padding: `${spacing.space2} ${spacing.space3}`,
    outline: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    ':focus': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
    },
  },
  triggerValue: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  triggerPlaceholder: {
    color: colors.textWeak,
  },
  triggerDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    backgroundColor: colors.fillDisabled,
    borderColor: colors.strokeDisabled,
  },
  triggerInvalid: {
    borderColor: colors.strokeErrorStrong,
    backgroundColor: colors.fillErrorWeak,
    ':focus': {
      borderColor: colors.strokeErrorStrong,
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.textError,
      outlineOffset: '2px',
    }
  },
  triggerIcon: {
    color: colors.iconNeutral,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease',
    marginLeft: 'auto', // push to the right when flex-wrapped
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.space1,
    backgroundColor: colors.backgroundBase,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.strokeWeak,
    borderRadius: '4px',
    padding: `0 ${spacing.space2}`,
    fontSize: '13px',
    lineHeight: '18px',
    color: colors.textStrong,
    userSelect: 'none',
  },
  tagClose: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.iconNeutral,
    cursor: 'pointer',
    borderRadius: '2px',
    padding: '2px',
    marginLeft: '-2px',
    ':hover': {
      backgroundColor: colors.fillHover,
      color: colors.textStrong,
    }
  },
  clearWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.iconNeutral,
    padding: spacing.space05,
    cursor: 'pointer',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: colors.fillHover,
    }
  },
  content: {
    width: 'var(--radix-popover-trigger-width)',
    overflow: 'hidden',
    backgroundColor: colors.backgroundRaised,
    borderRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.strokeWeak,
    boxShadow: elevation.elev3,
    padding: spacing.space1,
    zIndex: 50,
    boxSizing: 'border-box',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${spacing.space2}`,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.strokeWeak,
    marginBottom: spacing.space1,
  },
  searchIcon: {
    color: colors.iconNeutral,
    marginRight: spacing.space2,
  },
  searchInput: {
    flexGrow: 1,
    borderWidth: 0,
    outline: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: '14px',
    color: colors.textStrong,
    padding: `${spacing.space2} 0`,
    '::placeholder': {
      color: colors.textWeak,
    },
  },
  list: {
    maxHeight: '300px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  empty: {
    padding: `${spacing.space2} ${spacing.space3}`,
    fontSize: '14px',
    color: colors.textWeak,
    textAlign: 'center',
  },
  item: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: colors.textStrong,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space2,
    justifyContent: 'flex-start', // so content flows naturally
    padding: `${spacing.space2} ${spacing.space3}`,
    position: 'relative',
    userSelect: 'none',
    outline: 'none',
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.fillHover,
      ':focus': colors.fillHover, 
    }
  },
  itemSelected: {
    backgroundColor: colors.fillBrandWeak,
    color: colors.textStrong,
  },
  itemText: {
    flexGrow: 1,
  },
  itemIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.strokeStrong,
    backgroundColor: colors.backgroundBase,
  },
  checkboxWrapperSelected: {
    backgroundColor: colors.fillBrandStrong,
    borderColor: colors.fillBrandStrong,
    color: colors.textInverseStrong,
  }
});
