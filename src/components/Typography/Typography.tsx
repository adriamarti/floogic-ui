import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Typography.stylex';

export type TypographyVariant =
  | 'displayLg'
  | 'displayMd'
  | 'displaySm'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'bodyLg'
  | 'bodyMd'
  | 'bodySm'
  | 'captionLg'
  | 'captionMd'
  | 'captionSm';

export type TypographyColor =
  | 'strong'
  | 'weak'
  | 'brand'
  | 'disabled'
  | 'error'
  | 'warning'
  | 'success'
  | 'inverseStrong'
  | 'inverseWeak';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export type TypographyWeight =
  | 'extraLight'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'black';

const defaultTags: Record<TypographyVariant, React.ElementType> = {
  displayLg: 'h1',
  displayMd: 'h1',
  displaySm: 'h2',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  bodyLg: 'p',
  bodyMd: 'p',
  bodySm: 'p',
  captionLg: 'span',
  captionMd: 'span',
  captionSm: 'span',
};

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
      variant = 'bodyMd',
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

    let finalColor = color;
    if (!finalColor) {
      const isHeading = variant.startsWith('display') || variant.startsWith('h');
      finalColor = isHeading ? 'strong' : 'weak';
    }

    const resolved = stylex.props(
      styles.base,
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
