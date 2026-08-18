import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.space1,
    width: '100%',
  },
  
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.space2,
  },

  label: {
    fontFamily: fonts.sans,
    fontSize: '14px',
    fontWeight: 500,
    color: colors.textStrong,
  },

  value: {
    fontFamily: fonts.sans,
    fontSize: '14px',
    fontWeight: fontWeights.regular,
    color: colors.textWeak,
  },

  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
    width: '100%',
    height: '20px', // Hit area for mobile
  },

  track: {
    backgroundColor: colors.strokeWeak,
    position: 'relative',
    flexGrow: 1,
    borderRadius: shape.radiusFull,
    height: '6px',
    overflow: 'hidden', // To keep the range inside rounded corners if needed
  },

  range: {
    position: 'absolute',
    backgroundColor: colors.fillBrandStrong,
    borderRadius: shape.radiusFull,
    height: '100%',
  },

  thumb: {
    display: 'block',
    width: '20px',
    height: '20px',
    backgroundColor: colors.backgroundRaised,
    boxShadow: elevation.elev1,
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    borderColor: colors.strokeWeak,
    borderRadius: shape.radiusFull,
    transitionProperty: 'box-shadow',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    outline: 'none',
    cursor: 'grab',

    ':hover': {
      boxShadow: elevation.elev2,
    },
    
    ':active': {
      cursor: 'grabbing',
    },

    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
    },
  },

  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
});
