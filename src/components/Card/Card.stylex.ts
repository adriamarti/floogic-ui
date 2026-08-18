import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts } from '../../tokens/typography.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { borders } from '../../tokens/borders.stylex';

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
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
  },
  rootInteractive: {
    cursor: 'pointer',
    '::after': { // State overlay (hover/press)
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: 'transparent',
      transitionProperty: 'background-color',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease',
      pointerEvents: 'none',
      zIndex: 1, // Ensure it covers media and content
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
      outlineOffset: '2px',
    },
  },
  rootReactive: {
    cursor: 'pointer',
    boxShadow: elevation.elev1,
    borderStyle: 'none',
    '::after': { // State overlay (hover/press)
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: 'transparent',
      transitionProperty: 'background-color',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease',
      pointerEvents: 'none',
      zIndex: 1, // Ensure it covers media and content
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
      outlineOffset: '2px',
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
    minWidth: 0, // Prevent flex items from overflowing
    padding: spacing.space6, // 24px is standard for cards usually, or maybe space5 (20px). We'll use space6
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
    height: '160px', // Standard height for top images
  },
  mediaHorizontal: {
    width: '140px', // Fixed width for horizontal images as proposed
    height: 'auto',
  },

  // Icon
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: shape.radiusMd,
    backgroundColor: colors.fillWeak,
    color: colors.iconNeutral,
    marginBottom: spacing.space2,
  },

  // Typography
  heading: {
    fontFamily: fonts.sans,
    fontSize: '15px',
    fontWeight: 600,
    color: colors.textStrong,
    margin: 0,
    lineHeight: 1.3,
  },
  description: {
    fontFamily: fonts.sans,
    fontSize: '13.5px',
    fontWeight: 400,
    color: colors.textWeak,
    margin: 0,
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space3,
    marginTop: spacing.space2, // push it slightly away from description
  },
});
