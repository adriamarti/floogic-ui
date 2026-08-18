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
    height: spacing.space5,
    paddingLeft: spacing.space2,
    paddingRight: spacing.space2,
    fontSize: fontSizes.caption,
    gap: spacing.space1,
  },
  sizeMedium: {
    height: spacing.space6,
    paddingLeft: spacing.space3,
    paddingRight: spacing.space3,
    fontSize: fontSizes.h6,
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
    width: fontSizes.caption,
    height: fontSizes.caption,
  },
  iconMedium: {
    width: fontSizes.h6,
    height: fontSizes.h6,
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
