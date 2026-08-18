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
    padding: spacing.space1,
    gap: spacing.space05,
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
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: spacing.space05,
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
    height: spacing.space8,
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
    fontSize: fontSizes.body,
  },
  itemSmall: {
    height: spacing.space6,
    paddingLeft: spacing.space2,
    paddingRight: spacing.space2,
    fontSize: fontSizes.caption,
  },
  
  // Icon only modifiers
  itemMediumIconOnly: {
    width: spacing.space8,
    paddingLeft: 0,
    paddingRight: 0,
  },
  itemSmallIconOnly: {
    width: spacing.space6,
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
