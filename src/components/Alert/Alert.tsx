import React, { createContext, useContext, forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles, iconColorStyles, borderLeftColorStyles } from './Alert.stylex';
import { IconButton, IconButtonProps } from '../IconButton';

export type AlertTone = 'error' | 'warning' | 'success' | 'information' | 'neutral' | 'brand' | 'inverse-neutral' | 'inverse-brand';
export type AlertLayout = 'vertical' | 'horizontal';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  tone?: AlertTone;
  layout?: AlertLayout;
  borderLeft?: boolean;
}

interface AlertContextValue {
  tone: AlertTone;
  layout: AlertLayout;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('Alert components must be used within an <Alert>');
  }
  return context;
};

// Root Component
const AlertRoot = forwardRef<HTMLDivElement, AlertProps>(
  ({ children, tone = 'neutral', layout = 'vertical', borderLeft = false, style, ...props  }, ref) => {
    const resolved = stylex.props(
      styles.root,
      layout === 'horizontal' ? styles.layoutHorizontal : styles.layoutVertical,
      tone === 'error' && styles.toneError,
      tone === 'warning' && styles.toneWarning,
      tone === 'success' && styles.toneSuccess,
      tone === 'information' && styles.toneInformation,
      tone === 'neutral' && styles.toneNeutral,
      tone === 'brand' && styles.toneBrand,
      tone === 'inverse-neutral' && styles.toneInverseNeutral,
      tone === 'inverse-brand' && styles.toneInverseBrand,
      borderLeft && styles.borderLeft,
      borderLeft && borderLeftColorStyles[tone],
      style
    );
    return (
      <AlertContext.Provider value={{ tone, layout }}>
        <div
          ref={ref}
          className={resolved.className}
          style={resolved.style}
          {...props}
          role="alert"
        >
          {children}
        </div>
      </AlertContext.Provider>
    );
  }
);
AlertRoot.displayName = 'Alert';

// Sub-components

export interface AlertIconProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> { style?: stylex.StyleXStyles; }
const AlertIcon = forwardRef<HTMLDivElement, AlertIconProps>(
  ({ children, style, ...props  }, ref) => {
    const { tone, layout } = useAlertContext();
    const resolved = stylex.props(
      styles.iconContainer, 
      iconColorStyles[tone],
      layout === 'horizontal' && styles.iconContainerHorizontal,
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
AlertIcon.displayName = 'Alert.Icon';

export interface AlertContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> { style?: stylex.StyleXStyles; }
const AlertContent = forwardRef<HTMLDivElement, AlertContentProps>(
  ({ children, style, ...props  }, ref) => {
    const resolved = stylex.props(styles.content, style);
    return (
      <div ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </div>
    );
  }
);
AlertContent.displayName = 'Alert.Content';

export interface AlertHeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className' | 'style'> { style?: stylex.StyleXStyles; }
const AlertHeading = forwardRef<HTMLHeadingElement, AlertHeadingProps>(
  ({ children, style, ...props  }, ref) => {
    const resolved = stylex.props(styles.heading, style);
    return (
      <h5 ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </h5>
    );
  }
);
AlertHeading.displayName = 'Alert.Heading';

export interface AlertDescriptionProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'className' | 'style'> { style?: stylex.StyleXStyles; }
const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ children, style, ...props  }, ref) => {
    const resolved = stylex.props(styles.description, style);
    return (
      <div ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </div>
    );
  }
);
AlertDescription.displayName = 'Alert.Description';

export interface AlertActionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> { style?: stylex.StyleXStyles; }
const AlertActions = forwardRef<HTMLDivElement, AlertActionsProps>(
  ({ children, style, ...props  }, ref) => {
    const resolved = stylex.props(styles.actions, style);
    return (
      <div ref={ref} className={resolved.className} style={resolved.style} {...props}>
        {children}
      </div>
    );
  }
);
AlertActions.displayName = 'Alert.Actions';

export interface AlertCloseButtonProps extends Omit<Partial<IconButtonProps>, 'className' | 'style'> {
  'aria-label': string;
  style?: stylex.StyleXStyles;
}

const AlertCloseButton = forwardRef<HTMLButtonElement, AlertCloseButtonProps>(
  ({ style, variant = 'tertiary', tone: _ignoredTone, size = 'small', children, 'aria-label': ariaLabel, ...props  }, ref) => {
    const { tone } = useAlertContext();
    
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
AlertCloseButton.displayName = 'Alert.CloseButton';

// Attach sub-components
export const Alert = Object.assign(AlertRoot, {
  Icon: AlertIcon,
  Content: AlertContent,
  Heading: AlertHeading,
  Description: AlertDescription,
  Actions: AlertActions,
  CloseButton: AlertCloseButton,
});
