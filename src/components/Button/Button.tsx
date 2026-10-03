import * as stylex from '@stylexjs/stylex';
import React, { forwardRef } from 'react';
import { styles } from './Button.stylex';
import { ButtonGroupContext } from '../ButtonGroup';
import { mergeStyles } from '../../utils/mergeStyles';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface ButtonContextValue {
  size: 'small' | 'medium' | 'large';
  tone: 'brand' | 'neutral' | 'destructive' | 'inverse';
}

const ButtonContext = React.createContext<ButtonContextValue>({ size: 'medium', tone: 'neutral' });

export function useButtonContext() {
  return React.useContext(ButtonContext);
}

// ---------------------------------------------------------------------------
// Sub-components (Button.Label, Button.Icon)
// ---------------------------------------------------------------------------

export interface ButtonLabelProps extends React.ComponentPropsWithoutRef<'span'> {
  stylex?: stylex.StyleXStyles;
}

const ButtonLabel = forwardRef<HTMLSpanElement, ButtonLabelProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <span 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.label, stylexProp), className, style)}
      />
    );
  }
);
ButtonLabel.displayName = 'Button.Label';

export interface ButtonIconProps extends React.ComponentPropsWithoutRef<'span'> {
  stylex?: stylex.StyleXStyles;
}

const ButtonIcon = forwardRef<HTMLSpanElement, ButtonIconProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <span 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.icon, stylexProp), className, style)}
      />
    );
  }
);
ButtonIcon.displayName = 'Button.Icon';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  tone?: 'brand' | 'neutral' | 'destructive' | 'inverse';
  size?: 'small' | 'medium' | 'large';
  iconOnly?: boolean;
  stylex?: stylex.StyleXStyles;
}

/**
 * Button
 *
 * Used to trigger actions. The button type should indicate the importance of the action.
 *
 * @example
 * <Button variant="primary" tone="brand">
 *   <Button.Icon>...</Button.Icon>
 *   <Button.Label>Label</Button.Label>
 * </Button>
 */
const ButtonRoot = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'button', variant = 'primary', tone = 'brand', size = 'medium', iconOnly = false, stylex: stylexProp, className, style, children, ...props }, ref) => {
    const inGroup = React.useContext(ButtonGroupContext);

    return (
      <ButtonContext.Provider value={{ size, tone }}>
        <button
          ref={ref}
          type={type}
          {...props}
          {...mergeStyles(
            stylex.props(
              styles.root,
              styles[variant],
              styles[`${variant}_${tone}` as keyof typeof styles],
              styles[size],
              iconOnly && styles[`iconOnly_${size}` as keyof typeof styles],
              inGroup && styles.inGroup,
              stylexProp
            ),
            className,
            style
          )}
        >
          {children}
        </button>
      </ButtonContext.Provider>
    );
  }
);
ButtonRoot.displayName = 'Button';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Button = Object.assign(ButtonRoot, {
  Label: ButtonLabel,
  Icon: ButtonIcon,
});
