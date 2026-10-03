import React, { forwardRef, useId } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import { styles } from './TextInput.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

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

export interface TextInputLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  stylex?: stylex.StyleXStyles;
}

const Label = forwardRef<HTMLLabelElement, TextInputLabelProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const context = useTextInputContext();
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
Label.displayName = 'TextInput.Label';

export interface TextInputHintProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const Hint = forwardRef<HTMLDivElement, TextInputHintProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const context = useTextInputContext();
    // Do not render hint if invalid, to give space for error component.
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
Hint.displayName = 'TextInput.Hint';

export interface TextInputErrorProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const ErrorMsg = forwardRef<HTMLDivElement, TextInputErrorProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const context = useTextInputContext();
    // Only render if invalid is true
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
ErrorMsg.displayName = 'TextInput.Error';

export interface TextInputFieldProps extends React.ComponentPropsWithoutRef<'input'> {
  stylex?: stylex.StyleXStyles;
}

const Field = forwardRef<HTMLInputElement, TextInputFieldProps>(
  ({ stylex: stylexProp, className, style, type = 'text', ...props }, ref) => {
    const context = useTextInputContext();
    return (
      <div {...stylex.props(styles.fieldWrapper)}>
        <input
          ref={ref}
          id={context.id}
          type={type}
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
Field.displayName = 'TextInput.Field';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface TextInputProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
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
  ({ stylex: stylexProp, className, style, id: idProp, invalid, required, disabled, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp || generatedId;

    return (
      <TextInputContext.Provider value={{ id, invalid, required, disabled }}>
        <div 
          ref={ref} 
          {...props}
          {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)} 
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
