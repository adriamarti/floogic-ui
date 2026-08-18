import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';
import { borders } from '../../tokens/borders.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  root: {
    width: '100%',
  },
  item: {
    overflow: 'hidden',
    borderBottomWidth: borders.hairline,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.strokeWeak,
    ':last-child': {
      borderBottomWidth: 0,
    },
  },
  header: {
    display: 'flex',
    margin: 0,
  },
  trigger: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.medium,
    color: colors.textStrong,
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.fillHover,
      ':active': colors.fillPress,
    },
    paddingTop: spacing.space4,
    paddingBottom: spacing.space4,
    paddingLeft: spacing.space4,
    paddingRight: spacing.space4,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    cursor: 'pointer',
    transitionProperty: 'background-color, color',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    
    // States
    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: '-2px', // Inset outline so it doesn't clip
    },
    ':hover': {
      textDecoration: 'underline',
    },
    '[data-disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  chevron: {
    color: colors.textWeak,
    transitionProperty: 'transform',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
    width: spacing.space4,
    height: spacing.space4,
    '[data-state="open"]': {
      transform: 'rotate(180deg)',
    },
  },
  content: {
    overflow: 'hidden',
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    color: colors.textWeak,
    backgroundColor: 'transparent',
    lineHeight: 1.5,
  },
  contentInner: {
    paddingTop: spacing.space2,
    paddingBottom: spacing.space5,
    paddingLeft: spacing.space4,
    paddingRight: spacing.space4,
  }
});
