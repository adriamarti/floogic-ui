import React, { forwardRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Divider.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

export interface DividerProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /**
   * The visual type of the divider.
   * @default 'weak'
   */
  type?: 'weak' | 'strong';
  /**
   * StyleX style prop.
   */
  stylex?: stylex.StyleXStyles;
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
  ({ type = 'weak', orientation = 'horizontal', decorative = true, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        orientation={orientation}
        decorative={decorative}
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.root,
            orientation === 'horizontal' ? styles.horizontal : styles.vertical,
            type === 'weak' ? styles.weak : styles.strong,
            stylexProp
          ),
          className,
          style
        )}
      />
    );
  }
);
Divider.displayName = 'Divider';
