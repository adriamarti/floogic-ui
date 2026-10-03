import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Progress.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /**
   * The current progress value (0-100).
   * @default 0
   */
  value?: number;
  
  /**
   * Whether to show the percentage label next to the bar.
   * @default false
   */
  showLabel?: boolean;

  /**
   * StyleX override for the outer container.
   */
  stylex?: stylex.StyleXStyles;
  
  /**
   * StyleX override for the Progress root itself (the track).
   */
  trackStylex?: stylex.StyleXStyles;

  /**
   * StyleX override for the Progress indicator (the bar).
   */
  indicatorStylex?: stylex.StyleXStyles;

  /** @deprecated use trackStylex */
  trackStyle?: stylex.StyleXStyles;
  /** @deprecated use indicatorStylex */
  indicatorStyle?: stylex.StyleXStyles;
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ value = 0, showLabel = false, stylex: stylexProp, trackStylex, indicatorStylex, trackStyle, indicatorStyle, className, style, ...props }, ref) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const offset = 100 - clampedValue;

  const finalTrackStylex = trackStylex ?? trackStyle;
  const finalIndicatorStylex = indicatorStylex ?? indicatorStyle;

  const progressNode = (
    <ProgressPrimitive.Root
      ref={ref}
      value={clampedValue}
      {...props}
      {...stylex.props(styles.root, finalTrackStylex)}
    >
      <ProgressPrimitive.Indicator
        {...stylex.props(styles.indicator, styles.indicatorDynamic(offset), finalIndicatorStylex)}
      />
    </ProgressPrimitive.Root>
  );

  if (showLabel) {
    return (
      <div 
        {...mergeStyles(stylex.props(styles.container, stylexProp), className, style)}
      >
        {progressNode}
        <span aria-hidden="true" {...stylex.props(styles.label)}>
          {clampedValue}%
        </span>
      </div>
    );
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={clampedValue}
      {...props}
      {...mergeStyles(stylex.props(styles.root, finalTrackStylex, stylexProp), className, style)}
    >
      <ProgressPrimitive.Indicator
        {...stylex.props(styles.indicator, styles.indicatorDynamic(offset), finalIndicatorStylex)}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;
