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
  requiredAsterisk: {
    color: colors.textError,
  },
  hint: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: colors.textWeak,
    marginBottom: spacing.space05,
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.space1,
    color: colors.textError,
    marginBottom: spacing.space05,
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
  fieldWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  },
  field: {
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
      ':focus': colors.strokeFocus,
    },
    borderRadius: '6px',
    padding: `${spacing.space2} ${spacing.space3}`,
    outline: 'none',
    transition: 'all 0.2s ease',
    resize: 'vertical',
    minHeight: '60px',
    '::placeholder': {
      color: colors.textWeak,
    },
    ':focus': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
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
      outlineColor: colors.textError, // Or a specific error focus token if it existed
      outlineOffset: '2px',
    }
  }
});
