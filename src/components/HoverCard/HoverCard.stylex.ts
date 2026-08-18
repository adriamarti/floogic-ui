import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { borders } from '../../tokens/borders.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

import { spacing } from '../../tokens/spacing.stylex';

const slideUpAndFade = stylex.keyframes({
  from: { opacity: 0, transform: 'translateY(4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});
const slideRightAndFade = stylex.keyframes({
  from: { opacity: 0, transform: 'translateX(-4px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});
const slideDownAndFade = stylex.keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});
const slideLeftAndFade = stylex.keyframes({
  from: { opacity: 0, transform: 'translateX(4px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

export const styles = stylex.create({
  content: {
    boxSizing: 'border-box',
    backgroundColor: colors.backgroundRaised,
    borderRadius: '6px',
    paddingTop: spacing.space3,
    paddingBottom: spacing.space3,
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
    boxShadow: elevation.elev3,
    borderStyle: 'solid',
    borderWidth: borders.hairline,
    borderColor: colors.strokeWeak,
    zIndex: 50,
    animationDuration: durations.base,
    animationTimingFunction: easings.standard,
    willChange: 'transform, opacity',
  },
  sideTop: {
    animationName: slideUpAndFade,
  },
  sideRight: {
    animationName: slideRightAndFade,
  },
  sideBottom: {
    animationName: slideDownAndFade,
  },
  sideLeft: {
    animationName: slideLeftAndFade,
  }
});
