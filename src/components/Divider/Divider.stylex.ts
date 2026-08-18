import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { borders } from '../../tokens/borders.stylex';

export const styles = stylex.create({
  root: {
    flexShrink: 0,
  },
  // Orientations
  horizontal: {
    height: borders.hairline,
    width: '100%',
  },
  vertical: {
    height: '100%',
    width: borders.hairline,
  },
  // Types
  weak: {
    backgroundColor: colors.strokeWeak,
  },
  strong: {
    backgroundColor: colors.strokeStrong,
  },
});
