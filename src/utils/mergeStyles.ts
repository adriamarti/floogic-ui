import type React from 'react';

/**
 * Merges StyleX compiled properties with consumer-provided `className` and inline `style`.
 * Allows consumers to override or augment component styling using standard CSS classes or inline styles,
 * while retaining the base StyleX rules.
 */
export function mergeStyles(
  sxProps: { className?: string; style?: React.CSSProperties } | undefined,
  className?: string,
  style?: React.CSSProperties
): { className?: string; style?: React.CSSProperties } {
  if (!sxProps) {
    return {
      className,
      style,
    };
  }

  const mergedClassName = sxProps.className
    ? className
      ? `${sxProps.className} ${className}`
      : sxProps.className
    : className;

  const mergedStyle =
    sxProps.style || style
      ? { ...sxProps.style, ...style }
      : undefined;

  return {
    className: mergedClassName,
    style: mergedStyle,
  };
}
