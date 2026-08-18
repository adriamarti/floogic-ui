import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
import { borders } from '../../tokens/borders.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontFamily: fonts.sans,
  },
  
  label: {
    color: colors.textStrong,
    fontSize: fontSizes.h6,
    fontWeight: fontWeights.semiBold,
    marginBottom: spacing.space2,
  },
  
  trackContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space1,
    width: '100%',
  },
  
  segment: {
    flexGrow: 1,
    height: spacing.space15,
    borderRadius: shape.radiusFull,
    backgroundColor: colors.fillDisabled,
    transitionProperty: 'background-color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
  },
  
  segmentActive: {
    backgroundColor: colors.fillBrandStrong,
  },
  
  backButton: {
    alignSelf: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.space2,
    color: colors.textBrand,
    backgroundColor: 'transparent',
    borderStyle: 'none',
    padding: 0,
    marginTop: spacing.space3,
    fontSize: fontSizes.h6,
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
    fontFamily: fonts.sans,
    transitionProperty: 'opacity',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,

    ':hover': {
      opacity: 0.8,
    },
    
    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: spacing.space05,
      borderRadius: shape.radiusSm,
    }
  }
});
