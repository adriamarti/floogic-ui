import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { shape } from '../../tokens/shape.stylex';
import { borders } from '../../tokens/borders.stylex';

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
    width: '32px',
    height: '32px',
  },
  size_md: {
    width: '40px',
    height: '40px',
  },
  size_lg: {
    width: '48px',
    height: '48px',
  },

  // -- Shapes --
  shape_circle: {
    borderRadius: '50%',
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
