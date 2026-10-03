import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Typography.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

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

export interface TypographyProps extends React.ComponentPropsWithoutRef<'p'> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  color?: TypographyColor;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  stylex?: stylex.StyleXStyles;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'bodyMd',
      as,
      color,
      align,
      weight,
      stylex: stylexProp,
      className,
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

    return (
      <Component 
        ref={ref as any} 
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.base,
            styles[variant],
            styles[finalColor],
            align && styles[align],
            weight && styles[weight],
            stylexProp
          ),
          className,
          style
        )}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';
