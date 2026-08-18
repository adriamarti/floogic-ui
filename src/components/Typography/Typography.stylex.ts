import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { fonts, fontSizes, fontWeights, lineHeights, letterSpacings } from '../../tokens/typography.stylex';

export const styles = stylex.create({
  root: {
    margin: 0,
    padding: 0,
  },

  // Alignments
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  justify: { textAlign: 'justify' },

  // Weights
  regular: { fontWeight: fontWeights.regular },
  medium: { fontWeight: fontWeights.medium },
  semiBold: { fontWeight: fontWeights.semiBold },

  // Colors
  strong: { color: colors.textStrong },
  weak: { color: colors.textWeak },
  brand: { color: colors.textBrand },
  disabled: { color: colors.textDisabled },
  error: { color: colors.textError },
  warning: { color: colors.textWarning },
  success: { color: colors.textSuccess },
  inverseStrong: { color: colors.textInverseStrong },
  inverseWeak: { color: colors.textInverseWeak },

  // Variants
  display: {
    fontFamily: fonts.serif,
    fontSize: fontSizes.display,
    lineHeight: lineHeights.display,
    letterSpacing: letterSpacings.display,
    fontWeight: fontWeights.regular,
  },
  h1: {
    fontFamily: fonts.serif,
    fontSize: fontSizes.h1,
    lineHeight: lineHeights.h1,
    letterSpacing: letterSpacings.h1,
    fontWeight: fontWeights.regular,
  },
  h2: {
    fontFamily: fonts.serif,
    fontSize: fontSizes.h2,
    lineHeight: lineHeights.h2,
    fontWeight: fontWeights.regular,
  },
  h3: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h3,
    lineHeight: lineHeights.h3,
    fontWeight: fontWeights.medium,
  },
  h4: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h4,
    lineHeight: lineHeights.h4,
    fontWeight: fontWeights.medium,
  },
  h5: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h5,
    lineHeight: lineHeights.h5,
    fontWeight: fontWeights.medium,
  },
  h6: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h6,
    lineHeight: lineHeights.h6,
    fontWeight: fontWeights.medium,
  },
  bodyLg: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyLg,
    lineHeight: lineHeights.body,
    fontWeight: fontWeights.regular,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    fontWeight: fontWeights.regular,
  },
  caption: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.body, // caption usually uses body line-height or 1.4
    letterSpacing: letterSpacings.caption,
    fontWeight: fontWeights.regular,
  },
});
