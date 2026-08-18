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
  // Clamp value between 0 and 100 to ensure valid transform
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const progressNode = (
    <ProgressPrimitive.Root
      ref={ref}
      value={clampedValue}
      {...props}
      {...stylex.props(styles.root, trackStyle)}
    >
      <ProgressPrimitive.Indicator
        {...stylex.props(styles.indicator, indicatorStyle)}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
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

  // If there's no label but a style was passed, we wrap it in a container
  // to allow setting width/margin consistently, or we apply it to the root if we want.
  // We'll apply the outer style to the root if no label.
  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={clampedValue}
      {...props}
      {...stylex.props(styles.root, trackStyle, style)}
    >
      <ProgressPrimitive.Indicator
        {...stylex.props(styles.indicator, indicatorStyle)}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;
