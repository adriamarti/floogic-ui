import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../tokens/typography.stylex';

export const alertGlobalTokens = stylex.defineVars({
  paddingX: spacing.space4,
  paddingY: spacing.space3,
  gap: spacing.space3,
  iconSize: '20px',
  borderWidth: '1px',
});

export const styles = stylex.create({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: alertGlobalTokens.paddingY,
    paddingBottom: alertGlobalTokens.paddingY,
    paddingLeft: alertGlobalTokens.paddingX,
    paddingRight: alertGlobalTokens.paddingX,
    gap: alertGlobalTokens.gap,
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderTopWidth: 0,
    borderBottomWidth: alertGlobalTokens.borderWidth,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    flexWrap: 'wrap', // Allow wrapping on small screens
  },
  
  // Tones (Solid)
  solid_error: {
    backgroundColor: colors.fillErrorWeak,
    borderTopColor: colors.strokeErrorWeak,
    borderBottomColor: colors.strokeErrorWeak,
    color: colors.textError,
  },
  solid_warning: {
    backgroundColor: colors.fillWarningWeak,
    borderTopColor: colors.strokeWarningWeak,
    borderBottomColor: colors.strokeWarningWeak,
    color: colors.textWarning,
  },
  solid_success: {
    backgroundColor: colors.fillSuccessWeak,
    borderTopColor: colors.strokeSuccessWeak,
    borderBottomColor: colors.strokeSuccessWeak,
    color: colors.textSuccess,
  },
  solid_information: {
    backgroundColor: colors.fillInformationWeak,
    borderTopColor: colors.strokeInformationWeak,
    borderBottomColor: colors.strokeInformationWeak,
    color: colors.textInformation,
  },
  solid_neutral: {
    backgroundColor: colors.fillWeak,
    borderTopColor: colors.strokeWeak,
    borderBottomColor: colors.strokeWeak,
    color: colors.textStrong,
  },
  solid_brand: {
    backgroundColor: colors.fillBrandWeak,
    borderTopColor: colors.strokeBrandWeak,
    borderBottomColor: colors.strokeBrandWeak,
    color: colors.textBrand,
  },
  solid_inverseNeutral: {
    backgroundColor: colors.fillStrong,
    borderTopColor: colors.strokeStrong,
    borderBottomColor: colors.strokeStrong,
    color: colors.textInverseStrong,
  },
  solid_inverseBrand: {
    backgroundColor: colors.fillBrandStrong,
    borderTopColor: colors.strokeBrandStrong,
    borderBottomColor: colors.strokeBrandStrong,
    color: colors.textInverseStrong,
  },

  // Tones (Transparent)
  transparent_error: {
    backgroundColor: 'transparent',
    borderTopColor: colors.strokeErrorWeak,
    borderBottomColor: colors.strokeErrorWeak,
    color: colors.textError,
  },
  transparent_warning: {
    backgroundColor: 'transparent',
    borderTopColor: colors.strokeWarningWeak,
    borderBottomColor: colors.strokeWarningWeak,
    color: colors.textWarning,
  },
  transparent_success: {
    backgroundColor: 'transparent',
    borderTopColor: colors.strokeSuccessWeak,
    borderBottomColor: colors.strokeSuccessWeak,
    color: colors.textSuccess,
  },
  transparent_information: {
    backgroundColor: 'transparent',
    borderTopColor: colors.strokeInformationWeak,
    borderBottomColor: colors.strokeInformationWeak,
    color: colors.textInformation,
  },
  transparent_neutral: {
    backgroundColor: 'transparent',
    borderTopColor: colors.strokeWeak,
    borderBottomColor: colors.strokeWeak,
    color: colors.textStrong,
  },
  transparent_brand: {
    backgroundColor: 'transparent',
    borderTopColor: colors.strokeBrandWeak,
    borderBottomColor: colors.strokeBrandWeak,
    color: colors.textBrand,
  },
  transparent_inverseNeutral: {
    backgroundColor: 'transparent',
    borderTopColor: colors.strokeStrong,
    borderBottomColor: colors.strokeStrong,
    color: colors.textInverseStrong,
  },
  transparent_inverseBrand: {
    backgroundColor: 'transparent',
    borderTopColor: colors.strokeBrandStrong,
    borderBottomColor: colors.strokeBrandStrong,
    color: colors.textInverseStrong,
  },

  // Icon container
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: alertGlobalTokens.iconSize,
    height: alertGlobalTokens.iconSize,
    marginTop: spacing.space05, // Slight visual alignment
  },

  // Content wrapper
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1, // Take up remaining space, pushing actions to the right
    minWidth: '200px', // Prevent crushing on very small screens
    gap: spacing.space2,
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
    flexShrink: 0,
  },

  // Close Button Container
  closeButtonContainer: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    marginLeft: spacing.space2,
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
