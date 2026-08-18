import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { shape } from '../../tokens/shape.stylex';
import { borders } from '../../tokens/borders.stylex';
import { spacing } from '../../tokens/spacing.stylex';

export const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderWidth: borders.hairline,
    borderStyle: 'solid',
  },
  
  // -- Sizes --
  size_sm: {
    width: spacing.space8,
    height: spacing.space8,
  },
  size_md: {
    width: spacing.space10,
    height: spacing.space10,
  },
  size_lg: {
    width: spacing.space12,
    height: spacing.space12,
  },

  // -- Shapes --
  shape_circle: {
    borderRadius: shape.radiusFull,
  },
  shape_square: {
    borderRadius: shape.radiusMd,
  },

  // -- Variants & Tones --

  // FILLED
  filled_neutral: {
    backgroundColor: colors.fillWeak,
    borderColor: 'transparent',
    color: colors.iconNeutral,
  },
  filled_brand: {
    backgroundColor: colors.fillBrandWeak,
    borderColor: 'transparent',
    color: colors.iconBrand,
  },
  filled_destructive: {
    backgroundColor: colors.fillErrorWeak,
    borderColor: 'transparent',
    color: colors.iconError,
  },
  filled_warning: {
    backgroundColor: colors.fillWarningWeak,
    borderColor: 'transparent',
    color: colors.iconWarning,
  },
  filled_success: {
    backgroundColor: colors.fillSuccessWeak,
    borderColor: 'transparent',
    color: colors.iconSuccess,
  },
  filled_information: {
    backgroundColor: colors.fillInformationWeak,
    borderColor: 'transparent',
    color: colors.iconInformation,
  },

  // STROKED
  stroked_neutral: {
    backgroundColor: 'transparent',
    borderColor: colors.strokeWeak,
    color: colors.iconNeutral,
  },
  stroked_brand: {
    backgroundColor: 'transparent',
    borderColor: colors.strokeBrandWeak,
    color: colors.iconBrand,
  },
  stroked_destructive: {
    backgroundColor: 'transparent',
    borderColor: colors.strokeErrorWeak,
    color: colors.iconError,
  },
  stroked_warning: {
    backgroundColor: 'transparent',
    borderColor: colors.strokeWarningWeak,
    color: colors.iconWarning,
  },
  stroked_success: {
    backgroundColor: 'transparent',
    borderColor: colors.strokeSuccessWeak,
    color: colors.iconSuccess,
  },
  stroked_information: {
    backgroundColor: 'transparent',
    borderColor: colors.strokeInformationWeak,
    color: colors.iconInformation,
  },

  // GHOST
  ghost_neutral: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: colors.iconNeutral,
  },
  ghost_brand: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: colors.iconBrand,
  },
  ghost_destructive: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: colors.iconError,
  },
  ghost_warning: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: colors.iconWarning,
  },
  ghost_success: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: colors.iconSuccess,
  },
  ghost_information: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: colors.iconInformation,
  },
});
