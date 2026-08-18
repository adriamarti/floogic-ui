import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../tokens/typography.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

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
    fontFamily: fonts.sans,
    fontSize: fontSizes.h6,
    fontWeight: fontWeights.medium,
    color: colors.textStrong,
  },
  requiredAsterisk: {
    color: colors.textError,
  },
  hint: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.caption,
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
    fontFamily: fonts.sans,
    fontSize: fontSizes.caption,
    color: colors.textError,
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.space1,
    width: '100%',
    fontFamily: fonts.sans,
    fontSize: fontSizes.h6,
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
    cursor: 'pointer',
    ':focus': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: spacing.space05,
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
      outlineOffset: spacing.space05,
    }
  },
  triggerIcon: {
    color: colors.iconNeutral,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transitionProperty: 'transform',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    marginLeft: 'auto',
  },
  triggerIconOpen: {
    transform: 'rotate(180deg)',
  },
  marginLeftAuto: {
    marginLeft: 'auto',
  },
  marginLeftZero: {
    marginLeft: 0,
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.space1,
    backgroundColor: colors.backgroundBase,
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    borderColor: colors.strokeWeak,
    borderRadius: shape.radiusSm,
    paddingLeft: spacing.space2,
    paddingRight: spacing.space2,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.body,
    color: colors.textStrong,
    userSelect: 'none',
  },
  tagClose: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.iconNeutral,
    cursor: 'pointer',
    borderRadius: shape.radiusSm,
    padding: spacing.space05,
    marginLeft: `-${spacing.space05}`,
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
    borderRadius: shape.radiusSm,
    marginLeft: 'auto',
    ':hover': {
      backgroundColor: colors.fillHover,
    }
  },
  content: {
    width: 'var(--radix-popover-trigger-width)',
    overflow: 'hidden',
    backgroundColor: colors.backgroundRaised,
    borderRadius: shape.radiusMd,
    borderWidth: borders.hairline,
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
    paddingLeft: spacing.space2,
    paddingRight: spacing.space2,
    borderBottomWidth: borders.hairline,
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
    fontFamily: fonts.sans,
    fontSize: fontSizes.h6,
    color: colors.textStrong,
    paddingTop: spacing.space2,
    paddingBottom: spacing.space2,
    '::placeholder': {
      color: colors.textWeak,
    },
  },
  list: {
    maxHeight: '18.75rem',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  empty: {
    paddingTop: spacing.space2,
    paddingBottom: spacing.space2,
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
    fontSize: fontSizes.h6,
    color: colors.textWeak,
    textAlign: 'center',
  },
  item: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h6,
    color: colors.textStrong,
    borderRadius: shape.radiusSm,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space2,
    justifyContent: 'flex-start',
    paddingTop: spacing.space2,
    paddingBottom: spacing.space2,
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
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
    width: spacing.space4,
    height: spacing.space4,
    borderRadius: shape.radiusSm,
    borderWidth: borders.hairline,
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
