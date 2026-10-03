import React, { createContext, useContext, forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles, iconColorStyles } from './AlertGlobal.stylex';
import { IconButton, IconButtonProps } from '../IconButton';
import { mergeStyles } from '../../utils/mergeStyles';

export type AlertGlobalTone = 'error' | 'warning' | 'success' | 'information' | 'neutral' | 'brand' | 'inverse-neutral' | 'inverse-brand';
export type AlertGlobalVariant = 'solid' | 'transparent';

export interface AlertGlobalProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
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
  ({ children, tone = 'neutral', variant = 'solid', stylex: stylexProp, className, style, role = 'alert', ...props }, ref) => {
    // Map tone to stylex key format
    let toneKey = tone as string;
    if (tone === 'inverse-neutral') toneKey = 'inverseNeutral';
    if (tone === 'inverse-brand') toneKey = 'inverseBrand';

    const variantToneKey = `${variant}_${toneKey}` as keyof typeof styles;

    return (
      <AlertGlobalContext.Provider value={{ tone, variant }}>
        <div
          ref={ref}
          role={role}
          {...props}
          {...mergeStyles(stylex.props(styles.root, styles[variantToneKey], stylexProp), className, style)}
        >
          {children}
        </div>
      </AlertGlobalContext.Provider>
    );
  }
);
AlertGlobalRoot.displayName = 'AlertGlobal';

// Sub-components

export interface AlertGlobalIconProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

const AlertGlobalIcon = forwardRef<HTMLDivElement, AlertGlobalIconProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const { tone } = useAlertGlobalContext();
    return (
      <div
        ref={ref}
        aria-hidden="true"
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.iconContainer, 
            iconColorStyles[tone],
            stylexProp
          ),
          className,
          style
        )}
      >
        {children}
      </div>
    );
  }
);
AlertGlobalIcon.displayName = 'AlertGlobal.Icon';

export interface AlertGlobalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

const AlertGlobalContent = forwardRef<HTMLDivElement, AlertGlobalContentProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.content, stylexProp), className, style)}
      >
        {children}
      </div>
    );
  }
);
AlertGlobalContent.displayName = 'AlertGlobal.Content';

export interface AlertGlobalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  stylex?: stylex.StyleXStyles;
}

const AlertGlobalDescription = forwardRef<HTMLParagraphElement, AlertGlobalDescriptionProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <p 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.description, stylexProp), className, style)}
      >
        {children}
      </p>
    );
  }
);
AlertGlobalDescription.displayName = 'AlertGlobal.Description';

export interface AlertGlobalActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

const AlertGlobalActions = forwardRef<HTMLDivElement, AlertGlobalActionsProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.actions, stylexProp), className, style)}
      >
        {children}
      </div>
    );
  }
);
AlertGlobalActions.displayName = 'AlertGlobal.Actions';

export interface AlertGlobalCloseButtonProps extends Partial<IconButtonProps> {
  'aria-label': string;
  stylex?: stylex.StyleXStyles;
}

const AlertGlobalCloseButton = forwardRef<HTMLButtonElement, AlertGlobalCloseButtonProps>(
  ({ stylex: stylexProp, variant = 'tertiary', size = 'small', children, 'aria-label': ariaLabel, className, style, ...props }, ref) => {
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
          type="button"
          variant={variant}
          tone={buttonTone}
          size={size}
          stylex={stylexProp}
          className={className}
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
