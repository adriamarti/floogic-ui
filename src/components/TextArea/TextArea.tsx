import React, { forwardRef, useId } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import { styles } from './TextArea.stylex';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TextAreaContextValue {
  id: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const TextAreaContext = React.createContext<TextAreaContextValue | null>(null);

export function useTextAreaContext() {
  const context = React.useContext(TextAreaContext);
  if (!context) {
    throw new Error('TextArea subcomponents must be used within a <TextArea>');
  }
  return context;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface TextAreaLabelProps extends Omit<React.ComponentPropsWithoutRef<'label'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const Label = forwardRef<HTMLLabelElement, TextAreaLabelProps>(
  ({ style, children, ...props }, ref) => {
    const context = useTextAreaContext();
    return (
      <div {...stylex.props(styles.labelContainer)}>
        <LabelPrimitive.Root
          ref={ref}
          htmlFor={context.id}
          {...stylex.props(styles.label, style)}
          {...props}
        >
          {children}
          {context.required && (
            <span {...stylex.props(styles.requiredAsterisk)}> *</span>
          )}
        </LabelPrimitive.Root>
      </div>
    );
  }
);
Label.displayName = 'TextArea.Label';

export interface TextAreaHintProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const Hint = forwardRef<HTMLDivElement, TextAreaHintProps>(
  ({ style, children, ...props }, ref) => {
    const context = useTextAreaContext();
    if (context.invalid) return null;

    return (
      <div 
        ref={ref} 
        {...stylex.props(styles.hint, style)} 
        {...props} 
      >
        {children}
      </div>
    );
  }
);
Hint.displayName = 'TextArea.Hint';

export interface TextAreaErrorProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const ErrorMsg = forwardRef<HTMLDivElement, TextAreaErrorProps>(
  ({ style, children, ...props }, ref) => {
    const context = useTextAreaContext();
    if (!context.invalid) return null;

    return (
      <div 
        ref={ref} 
        {...stylex.props(styles.errorContainer, style)} 
        {...props} 
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          {...stylex.props(styles.errorIcon)}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
        <span {...stylex.props(styles.errorText)}>{children}</span>
      </div>
    );
  }
);
ErrorMsg.displayName = 'TextArea.Error';

export interface TextAreaFieldProps extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  /** Number of visible text lines. Defaults to 4. */
  rows?: number;
}

const Field = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ style, rows = 4, ...props }, ref) => {
    const context = useTextAreaContext();
    return (
      <div {...stylex.props(styles.fieldWrapper)}>
        <textarea
          ref={ref}
          id={context.id}
          rows={rows}
          aria-invalid={context.invalid}
          disabled={context.disabled}
          required={context.required}
          {...stylex.props(
            styles.field,
            context.invalid && styles.fieldInvalid,
            context.disabled && styles.fieldDisabled,
            style
          )}
          {...props}
        />
      </div>
    );
  }
);
Field.displayName = 'TextArea.Field';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface TextAreaProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  id?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const TextAreaRoot = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ style, id: idProp, invalid, required, disabled, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp || generatedId;

    return (
      <TextAreaContext.Provider value={{ id, invalid, required, disabled }}>
        <div 
          ref={ref} 
          {...stylex.props(styles.root, style)} 
          {...props} 
        />
      </TextAreaContext.Provider>
    );
  }
);
TextAreaRoot.displayName = 'TextArea';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const TextArea = Object.assign(TextAreaRoot, {
  Label,
  Hint,
  Error: ErrorMsg,
  Field,
});
