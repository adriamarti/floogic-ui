import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { borders } from '../../tokens/borders.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../tokens/typography.stylex';

export const alertTokens = stylex.defineVars({
  padding: spacing.space4,
  gap: spacing.space3,
  radius: shape.radiusMd,
  iconSize: spacing.space5,
  borderWidth: borders.hairline,
  accentBorderWidth: borders.accent,
});

export const styles = stylex.create({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: alertTokens.radius,
    borderStyle: 'solid',
    borderWidth: alertTokens.borderWidth,
    padding: alertTokens.padding,
    gap: alertTokens.gap,
    overflow: 'hidden',
  },
  
  // Layouts
  layoutVertical: {
    flexDirection: 'column',
  },
  layoutHorizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // Sizes
  sizeSmall: {
    padding: spacing.space3,
    gap: spacing.space2,
  },
  sizeLarge: {
    padding: spacing.space5,
    gap: spacing.space4,
  },

  // Border (accent)
  borderLeft: {
    borderLeftWidth: alertTokens.accentBorderWidth,
  },

  // Tones
  toneError: {
    backgroundColor: colors.fillErrorWeak,
    borderColor: colors.strokeErrorWeak,
    color: colors.textError,
  },
  toneWarning: {
    backgroundColor: colors.fillWarningWeak,
    borderColor: colors.strokeWarningWeak,
    color: colors.textWarning,
  },
  toneSuccess: {
    backgroundColor: colors.fillSuccessWeak,
    borderColor: colors.strokeSuccessWeak,
    color: colors.textSuccess,
  },
  toneInformation: {
    backgroundColor: colors.fillInformationWeak,
    borderColor: colors.strokeInformationWeak,
    color: colors.textInformation,
  },
  toneNeutral: {
    backgroundColor: colors.fillWeak,
    borderColor: colors.strokeWeak,
    color: colors.textStrong,
  },
  toneBrand: {
    backgroundColor: colors.fillBrandWeak,
    borderColor: colors.strokeBrandWeak,
    color: colors.textBrand,
  },
  toneInverseNeutral: {
    backgroundColor: colors.fillStrong,
    borderColor: colors.strokeStrong,
    color: colors.textInverseStrong,
  },
  toneInverseBrand: {
    backgroundColor: colors.fillBrandStrong,
    borderColor: colors.strokeBrandStrong,
    color: colors.textInverseStrong,
  },

  // Icon container
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: alertTokens.iconSize,
    height: alertTokens.iconSize,
  },
  iconContainerHorizontal: {
    marginTop: spacing.space05,
  },

  // Content wrapper
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: spacing.space2,
  },

  // Heading
  heading: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.body,
    margin: 0,
  },

  // Description
  description: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.body,
    margin: 0,
  },

  // Actions
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space3,
    marginTop: spacing.space1,
  },

  // Close Button Container
  closeButtonContainer: {
    position: 'absolute',
    top: spacing.space3,
    right: spacing.space3,
  },
});

export const iconColorStyles = stylex.create({
  error: { color: colors.iconError },
  warning: { color: colors.iconWarning },
  success: { color: colors.iconSuccess },
  information: { color: colors.iconInformation },
  neutral: { color: colors.iconNeutral },
  brand: { color: colors.iconBrand },
  'inverse-neutral': { color: colors.iconInverseStrong },
  'inverse-brand': { color: colors.iconInverseStrong },
});

export const borderLeftColorStyles = stylex.create({
  error: { borderLeftColor: colors.strokeErrorStrong },
  warning: { borderLeftColor: colors.strokeWarningStrong },
  success: { borderLeftColor: colors.strokeSuccessStrong },
  information: { borderLeftColor: colors.strokeInformationStrong },
  neutral: { borderLeftColor: colors.strokeStrong },
  brand: { borderLeftColor: colors.strokeBrandStrong },
  'inverse-neutral': { borderLeftColor: colors.strokeInverseStrong },
  'inverse-brand': { borderLeftColor: colors.strokeInverseStrong },
});
