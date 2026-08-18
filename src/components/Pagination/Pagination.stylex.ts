import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';

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
    minWidth: '36px',
    height: '36px',
    padding: `0 ${spacing.space2}`,
    borderStyle: 'solid',
    borderWidth: borders.hairline,
    borderColor: 'transparent',
    borderRadius: shape.radiusMd,
    backgroundColor: 'transparent',
    color: colors.textWeak,
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
    fontFamily: 'inherit',
    fontSize: '14px',
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
    minWidth: '36px',
    height: '36px',
    color: colors.textWeak,
    fontSize: '14px',
  },

  // Desktop Prev/Next buttons
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space2,
    height: '36px',
    padding: `0 ${spacing.space3}`,
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: colors.textWeak,
    cursor: 'pointer',
    borderRadius: shape.radiusMd,
    fontFamily: 'inherit',
    fontSize: '14px',
    transition: 'background-color 0.2s, color 0.2s',

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
    fontSize: '14px',
    fontFamily: 'inherit',
  }
});
