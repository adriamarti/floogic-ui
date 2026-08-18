import React, { createContext, useContext, forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles, iconColorStyles } from './AlertGlobal.stylex';
import { IconButton, IconButtonProps } from '../IconButton';

export type AlertGlobalTone = 'error' | 'warning' | 'success' | 'information' | 'neutral' | 'brand' | 'inverse-neutral' | 'inverse-brand';
export type AlertGlobalVariant = 'solid' | 'transparent';

export interface AlertGlobalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  tone?: AlertGlobalTone;
  variant?: AlertGlobalVariant;
}

interface AlertGlobalContextValue {
  tone: AlertGlobalTone;
  variant: AlertGlobalVariant;
}

const AlertGlobalContext = createContext<AlertGlobalContextValue | undefined>(undefined);

const useAlertGlobalContext = () => {
  const context = useContext(AlertGlobalContext);
  if (!context) {
    throw new Error('AlertGlobal components must be used within an <AlertGlobal>');
  }
  return context;
};

// Root Component
const AlertGlobalRoot = forwardRef<HTMLDivElement, AlertGlobalProps>(
  ({ children, tone = 'neutral', variant = 'solid', style, ...props  }, ref) => {
    
    // Map tone to stylex key format
    let toneKey = tone as string;
    if (tone === 'inverse-neutral') toneKey = 'inverseNeutral';
    if (tone === 'inverse-brand') toneKey = 'inverseBrand';

    const variantToneKey = `${variant}_${toneKey}` as keyof typeof styles;
    const resolved = stylex.props(styles.root, styles[variantToneKey], style);

    return (
      <AlertGlobalContext.Provider value={{ tone, variant }}>
        <div
          ref={ref}
          className={resolved.className}
          style={resolved.style}
          {...props}
          role="alert"
        >
          {children}
        </div>
      </AlertGlobalContext.Provider>
    );
  }
);
AlertGlobalRoot.displayName = 'AlertGlobal';

// Sub-components

export interface AlertGlobalIconProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> { style?: stylex.StyleXStyles; }
const AlertGlobalIcon = forwardRef<HTMLDivElement, AlertGlobalIconProps>(
  ({ children, style, ...props  }, ref) => {
    const { tone } = useAlertGlobalContext();
    const resolved = stylex.props(
      styles.iconContainer, 
      iconColorStyles[tone],
      style
    );
    return (
      <div
        ref={ref}
        className={resolved.className}
        style={resolved.style}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AlertGlobalIcon.displayName = 'AlertGlobal.Icon';

export interface AlertGlobalContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> { style?: stylex.StyleXStyles; }
const AlertGlobalContent = forwardRef<HTMLDivElement, AlertGlobalContentProps>(
  ({ children, style, ...props  }, ref) => {
    const resolved = stylex.props(styles.content, style);
    return (
      <div ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </div>
    );
  }
);
AlertGlobalContent.displayName = 'AlertGlobal.Content';

export interface AlertGlobalDescriptionProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'className' | 'style'> { style?: stylex.StyleXStyles; }
const AlertGlobalDescription = forwardRef<HTMLParagraphElement, AlertGlobalDescriptionProps>(
  ({ children, style, ...props  }, ref) => {
    const resolved = stylex.props(styles.description, style);
    return (
      <div ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </div>
    );
  }
);
AlertGlobalDescription.displayName = 'AlertGlobal.Description';

export interface AlertGlobalActionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> { style?: stylex.StyleXStyles; }
const AlertGlobalActions = forwardRef<HTMLDivElement, AlertGlobalActionsProps>(
  ({ children, style, ...props  }, ref) => {
    const resolved = stylex.props(styles.actions, style);
    return (
      <div ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </div>
    );
  }
);
AlertGlobalActions.displayName = 'AlertGlobal.Actions';

export interface AlertGlobalCloseButtonProps extends Omit<Partial<IconButtonProps>, 'className' | 'style'> {
  'aria-label': string;
  style?: stylex.StyleXStyles;
}

const AlertGlobalCloseButton = forwardRef<HTMLButtonElement, AlertGlobalCloseButtonProps>(
  ({ style, variant = 'tertiary', size = 'small', children, 'aria-label': ariaLabel, ...props  }, ref) => {
    const { tone } = useAlertGlobalContext();
    
    // Map alert tone to IconButton tone
    let buttonTone: IconButtonProps['tone'] = 'neutral';
    if (tone === 'inverse-neutral' || tone === 'inverse-brand') {
      buttonTone = 'inverse';
    }

    return (
      <div {...stylex.props(styles.closeButtonContainer)}>
        <IconButton
          ref={ref}
          variant={variant}
          tone={buttonTone}
          size={size}
          style={style}
          aria-label={ariaLabel}
          {...props}
        >
          {children || (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          )}
        </IconButton>
      </div>
    );
  }
);
AlertGlobalCloseButton.displayName = 'AlertGlobal.CloseButton';

// Attach sub-components
export const AlertGlobal = Object.assign(AlertGlobalRoot, {
  Icon: AlertGlobalIcon,
  Content: AlertGlobalContent,
  Description: AlertGlobalDescription,
  Actions: AlertGlobalActions,
  CloseButton: AlertGlobalCloseButton,
});
