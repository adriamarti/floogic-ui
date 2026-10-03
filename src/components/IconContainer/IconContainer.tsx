import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './IconContainer.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

export interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 
   * Semantic tone of the container.
   * @default 'neutral'
   */
  tone?: 'neutral' | 'brand' | 'destructive' | 'warning' | 'success' | 'information';
  
  /** 
   * Visual style variant.
   * @default 'filled'
   */
  variant?: 'filled' | 'stroked' | 'ghost';

  /** 
   * The container shape.
   * @default 'circle'
   */
  shape?: 'circle' | 'square';
  
  /**
   * The size of the container.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Extensible styles via StyleX
   */
  stylex?: stylex.StyleXStyles;
}

export const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(({
  tone = 'neutral',
  variant = 'filled',
  shape = 'circle',
  size = 'md',
  stylex: stylexProp,
  className,
  style,
  children,
  ...props
}, ref) => {
  const variantKey = `${variant}_${tone}` as keyof typeof styles;
  
  return (
    <div
      ref={ref}
      aria-hidden="true"
      {...props}
      {...mergeStyles(
        stylex.props(
          styles.root,
          styles[`size_${size}`],
          styles[`shape_${shape}`],
          styles[variantKey],
          stylexProp
        ),
        className,
        style
      )}
    >
      {children}
    </div>
  );
});

IconContainer.displayName = 'IconContainer';
