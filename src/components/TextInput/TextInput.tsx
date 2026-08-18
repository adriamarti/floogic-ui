import React, { forwardRef, useId } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import { styles } from './TextInput.stylex';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TextInputContextValue {
  id: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const TextInputContext = React.createContext<TextInputContextValue | null>(null);

export function useTextInputContext() {
  const context = React.useContext(TextInputContext);
  if (!context) {
    throw new Error('TextInput subcomponents must be used within a <TextInput>');
  }
  return context;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface TextInputLabelProps extends Omit<React.ComponentPropsWithoutRef<'label'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const Label = forwardRef<HTMLLabelElement, TextInputLabelProps>(
  ({ style, children, ...props }, ref) => {
    const context = useTextInputContext();
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
Label.displayName = 'TextInput.Label';

export interface TextInputHintProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const Hint = forwardRef<HTMLDivElement, TextInputHintProps>(
  ({ style, children, ...props }, ref) => {
    const context = useTextInputContext();
    // Do not render hint if invalid, to give space for error component.
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
Hint.displayName = 'TextInput.Hint';

export interface TextInputErrorProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const ErrorMsg = forwardRef<HTMLDivElement, TextInputErrorProps>(
  ({ style, children, ...props }, ref) => {
    const context = useTextInputContext();
    // Only render if invalid is true
    if (!context.invalid) return null;

    return (
      <div 
        ref={ref} 
        {...stylex.props(styles.errorContainer, style)} 
        {...props} 
      >
        <svg 
          xmlns="http://www.3.org/2000/svg" 
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
ErrorMsg.displayName = 'TextInput.Error';

export interface TextInputFieldProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const Field = forwardRef<HTMLInputElement, TextInputFieldProps>(
  ({ style, ...props }, ref) => {
    const context = useTextInputContext();
    return (
      <div {...stylex.props(styles.fieldWrapper)}>
        <input
          ref={ref}
          id={context.id}
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
Field.displayName = 'TextInput.Field';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface TextInputProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  id?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}

/**
 * TextInput
 *
 * Allows users to enter a single line of text.
 *
 * @example
 * <TextInput required invalid={false}>
 *   <TextInput.Label>First Name</TextInput.Label>
 *   <TextInput.Field placeholder="John" />
 * </TextInput>
 */
const TextInputRoot = forwardRef<HTMLDivElement, TextInputProps>(
  ({ style, id: idProp, invalid, required, disabled, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp || generatedId;

    return (
      <TextInputContext.Provider value={{ id, invalid, required, disabled }}>
        <div 
          ref={ref} 
          {...stylex.props(styles.root, style)} 
          {...props} 
        />
      </TextInputContext.Provider>
    );
  }
);
TextInputRoot.displayName = 'TextInput';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const TextInput = Object.assign(TextInputRoot, {
  Label,
  Hint,
  Error: ErrorMsg,
  Field,
});
