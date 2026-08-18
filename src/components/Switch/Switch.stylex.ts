import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { fonts } from '../../tokens/typography.stylex';

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
    borderWidth: '1px',
    borderRadius: '9999px',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    padding: '1px',
    borderColor: {
      default: colors.strokeStrong,
      ':hover': colors.strokeStrong,
    },
    backgroundColor: {
      default: colors.backgroundBase,
      ':hover': colors.fillWeak,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
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
    width: '36px',
    height: '20px',
  },
  trackSmall: {
    width: '28px',
    height: '16px',
  },
  thumb: {
    display: 'block',
    boxSizing: 'border-box',
    backgroundColor: colors.backgroundBase,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: colors.strokeStrong,
    borderRadius: '9999px',
    transition: 'transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
  },
  thumbChecked: {
    backgroundColor: colors.backgroundBase,
    borderColor: colors.backgroundBase,
  },
  thumbMedium: {
    width: '16px',
    height: '16px',
    transform: 'translateX(0)',
  },
  thumbMediumChecked: {
    transform: 'translateX(16px)',
  },
  thumbSmall: {
    width: '12px',
    height: '12px',
    transform: 'translateX(0)',
  },
  thumbSmallChecked: {
    transform: 'translateX(12px)',
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: '14px',
    fontWeight: 500,
    color: colors.textStrong,
    userSelect: 'none',
    cursor: 'pointer',
  },
  labelDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
});
