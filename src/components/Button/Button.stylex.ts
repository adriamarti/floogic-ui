import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
import { borders } from '../../tokens/borders.stylex';
import { durations, easings } from '../../tokens/motion.stylex';
import { elevation } from '../../tokens/elevation.stylex';

export const styles = stylex.create({
  root: {
    appearance: 'none',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.space2,
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    fontFamily: fonts.sans,
    fontWeight: fontWeights.semiBold,
    borderRadius: shape.radiusMd,
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    transitionProperty: 'border-color, background-color, color, box-shadow, transform',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    outline: 'none',
    overflow: 'hidden', // Contain the ::after pseudo-element for hover states
    ':active': {
      transform: 'translateY(1px)',
      boxShadow: 'none',
    },
    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
    },
    '::after': { // State overlay (hover/press)
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: 'transparent',
      transitionProperty: 'background-color',
      transitionDuration: durations.fast,
      transitionTimingFunction: easings.standard,
      pointerEvents: 'none',
    },
    ':hover::after': {
      backgroundColor: colors.fillHover,
    },
    ':active::after': {
      backgroundColor: colors.fillPress,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      boxShadow: 'none',
      transform: 'none',
    },
  },
  
  // -- Sizes --
  small: {
    height: '32px',
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
    fontSize: fontSizes.body,
  },
  medium: {
    height: '40px',
    paddingLeft: spacing.space4,
    paddingRight: spacing.space4,
    fontSize: fontSizes.body,
  },
  large: {
    height: '48px',
    paddingLeft: spacing.space5,
    paddingRight: spacing.space5,
    fontSize: fontSizes.body,
  },

  // -- Icon Only --
  iconOnly_small: {
    width: '32px',
    paddingLeft: 0,
    paddingRight: 0,
  },
  iconOnly_medium: {
    width: '40px',
    paddingLeft: 0,
    paddingRight: 0,
  },
  iconOnly_large: {
    width: '48px',
    paddingLeft: 0,
    paddingRight: 0,
  },

  // -- Group State --
  inGroup: {
    ':not(:first-child)': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      marginLeft: '-1px', // Collapse borders to prevent double-thickness
    },
    ':not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    ':hover': {
      zIndex: 1, // Elevate hovered button so borders overlap cleanly
    },
    ':focus-visible': {
      zIndex: 2, // Elevate focused button even higher
    }
  },

  // -- Types / Variants --
  primary: {
    borderColor: 'transparent',
    boxShadow: elevation.elev1,
  },
  secondary: {
    backgroundColor: 'transparent',
  },
  tertiary: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  // -- Tones (Applied depending on Type) --

  // Primary Tones
  primary_brand: {
    backgroundColor: colors.fillBrandStrong,
    color: colors.textInverseStrong,
  },
  primary_neutral: {
    backgroundColor: colors.fillStrong,
    color: colors.textInverseStrong,
  },
  primary_destructive: {
    backgroundColor: colors.fillErrorStrong,
    color: colors.textInverseStrong,
  },
  primary_inverse: {
    backgroundColor: colors.fillInverseStrong,
    color: colors.textStrong,
    boxShadow: elevation.elev2,
  },

  // Secondary Tones
  secondary_brand: {
    borderColor: colors.strokeBrandStrong,
    color: colors.textBrand,
  },
  secondary_neutral: {
    borderColor: colors.strokeStrong,
    color: colors.textStrong,
  },
  secondary_destructive: {
    borderColor: colors.strokeErrorStrong,
    color: colors.textError,
  },
  secondary_inverse: {
    borderColor: colors.strokeInverseStrong,
    color: colors.textInverseStrong,
  },

  // Tertiary Tones
  tertiary_brand: {
    color: colors.textBrand,
  },
  tertiary_neutral: {
    color: colors.textStrong,
  },
  tertiary_destructive: {
    color: colors.textError,
  },
  tertiary_inverse: {
    color: colors.textInverseStrong,
  },

  // Sub-components
  label: {
    zIndex: 1, // Keep above ::after overlay
  },
  icon: {
    zIndex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
