import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './BadgeCount.stylex';

export type BadgeCountTone = 'neutral' | 'brand' | 'error' | 'warning' | 'success' | 'information';
export type BadgeCountEmphasis = 'strong' | 'moderate' | 'weak';
export type BadgeCountSize = 'small' | 'medium' | 'large';

export interface BadgeCountProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> {
  /**
   * The number to display in the badge
   */
  count: number;
  /**
   * The visual emphasis level
   * @default 'strong'
   */
  emphasis?: BadgeCountEmphasis;
  /**
   * The semantic color tone of the badge
   * @default 'error'
   */
  tone?: BadgeCountTone;
  /**
   * The size of the badge
   * @default 'medium'
   */
  size?: BadgeCountSize;
  /**
   * Maximum number to display. If count is greater, it will show as max+ (e.g., 99+)
   * @default 99
   */
  max?: number;
  /**
   * Whether to show a zero count. If false and count is 0, nothing is rendered.
   * @default false
   */
  showZero?: boolean;
  style?: stylex.StyleXStyles;
}

const BadgeCountRoot = forwardRef<HTMLSpanElement, BadgeCountProps>(
  ({ count, emphasis = 'strong', tone = 'error', size = 'medium', max = 99, showZero = false, style, ...props }, ref) => {
    if (count === 0 && !showZero) {
      return null;
    }

    const displayCount = count > max ? `${max}+` : count;

    const sizeStyle = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    const toneStyle = styles[`${emphasis}_${tone}` as keyof typeof styles];

    const resolved = stylex.props(
      styles.root,
      sizeStyle,
      toneStyle,
      style
    );

    return (
      <span
        ref={ref}
        className={resolved.className}
        style={resolved.style}
        {...props}
      >
        {displayCount}
      </span>
    );
  }
);

BadgeCountRoot.displayName = 'BadgeCount';

export const BadgeCount = Object.assign(BadgeCountRoot, {});
