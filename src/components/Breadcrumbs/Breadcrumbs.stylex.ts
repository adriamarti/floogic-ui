import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
import { borders } from '../../tokens/borders.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  nav: {
    display: 'block',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.space2,
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  itemRoot: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  link: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.regular,
    color: colors.textWeak,
    textDecoration: 'none',
    transitionProperty: 'color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    cursor: 'pointer',
    borderRadius: shape.radiusSm,
    ':hover': {
      color: colors.textStrong,
    },
    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
    },
  },
  current: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.medium,
    color: colors.textStrong,
    cursor: 'default',
  },
  separator: {
    color: colors.textWeak,
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    userSelect: 'none',
  },
  ellipsis: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    color: colors.textWeak,
    backgroundColor: 'transparent',
    borderWidth: '0px',
    borderStyle: 'none',
    borderColor: 'transparent',
    padding: `2px ${spacing.space1}`,
    cursor: 'pointer',
    borderRadius: shape.radiusSm,
    transitionProperty: 'color, background-color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    ':hover': {
      color: colors.textStrong,
      backgroundColor: colors.fillWeak,
    },
    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '2px',
    },
  }
});
