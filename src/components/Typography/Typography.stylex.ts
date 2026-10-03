import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { fonts, fontSizes, fontWeights, lineHeights, letterSpacings } from '../../tokens/typography.stylex';

export const styles = stylex.create({
  // Base Reset
  base: {
    margin: 0,
    padding: 0,
  },

  // Alignments
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  justify: { textAlign: 'justify' },

  // Weights
  extraLight: { fontWeight: fontWeights.extraLight },
  regular: { fontWeight: fontWeights.regular },
  medium: { fontWeight: fontWeights.medium },
  semiBold: { fontWeight: fontWeights.semiBold },
  bold: { fontWeight: fontWeights.bold },
  black: { fontWeight: fontWeights.black },

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

  // Display Variants (Source Serif 4)
  displayLg: {
    fontFamily: fonts.serif,
    fontSize: fontSizes.displayLg,
    lineHeight: lineHeights.displayLg,
    letterSpacing: letterSpacings.displayLg,
    fontWeight: fontWeights.regular,
  },
  displayMd: {
    fontFamily: fonts.serif,
    fontSize: fontSizes.displayMd,
    lineHeight: lineHeights.displayMd,
    letterSpacing: letterSpacings.displayMd,
    fontWeight: fontWeights.regular,
  },
  displaySm: {
    fontFamily: fonts.serif,
    fontSize: fontSizes.displaySm,
    lineHeight: lineHeights.displaySm,
    letterSpacing: letterSpacings.displaySm,
    fontWeight: fontWeights.regular,
  },

  // Heading Variants (Source Sans 3)
  h1: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h1,
    lineHeight: lineHeights.h1,
    letterSpacing: letterSpacings.h1,
    fontWeight: fontWeights.regular,
  },
  h2: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.h2,
    lineHeight: lineHeights.h2,
    letterSpacing: letterSpacings.h2,
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

  // Body Variants (Source Sans 3)
  bodyLg: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyLg,
    lineHeight: lineHeights.bodyLg,
    fontWeight: fontWeights.regular,
  },
  bodyMd: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyMd,
    lineHeight: lineHeights.bodyMd,
    fontWeight: fontWeights.regular,
  },
  bodySm: {
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodySm,
    lineHeight: lineHeights.bodySm,
    fontWeight: fontWeights.regular,
  },

  // Caption Variants (Source Code Pro - Mono)
  captionLg: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.captionLg,
    lineHeight: lineHeights.captionLg,
    letterSpacing: letterSpacings.caption,
    fontWeight: fontWeights.regular,
  },
  captionMd: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.captionMd,
    lineHeight: lineHeights.captionMd,
    letterSpacing: letterSpacings.caption,
    fontWeight: fontWeights.regular,
  },
  captionSm: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.captionSm,
    lineHeight: lineHeights.captionSm,
    letterSpacing: letterSpacings.caption,
    fontWeight: fontWeights.regular,
  },
});
