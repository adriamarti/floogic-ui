import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../tokens/typography.stylex';

export const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'visible',
    flexShrink: 0,
    borderRadius: shape.radiusFull,
    backgroundColor: colors.backgroundBase,
  },

  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: shape.radiusFull,
    overflow: 'hidden',
    userSelect: 'none',
  },

  fallbackBase: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontFamily: fonts.sans,
    fontWeight: fontWeights.semiBold,
    borderRadius: 'inherit',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
  },

  // Sizes
  sizeSmall: {
    width: spacing.space7,
    height: spacing.space7,
    fontSize: fontSizes.bodySm,
  },
  sizeMedium: {
    width: spacing.space10,
    height: spacing.space10,
    fontSize: fontSizes.h6,
  },
  sizeLarge: {
    width: spacing.space16,
    height: spacing.space16,
    fontSize: fontSizes.h3,
  },

  // Stack/Group styles
  group: {
    display: 'flex',
    alignItems: 'center',
  },
  groupItem: {
    position: 'relative',
    boxShadow: `0 0 0 2.5px ${colors.backgroundBase}`,
    borderRadius: shape.radiusFull,
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
    zIndex: 1,
  },
  badgeBottomRight: {
    bottom: '-1px',
    right: '-1px',
  },
  badgeTopRight: {
    top: '-1px',
    right: 0,
  },
  badgeRing: {
    borderRadius: shape.radiusFull,
    boxShadow: `0 0 0 2.5px ${colors.backgroundBase}`,
  },

  // Labelled layout
  labelled: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space3,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  labelTitle: {
    fontFamily: fonts.sans,
    fontWeight: fontWeights.semiBold,
    color: colors.textStrong,
    margin: 0,
  },
  labelTitleSmall: {
    fontSize: fontSizes.h6,
    lineHeight: lineHeights.h6,
  },
  labelTitleMedium: {
    fontSize: fontSizes.h6,
    lineHeight: lineHeights.h6,
  },
  labelTitleLarge: {
    fontSize: fontSizes.h5,
    lineHeight: lineHeights.h5,
  },
  labelDescription: {
    fontFamily: fonts.sans,
    fontWeight: fontWeights.regular,
    color: colors.textWeak,
    margin: 0,
  },
  labelDescriptionSmall: {
    fontSize: fontSizes.bodySm,
    lineHeight: lineHeights.bodySm,
  },
  labelDescriptionMedium: {
    fontSize: fontSizes.bodySm,
    lineHeight: lineHeights.bodySm,
  },
  labelDescriptionLarge: {
    fontSize: fontSizes.h6,
    lineHeight: lineHeights.bodyMd,
  },
  
  // Tones for fallback backgrounds
  toneNeutral: {
    backgroundColor: colors.fillWeak,
    color: colors.textWeak,
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

export const dynamicStyles = stylex.create({
  zIndex: (level: number) => ({
    zIndex: level,
  }),
});
