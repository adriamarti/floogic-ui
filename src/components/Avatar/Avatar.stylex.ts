import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { fonts } from '../../tokens/typography.stylex';

export const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'visible', // Visible to allow badge out of bounds
    flexShrink: 0,
    borderRadius: '9999px',
    backgroundColor: colors.backgroundBase, // Prevents transparency overlap when stacked
  },

  // The actual circle container for the image/fallback
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '9999px',
    overflow: 'hidden',
    userSelect: 'none',
  },

  // Fallback defaults (when not using a specific tone)
  fallbackBase: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontFamily: fonts.sans,
    fontWeight: 600,
    borderRadius: 'inherit',
  },

  // Image
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
  },

  // Sizes

  sizeSmall: {
    width: '28px',
    height: '28px',
    fontSize: '11px',
  },
  sizeMedium: {
    width: '40px',
    height: '40px',
    fontSize: '14px',
  },
  sizeLarge: {
    width: '64px',
    height: '64px',
    fontSize: '22px',
  },

  // Stack/Group styles
  group: {
    display: 'flex',
    alignItems: 'center',
  },
  groupItem: {
    position: 'relative',
    boxShadow: `0 0 0 2.5px ${colors.backgroundBase}`, // Ring effect to separate overlapping avatars
    borderRadius: '9999px',
  },
  groupItemOverlap: {
    marginLeft: `-${spacing.space3}`,
  },

  // Badge positioning
  badgeContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Above the avatar image
  },
  badgeBottomRight: {
    bottom: '-1px',
    right: '-1px',
  },
  badgeTopRight: {
    top: '-1px',
    right: 0, // In the HTML, notification badge uses right: 0
  },
  badgeRing: {
    borderRadius: '9999px',
    boxShadow: `0 0 0 2.5px ${colors.backgroundBase}`,
  },

  // Labelled layout
  labelled: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space3, // Approx 11-13px in the design
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  labelTitle: {
    fontFamily: fonts.sans,
    fontWeight: 600,
    color: colors.textStrong,
    margin: 0,
    // Font sizes adjust based on avatar size, but we'll apply them dynamically
  },
  labelDescription: {
    fontFamily: fonts.sans,
    fontWeight: 400,
    color: colors.textWeak,
    margin: 0,
  },
  
  // Tones for fallback backgrounds
  toneNeutral: {
    backgroundColor: colors.fillWeak,
    color: colors.textWeak, // text-secondary
    boxShadow: `inset 0 0 0 1px ${colors.strokeWeak}`,
  },
  toneBrand: {
    backgroundColor: colors.fillBrandWeak,
    color: colors.textBrand,
    boxShadow: `inset 0 0 0 1px ${colors.strokeBrandWeak}`,
  },
  toneSuccess: {
    backgroundColor: colors.fillSuccessWeak,
    color: colors.textSuccess,
    boxShadow: `inset 0 0 0 1px ${colors.strokeSuccessWeak}`,
  },
  toneWarning: {
    backgroundColor: colors.fillWarningWeak,
    color: colors.textWarning,
    boxShadow: `inset 0 0 0 1px ${colors.strokeWarningWeak}`,
  },
  toneError: {
    backgroundColor: colors.fillErrorWeak,
    color: colors.textError,
    boxShadow: `inset 0 0 0 1px ${colors.strokeErrorWeak}`,
  },
  toneInformation: {
    backgroundColor: colors.fillInformationWeak,
    color: colors.textInformation,
    boxShadow: `inset 0 0 0 1px ${colors.strokeInformationWeak}`,
  },
});
