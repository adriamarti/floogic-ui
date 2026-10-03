import React, { createContext, useContext, forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles, iconColorStyles, borderLeftColorStyles } from './Alert.stylex';
import { IconButton, IconButtonProps } from '../IconButton';
import { mergeStyles } from '../../utils/mergeStyles';

export type AlertTone = 'error' | 'warning' | 'success' | 'information' | 'neutral' | 'brand' | 'inverse-neutral' | 'inverse-brand';
export type AlertLayout = 'vertical' | 'horizontal';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
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
  ({ children, tone = 'neutral', layout = 'vertical', borderLeft = false, stylex: stylexProp, className, style, role, ...props }, ref) => {
    const defaultRole = tone === 'error' || tone === 'warning' ? 'alert' : 'status';

    return (
      <AlertContext.Provider value={{ tone, layout }}>
        <div
          ref={ref}
          role={role || defaultRole}
          {...props}
          {...mergeStyles(
            stylex.props(
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
              stylexProp
            ),
            className,
            style
          )}
        >
          {children}
        </div>
      </AlertContext.Provider>
    );
  }
);
AlertRoot.displayName = 'Alert';

// Sub-components

export interface AlertIconProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

const AlertIcon = forwardRef<HTMLDivElement, AlertIconProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const { tone, layout } = useAlertContext();
    return (
      <div
        ref={ref}
        aria-hidden="true"
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.iconContainer, 
            iconColorStyles[tone],
            layout === 'horizontal' && styles.iconContainerHorizontal,
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
AlertIcon.displayName = 'Alert.Icon';

export interface AlertContentProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

const AlertContent = forwardRef<HTMLDivElement, AlertContentProps>(
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
AlertContent.displayName = 'Alert.Content';

export interface AlertHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  stylex?: stylex.StyleXStyles;
}

const AlertHeading = forwardRef<HTMLHeadingElement, AlertHeadingProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <h5 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.heading, stylexProp), className, style)}
      >
        {children}
      </h5>
    );
  }
);
AlertHeading.displayName = 'Alert.Heading';

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  stylex?: stylex.StyleXStyles;
}

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
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
AlertDescription.displayName = 'Alert.Description';

export interface AlertActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

const AlertActions = forwardRef<HTMLDivElement, AlertActionsProps>(
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
AlertActions.displayName = 'Alert.Actions';

export interface AlertCloseButtonProps extends Partial<IconButtonProps> {
  'aria-label': string;
  stylex?: stylex.StyleXStyles;
}

const AlertCloseButton = forwardRef<HTMLButtonElement, AlertCloseButtonProps>(
  ({ stylex: stylexProp, variant = 'tertiary', tone: _ignoredTone, size = 'small', children, 'aria-label': ariaLabel, className, style, ...props }, ref) => {
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
