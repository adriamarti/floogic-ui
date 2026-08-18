import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes } from '../../tokens/typography.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  
  // Desktop specific styles
  desktopContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space2,
  },
  
  // Mobile specific styles
  mobileContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  pageItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: spacing.space9,
    height: spacing.space9,
    paddingLeft: spacing.space2,
    paddingRight: spacing.space2,
    borderStyle: 'solid',
    borderWidth: borders.hairline,
    borderColor: 'transparent',
    borderRadius: shape.radiusMd,
    backgroundColor: 'transparent',
    color: colors.textWeak,
    cursor: 'pointer',
    transitionProperty: 'background-color, color, border-color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    fontFamily: fonts.sans,
    fontSize: fontSizes.h6,
    lineHeight: 1,

    ':hover': {
      backgroundColor: colors.fillHover,
      color: colors.textStrong,
    },
    
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    }
  },

  pageItemActive: {
    borderColor: colors.strokeWeak,
    color: colors.textStrong,
    pointerEvents: 'none',
  },

  ellipsis: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: spacing.space9,
    height: spacing.space9,
    color: colors.textWeak,
    fontSize: fontSizes.h6,
  },

  // Desktop Prev/Next buttons
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space2,
    height: spacing.space9,
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: colors.textWeak,
    cursor: 'pointer',
    borderRadius: shape.radiusMd,
    fontFamily: fonts.sans,
    fontSize: fontSizes.h6,
    transitionProperty: 'background-color, color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,

    ':hover': {
      backgroundColor: colors.fillHover,
      color: colors.textStrong,
    },

    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    }
  },

  mobileText: {
    color: colors.textWeak,
    fontSize: fontSizes.h6,
    fontFamily: fonts.sans,
  }
});
