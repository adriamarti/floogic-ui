import React, { forwardRef } from 'react';
import { Button, ButtonProps } from '../Button';

import * as stylex from '@stylexjs/stylex';

export interface IconButtonProps extends Omit<ButtonProps, 'iconOnly' | 'children'> {
  children: React.ReactNode;
  'aria-label': string; // Enforce aria-label for accessibility since there's no visible text label
  style?: stylex.StyleXStyles;
}

/**
 * IconButton
 *
 * A specialized Button that only contains an icon. It renders as a perfect square
 * and requires an aria-label for accessibility.
 *
 * @example
 * <IconButton aria-label="Close" variant="tertiary" tone="neutral">
 *   <svg>...</svg>
 * </IconButton>
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <Button ref={ref} iconOnly={true} aria-label={ariaLabel} {...props}>
        <Button.Icon>{children}</Button.Icon>
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';
