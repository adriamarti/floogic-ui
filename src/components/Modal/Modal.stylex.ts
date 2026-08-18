import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens/colors.stylex';
import { elevation } from '../../tokens/elevation.stylex';
import { durations, easings } from '../../tokens/motion.stylex';
import { spacing } from '../../tokens/spacing.stylex';
import { borders } from '../../tokens/borders.stylex';
import { shape } from '../../tokens/shape.stylex';

const MOBILE = '@media (max-width: 767px)';

const overlayShow = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const contentShow = stylex.keyframes({
  from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
  to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const slideUp = stylex.keyframes({
  from: { transform: 'translateY(100%)' },
  to: { transform: 'translateY(0)' },
});

export const styles = stylex.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    animationName: overlayShow,
    animationDuration: durations.base,
    animationTimingFunction: easings.standard,
  },
  content: {
    backgroundColor: colors.backgroundOverlay,
    position: 'fixed',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: elevation.elev3,
    
    // Desktop styles (centered modal)
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: shape.radiusLg,
    maxHeight: '85vh',
    animationName: contentShow,
    animationDuration: durations.base,
    animationTimingFunction: easings.decelerate,
  },

  // Size Variants
  sizeSmall: {
    width: '400px',
    maxWidth: '90vw',
  },
  sizeMedium: {
    width: '600px',
    maxWidth: '90vw',
  },
  sizeLarge: {
    width: '800px',
    maxWidth: '90vw',
  },

  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: `${spacing.space4} ${spacing.space5}`,
    borderBottomStyle: 'solid',
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.strokeWeak,
    flexShrink: 0,
    gap: spacing.space4,
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: spacing.space5,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Usually modals have actions on the right
    gap: spacing.space3,
    padding: `${spacing.space4} ${spacing.space5}`,
    borderTopStyle: 'solid',
    borderTopWidth: borders.hairline,
    borderTopColor: colors.strokeWeak,
    flexShrink: 0,
  }
});
