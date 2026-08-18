import * as stylex from '@stylexjs/stylex';
import React, { forwardRef } from 'react';
import { styles } from './Button.stylex';

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

export interface ButtonLabelProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const ButtonLabel = forwardRef<HTMLSpanElement, ButtonLabelProps>(
  ({ style, ...props }, ref) => {
    const resolved = stylex.props(styles.label, style);
    return (
      <span 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
ButtonLabel.displayName = 'Button.Label';

export interface ButtonIconProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const ButtonIcon = forwardRef<HTMLSpanElement, ButtonIconProps>(
  ({ style, ...props }, ref) => {
    const resolved = stylex.props(styles.icon, style);
    return (
      <span 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
ButtonIcon.displayName = 'Button.Icon';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

import { ButtonGroupContext } from '../ButtonGroup';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  tone?: 'brand' | 'neutral' | 'destructive' | 'inverse';
  size?: 'small' | 'medium' | 'large';
  iconOnly?: boolean;
  style?: stylex.StyleXStyles;
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
  ({ variant = 'primary', tone = 'brand', size = 'medium', iconOnly = false, style, children, ...props }, ref) => {
    
    const inGroup = React.useContext(ButtonGroupContext);

    // Resolve dynamic styles based on variant and tone
    const typeStyle = styles[variant];
    const toneStyle = styles[`${variant}_${tone}` as keyof typeof styles];
    const sizeStyle = styles[size];
    const iconOnlyStyle = iconOnly ? styles[`iconOnly_${size}` as keyof typeof styles] : null;
    const groupStyle = inGroup ? styles.inGroup : null;

    const resolved = stylex.props(
      styles.root,
      typeStyle,
      toneStyle,
      sizeStyle,
      iconOnlyStyle,
      groupStyle,
      style
    );

    return (
      <ButtonContext.Provider value={{ size, tone }}>
        <button
          ref={ref}
          className={resolved.className}
          style={resolved.style}
          {...props}
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
