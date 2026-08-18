import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';

export const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontFamily: 'inherit',
  },
  
  label: {
    color: colors.textStrong,
    fontSize: '14px',
    fontWeight: 600,
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
    height: '6px',
    borderRadius: shape.radiusFull,
    backgroundColor: colors.fillDisabled,
    transition: 'background-color 0.3s ease',
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
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'opacity 0.2s',

    ':hover': {
      opacity: 0.8,
    },
    
    ':focus-visible': {
      outline: `2px solid ${colors.strokeFocus}`,
      outlineOffset: '2px',
      borderRadius: shape.radiusSm,
    }
  }
});
