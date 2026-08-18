import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './IconContainer.stylex';

export interface IconContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
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
  style?: stylex.StyleXStyles;
}

export const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(({
  tone = 'neutral',
  variant = 'filled',
  shape = 'circle',
  size = 'md',
  style,
  children,
  ...props
}, ref) => {
  
  const variantKey = `${variant}_${tone}` as keyof typeof styles;
  
  return (
    <div
      ref={ref}
      {...props}
      {...stylex.props(
        styles.root,
        styles[`size_${size}`],
        styles[`shape_${shape}`],
        styles[variantKey],
        style
      )}
    >
      {children}
    </div>
  );
});

IconContainer.displayName = 'IconContainer';
