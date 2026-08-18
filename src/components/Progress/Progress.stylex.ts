import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { fonts, fontSizes } from '../../tokens/typography.stylex';

const progressAnimation = stylex.keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(0)' },
});

export const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space3,
    width: '100%',
  },
  root: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.fillWeaker,
    borderRadius: '9999px', // Pill shape
    width: '100%',
    height: spacing.space2, // 8px default
    // Safari fix for overflow hidden with border radius
    transform: 'translateZ(0)',
  },
  indicator: {
    backgroundColor: colors.fillBrandStrong,
    width: '100%',
    height: '100%',
    borderRadius: '9999px',
    transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
    // Start at -100% to animate properly
    transform: 'translateX(-100%)', 
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    color: colors.textWeak,
    minWidth: '40px', // Prevent jitter when numbers change from 9% to 10% or 100%
    textAlign: 'right',
  }
});
