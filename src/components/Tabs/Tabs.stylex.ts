import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
import { borders } from '../../tokens/borders.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  
  list: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: borders.hairline,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.strokeWeak,
    gap: spacing.space6, // Assuming they want generous spacing between tabs based on the design
  },

  item: {
    all: 'unset',
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.space2,
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    color: colors.textWeak,
    backgroundColor: 'transparent',
    marginBottom: '-1px', 
    borderWidth: 0,
    borderBottomWidth: borders.medium,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
    transitionProperty: 'color, border-bottom-color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    outline: 'none',
    
    ':hover': {
      color: colors.textStrong,
    },
    
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
      borderRadius: '2px',
    },

    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },

  // State when data-state="active"
  itemActive: {
    color: colors.textBrand,
    borderBottomColor: colors.fillBrandStrong,
  },

  // Sizes
  itemMedium: {
    paddingBottom: spacing.space3,
    paddingTop: spacing.space3,
    fontSize: fontSizes.body,
  },
  itemSmall: {
    paddingBottom: spacing.space2,
    paddingTop: spacing.space2,
    fontSize: fontSizes.caption,
  },

  panel: {
    paddingTop: spacing.space5, // Standard padding between the tabs list and the panel content
    outline: 'none',
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
      borderRadius: '4px',
    },
  },

  // Sub-components
  label: {},
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
