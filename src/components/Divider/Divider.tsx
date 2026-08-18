import React, { forwardRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Divider.stylex';

export interface DividerProps extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, 'className' | 'style'> {
  /**
   * The visual type of the divider.
   * @default 'weak'
   */
  type?: 'weak' | 'strong';
  /**
   * StyleX style prop.
   */
  style?: stylex.StyleXStyles;
}

/**
 * Divider
 *
 * A thin line used to separate or group related content.
 *
 * @example
 * <Divider type="weak" />
 */
export const Divider = forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, DividerProps>(
  ({ type = 'weak', orientation = 'horizontal', decorative = true, style, ...props }, ref) => {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        orientation={orientation}
        decorative={decorative}
        {...stylex.props(
          styles.root,
          orientation === 'horizontal' ? styles.horizontal : styles.vertical,
          type === 'weak' ? styles.weak : styles.strong,
          style
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';
