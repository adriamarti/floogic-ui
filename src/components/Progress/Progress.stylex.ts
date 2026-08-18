import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes } from '../../tokens/typography.stylex';

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
    borderRadius: shape.radiusFull,
    width: '100%',
    height: spacing.space2,
    transform: 'translateZ(0)',
  },
  indicator: {
    backgroundColor: colors.fillBrandStrong,
    width: '100%',
    height: '100%',
    borderRadius: shape.radiusFull,
    transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
    transform: 'translateX(-100%)', 
  },
  indicatorDynamic: (offset: number) => ({
    transform: `translateX(-${offset}%)`,
  }),
  label: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    color: colors.textWeak,
    minWidth: spacing.space10,
    textAlign: 'right',
  }
});
