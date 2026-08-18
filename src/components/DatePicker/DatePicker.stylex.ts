import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';
import { elevation } from '../../tokens/elevation.stylex';

const fadeIn = stylex.keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

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
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    textAlign: 'left',
    ':focus': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
      borderColor: colors.strokeFocus,
    },
  },
  triggerPlaceholder: {
    color: colors.textWeak,
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
    },
  },
  triggerDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    backgroundColor: colors.fillDisabled,
    borderColor: colors.strokeDisabled,
  },
  icon: {
    color: colors.textWeak,
    flexShrink: 0,
    marginLeft: spacing.space2,
  },
  popoverContent: {
    backgroundColor: colors.backgroundRaised,
    borderRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.strokeWeak,
    boxShadow: elevation.elev3,
    padding: spacing.space3,
    animationName: fadeIn,
    animationDuration: '0.2s',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    zIndex: 50,
  },
  // react-day-picker styles mapping
  rdpRoot: {
    fontFamily: 'var(--font-sans)',
    position: 'relative',
    color: colors.textStrong,
  },
  rdpMonths: {
    display: 'flex',
    flexDirection: 'column',
  },
  rdpMonth: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.space3,
    position: 'relative',
  },
  rdpCaption: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '28px',
  },
  rdpCaptionLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: colors.textStrong,
  },
  rdpNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    height: '28px',
    pointerEvents: 'none', // to let clicks pass through to the caption
    top: 0,
    left: 0,
    zIndex: 10,
  },
  rdpNavButton: {
    all: 'unset',
    borderWidth: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    cursor: 'pointer',
    pointerEvents: 'auto',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.fillWeak,
    },
    transition: 'background-color 0.2s',
  },
  rdpNavButtonPrevious: {
    // specific styles if needed
  },
  rdpNavButtonNext: {
    // specific styles if needed
  },
  rdpHead: {
    marginBottom: spacing.space2,
  },
  rdpHeadRow: {
    // default tr
  },
  rdpHeadCell: {
    color: colors.textWeak,
    fontSize: '12px',
    fontWeight: 500,
    width: '32px',
    height: '32px',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: 0,
  },
  rdpTbody: {
    // default tbody
  },
  rdpRow: {
    // default tr
  },
  rdpCell: {
    position: 'relative',
    padding: 0,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  rdpDay: {
    all: 'unset',
    borderWidth: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    fontSize: '13px',
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.fillWeak,
    },
    transition: 'all 0.2s',
  },
  rdpDaySelected: {
    backgroundColor: {
      default: colors.fillBrandStrong,
      ':hover': colors.fillBrandStrong,
    },
    color: colors.textInverseStrong,
    fontWeight: 500,
    borderRadius: shape.radiusMd,
  },
  rdpDayToday: {
    fontWeight: 600,
    color: colors.textBrand,
  },
  rdpDayOutside: {
    color: colors.textWeak,
    opacity: 0.5,
  },
  rdpDayDisabled: {
    color: colors.textWeak,
    opacity: 0.3,
    pointerEvents: 'none',
  },
});
