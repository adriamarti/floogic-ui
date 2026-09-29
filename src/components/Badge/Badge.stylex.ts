import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { shape } from '../../tokens/shape.stylex';
import { borders } from '../../tokens/borders.stylex';
import { fonts, fontSizes, fontWeights } from '../../tokens/typography.stylex';

export const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderWidth: borders.hairline,
    borderRadius: shape.radiusFull,
    fontFamily: fonts.sans,
    fontWeight: fontWeights.medium,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    gap: spacing.space1,
  },
  
  // Sizes
  sizeSmall: {
    height: spacing.space6,
    paddingTop: spacing.space1,
    paddingBottom: spacing.space1,
    paddingLeft: spacing.space15,
    paddingRight: spacing.space15,
    fontSize: fontSizes.bodySm,
    gap: spacing.space1,
  },
  sizeMedium: {
    height: spacing.space7,
    paddingTop: spacing.space15,
    paddingBottom: spacing.space15,
    paddingLeft: spacing.space2,
    paddingRight: spacing.space2,
    fontSize: fontSizes.bodyMd,
    gap: spacing.space15,
  },
  sizeLarge: {
    height: spacing.space8,
    paddingTop: spacing.space2,
    paddingBottom: spacing.space2,
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
    fontSize: fontSizes.bodyLg,
    gap: spacing.space2,
  },

  // Sub-components
  label: {
    display: 'inline-block',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconSmall: {
    width: fontSizes.bodySm,
    height: fontSizes.bodySm,
  },
  iconMedium: {
    width: fontSizes.bodyMd,
    height: fontSizes.bodyMd,
  },
  iconLarge: {
    width: fontSizes.bodyLg,
    height: fontSizes.bodyLg,
  },

  // Tones
  error: {
    backgroundColor: colors.fillErrorWeak,
    borderColor: colors.strokeErrorWeak,
    color: colors.textError,
  },
  warning: {
    backgroundColor: colors.fillWarningWeak,
    borderColor: colors.strokeWarningWeak,
    color: colors.textWarning,
  },
  success: {
    backgroundColor: colors.fillSuccessWeak,
    borderColor: colors.strokeSuccessWeak,
    color: colors.textSuccess,
  },
  information: {
    backgroundColor: colors.fillInformationWeak,
    borderColor: colors.strokeInformationWeak,
    color: colors.textInformation,
  },
  neutral: {
    backgroundColor: colors.fillWeaker,
    borderColor: colors.strokeWeak,
    color: colors.textStrong,
  },
  brand: {
    backgroundColor: colors.fillBrandWeak,
    borderColor: colors.strokeBrandWeak,
    color: colors.textBrand,
  },

  // Icon tones
  icon_error: { color: colors.iconError },
  icon_warning: { color: colors.iconWarning },
  icon_success: { color: colors.iconSuccess },
  icon_information: { color: colors.iconInformation },
  icon_neutral: { color: colors.iconNeutral },
  icon_brand: { color: colors.iconBrand },
});
