import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';

export const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: shape.radiusFull,
    flexShrink: 0,
  },
  
  // Sizes
  sizeSmall: {
    width: spacing.space2,
    height: spacing.space2,
  },
  sizeMedium: {
    width: spacing.space3,
    height: spacing.space3,
  },
  sizeLarge: {
    width: spacing.space4,
    height: spacing.space4,
  },

  // Statuses
  statusOnline: {
    backgroundColor: colors.fillSuccessStrong,
    color: colors.iconInverseStrong,
  },
  statusBusy: {
    backgroundColor: colors.fillErrorStrong,
    color: colors.iconInverseStrong,
  },
  statusAway: {
    backgroundColor: colors.fillWarningStrong,
    color: colors.iconInverseStrong,
  },
  statusOffline: {
    backgroundColor: colors.fillWeak,
    color: colors.iconNeutral,
  },
  statusNotification: {
    backgroundColor: colors.fillErrorStrong,
    color: colors.iconInverseStrong,
  },
});
