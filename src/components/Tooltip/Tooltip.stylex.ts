import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { durations, easings } from '../../tokens/motion.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
import { shape } from '../../tokens/shape.stylex';

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
    fontFamily: fonts.sans,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.medium,
    lineHeight: 1.4,
    color: colors.textInverseStrong,
    backgroundColor: colors.backgroundInverse,
    borderRadius: shape.radiusSm,
    paddingTop: spacing.space1,
    paddingBottom: spacing.space1,
    paddingLeft: spacing.space2,
    paddingRight: spacing.space2,
    boxShadow: elevation.elev2,
    zIndex: 50,
    animationDuration: durations.base,
    animationTimingFunction: easings.standard,
    willChange: 'transform, opacity',
  },
  arrow: {
    fill: colors.backgroundInverse,
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
