import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Progress.stylex';

export interface ProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'style'> {
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
  style?: stylex.StyleXStyles;
  
  /**
   * StyleX override for the Progress root itself (the track).
   */
  trackStyle?: stylex.StyleXStyles;

  /**
   * StyleX override for the Progress indicator (the bar).
   */
  indicatorStyle?: stylex.StyleXStyles;
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ value = 0, showLabel = false, style, trackStyle, indicatorStyle, ...props }, ref) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const offset = 100 - clampedValue;

  const progressNode = (
    <ProgressPrimitive.Root
      ref={ref}
      value={clampedValue}
      {...props}
      {...stylex.props(styles.root, trackStyle)}
    >
      <ProgressPrimitive.Indicator
        {...stylex.props(styles.indicator, styles.indicatorDynamic(offset), indicatorStyle)}
      />
    </ProgressPrimitive.Root>
  );

  if (showLabel) {
    return (
      <div {...stylex.props(styles.container, style)}>
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
      {...stylex.props(styles.root, trackStyle, style)}
    >
      <ProgressPrimitive.Indicator
        {...stylex.props(styles.indicator, styles.indicatorDynamic(offset), indicatorStyle)}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;
