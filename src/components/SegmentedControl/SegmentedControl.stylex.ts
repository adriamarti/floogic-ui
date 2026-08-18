import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { borders } from '../../tokens/borders.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: colors.fillWeak,
    borderRadius: shape.radiusLg,
    padding: '4px',
    gap: '2px',
  },
  
  item: {
    all: 'unset',
    boxSizing: 'border-box',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.space2,
    fontFamily: fonts.sans,
    fontWeight: fontWeights.medium,
    borderRadius: shape.radiusMd,
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    transitionProperty: 'background-color, color, box-shadow',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    color: colors.textWeak,
    backgroundColor: 'transparent',
    outline: 'none',
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    borderColor: 'transparent',
    ':hover': {
      color: colors.textStrong,
    },
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
      zIndex: 2,
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  
  // Item Active States
  itemChecked: {
    backgroundColor: colors.backgroundRaised,
    color: colors.textStrong,
    boxShadow: elevation.elev1,
    borderColor: 'transparent',
  },

  // Sizes
  itemMedium: {
    height: '32px', // 40px wrapper - 8px padding = 32px
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
    fontSize: fontSizes.body,
  },
  itemSmall: {
    height: '24px', // 32px wrapper - 8px padding = 24px
    paddingLeft: spacing.space2,
    paddingRight: spacing.space2,
    fontSize: fontSizes.caption,
  },
  
  // Icon only modifiers (optional, if we want squares)
  itemMediumIconOnly: {
    width: '32px',
    paddingLeft: 0,
    paddingRight: 0,
  },
  itemSmallIconOnly: {
    width: '24px',
    paddingLeft: 0,
    paddingRight: 0,
  },

  // Sub-components
  label: {
    zIndex: 1,
  },
  icon: {
    zIndex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
