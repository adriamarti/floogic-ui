import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';

export const styles = stylex.create({
  root: {
    flexShrink: 0,
  },
  // Orientations
  horizontal: {
    height: '1px',
    width: '100%',
  },
  vertical: {
    height: '100%',
    width: '1px',
  },
  // Types
  weak: {
    backgroundColor: colors.strokeWeak,
  },
  strong: {
    backgroundColor: colors.strokeStrong,
  },
});
