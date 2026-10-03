import React, { forwardRef, useId } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import { styles } from './TextArea.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

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

export interface TextAreaLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  stylex?: stylex.StyleXStyles;
}

const Label = forwardRef<HTMLLabelElement, TextAreaLabelProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const context = useTextAreaContext();
    return (
      <div {...stylex.props(styles.labelContainer)}>
        <LabelPrimitive.Root
          ref={ref}
          htmlFor={context.id}
          {...props}
          {...mergeStyles(stylex.props(styles.label, stylexProp), className, style)}
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

export interface TextAreaHintProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const Hint = forwardRef<HTMLDivElement, TextAreaHintProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const context = useTextAreaContext();
    if (context.invalid) return null;

    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.hint, stylexProp), className, style)} 
      >
        {children}
      </div>
    );
  }
);
Hint.displayName = 'TextArea.Hint';

export interface TextAreaErrorProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const ErrorMsg = forwardRef<HTMLDivElement, TextAreaErrorProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const context = useTextAreaContext();
    if (!context.invalid) return null;

    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.errorContainer, stylexProp), className, style)} 
      >
        <span {...stylex.props(styles.errorText)}>{children}</span>
      </div>
    );
  }
);
ErrorMsg.displayName = 'TextArea.Error';

export interface TextAreaFieldProps extends React.ComponentPropsWithoutRef<'textarea'> {
  stylex?: stylex.StyleXStyles;
  /** Number of visible text lines. Defaults to 4. */
  rows?: number;
}

const Field = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ stylex: stylexProp, className, style, rows = 4, ...props }, ref) => {
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
          {...props}
          {...mergeStyles(
            stylex.props(
              styles.field,
              context.invalid && styles.fieldInvalid,
              context.disabled && styles.fieldDisabled,
              stylexProp
            ),
            className,
            style
          )}
        />
      </div>
    );
  }
);
Field.displayName = 'TextArea.Field';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface TextAreaProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
  id?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const TextAreaRoot = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ stylex: stylexProp, className, style, id: idProp, invalid, required, disabled, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp || generatedId;

    return (
      <TextAreaContext.Provider value={{ id, invalid, required, disabled }}>
        <div 
          ref={ref} 
          {...props}
          {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)} 
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
