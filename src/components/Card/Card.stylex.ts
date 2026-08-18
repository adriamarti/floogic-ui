import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../tokens/typography.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { borders } from '../../tokens/borders.stylex';
import { durations, easings } from '../../tokens/motion.stylex';

export const styles = stylex.create({
  root: {
    display: 'flex',
    backgroundColor: colors.backgroundRaised,
    borderRadius: shape.radiusXl,
    borderWidth: borders.hairline,
    borderStyle: 'solid',
    borderColor: colors.strokeWeak,
    overflow: 'hidden',
    position: 'relative',
    textDecoration: 'none',
    color: 'inherit',
    transitionProperty: 'border-color, box-shadow, transform',
    transitionDuration: durations.fast,
    transitionTimingFunction: easings.standard,
  },
  rootInteractive: {
    cursor: 'pointer',
    '::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: 'transparent',
      transitionProperty: 'background-color',
      transitionDuration: durations.fast,
      transitionTimingFunction: easings.standard,
      pointerEvents: 'none',
      zIndex: 1,
    },
    ':hover::after': {
      backgroundColor: colors.fillHover,
    },
    ':active::after': {
      backgroundColor: colors.fillPress,
    },
    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: spacing.space05,
    },
  },
  rootReactive: {
    cursor: 'pointer',
    boxShadow: elevation.elev1,
    borderStyle: 'none',
    '::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: 'transparent',
      transitionProperty: 'background-color',
      transitionDuration: durations.fast,
      transitionTimingFunction: easings.standard,
      pointerEvents: 'none',
      zIndex: 1,
    },
    ':hover::after': {
      backgroundColor: colors.fillWeaker,
    },
    ':active::after': {
      backgroundColor: colors.fillHover,
    },
    ':active': {
      transform: 'translateY(1px)',
      boxShadow: 'none',
    },
    ':focus-visible': {
      outlineWidth: borders.medium,
      outlineStyle: 'solid',
      outlineColor: colors.focus,
      outlineOffset: spacing.space05,
    },
  },

  // Layouts
  layoutVertical: {
    flexDirection: 'column',
    width: '100%',
  },
  layoutHorizontal: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',
  },

  // Content Container
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    minWidth: 0,
    padding: spacing.space6,
    gap: spacing.space4,
  },

  // Media (Image)
  media: {
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    flexShrink: 0,
  },
  mediaVertical: {
    height: spacing.space20,
  },
  mediaHorizontal: {
    width: spacing.space20,
    height: 'auto',
  },

  // Icon
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing.space10,
    height: spacing.space10,
    borderRadius: shape.radiusMd,
    backgroundColor: colors.fillWeak,
    color: colors.iconNeutral,
    marginBottom: spacing.space2,
  },

  // Typography
  heading: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h5,
    fontWeight: fontWeights.semiBold,
    color: colors.textStrong,
    margin: 0,
    lineHeight: lineHeights.h5,
  },
  description: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.regular,
    color: colors.textWeak,
    margin: 0,
    lineHeight: lineHeights.body,
  },

  // Footer
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space3,
    marginTop: spacing.space2,
  },
});
