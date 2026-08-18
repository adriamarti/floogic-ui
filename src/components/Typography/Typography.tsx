import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Typography.stylex';

type TypographyVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'bodyLg' | 'body' | 'caption';
type TypographyColor = 'strong' | 'weak' | 'brand' | 'disabled' | 'error' | 'warning' | 'success' | 'inverseStrong' | 'inverseWeak';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
type TypographyWeight = 'regular' | 'medium' | 'semiBold';

const defaultTags: Record<TypographyVariant, React.ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  bodyLg: 'p',
  body: 'p',
  caption: 'span',
};

// Omitting className and style to strictly enforce StyleX usage
export interface TypographyProps extends Omit<React.ComponentPropsWithoutRef<'p'>, 'className' | 'style'> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  color?: TypographyColor;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  style?: stylex.StyleXStyles;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body',
      as,
      color,
      align,
      weight,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || defaultTags[variant];

    // Determine default color based on variant if not explicitly provided
    let finalColor = color;
    if (!finalColor) {
      const isHeading = variant === 'display' || variant.startsWith('h');
      finalColor = isHeading ? 'strong' : 'weak';
    }

    const resolved = stylex.props(
      styles.root,
      styles[variant],
      styles[finalColor],
      align && styles[align],
      weight && styles[weight],
      style
    );

    return (
      <Component ref={ref as any} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';
