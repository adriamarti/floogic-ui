import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { spacing } from '../../tokens/spacing.stylex';

export const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: '9999px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: 'nowrap',
  },
  
  // Sizes
  sizeSmall: {
    height: spacing.space4,
    minWidth: spacing.space4,
    paddingLeft: spacing.space1,
    paddingRight: spacing.space1,
    fontSize: '11px',
  },
  sizeMedium: {
    height: spacing.space5,
    minWidth: spacing.space5,
    paddingLeft: '6px', // between space1 and space2
    paddingRight: '6px',
    fontSize: '12px',
  },
  sizeLarge: {
    height: spacing.space6,
    minWidth: spacing.space6,
    paddingLeft: spacing.space2,
    paddingRight: spacing.space2,
    fontSize: '14px',
  },

  // Tones - Strong
  strong_neutral: { backgroundColor: colors.fillStrong, color: colors.textInverseStrong },
  strong_brand: { backgroundColor: colors.fillBrandStrong, color: colors.textInverseStrong },
  strong_error: { backgroundColor: colors.fillErrorStrong, color: colors.textInverseStrong },
  strong_warning: { backgroundColor: colors.fillWarningStrong, color: colors.textInverseStrong }, // usually white or dark depending on contrast, let's use textInverseStrong
  strong_success: { backgroundColor: colors.fillSuccessStrong, color: colors.textInverseStrong },
  strong_information: { backgroundColor: colors.fillInformationStrong, color: colors.textInverseStrong },

  // Tones - Moderate
  moderate_neutral: { backgroundColor: colors.fillWeaker, color: colors.textStrong, border: `1px solid ${colors.strokeWeak}` },
  moderate_brand: { backgroundColor: colors.fillBrandWeak, color: colors.textBrand },
  moderate_error: { backgroundColor: colors.fillErrorWeak, color: colors.textError },
  moderate_warning: { backgroundColor: colors.fillWarningWeak, color: colors.textWarning },
  moderate_success: { backgroundColor: colors.fillSuccessWeak, color: colors.textSuccess },
  moderate_information: { backgroundColor: colors.fillInformationWeak, color: colors.textInformation },

  // Tones - Weak
  weak_neutral: { backgroundColor: colors.fillWeak, color: colors.textWeak },
  weak_brand: { backgroundColor: colors.fillWeak, color: colors.textBrand },
  weak_error: { backgroundColor: colors.fillWeak, color: colors.textError },
  weak_warning: { backgroundColor: colors.fillWeak, color: colors.textWarning },
  weak_success: { backgroundColor: colors.fillWeak, color: colors.textSuccess },
  weak_information: { backgroundColor: colors.fillWeak, color: colors.textInformation },
});
