import React, { createContext, useContext, useId, useState, forwardRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Switch.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

type SwitchContextValue = {
  id: string;
  required: boolean;
  disabled: boolean;
};

const SwitchContext = createContext<SwitchContextValue | undefined>(undefined);

const useSwitchContext = () => {
  const context = useContext(SwitchContext);
  if (!context) throw new Error('Switch compound components must be within <Switch>');
  return context;
};

export interface SwitchProps extends React.ComponentPropsWithoutRef<'div'> {
  id?: string;
  required?: boolean;
  disabled?: boolean;
  stylex?: stylex.StyleXStyles;
}

const SwitchRoot = forwardRef<HTMLDivElement, SwitchProps>(
  ({ id: idProp, required = false, disabled = false, stylex: stylexProp, className, style, children, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp || generatedId;

    return (
      <SwitchContext.Provider value={{ id, required, disabled }}>
        <div 
          ref={ref} 
          {...props}
          {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)}
        >
          {children}
        </div>
      </SwitchContext.Provider>
    );
  }
);
SwitchRoot.displayName = 'Switch';

export interface SwitchLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  stylex?: stylex.StyleXStyles;
}

const Label = forwardRef<HTMLLabelElement, SwitchLabelProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const context = useSwitchContext();
    return (
      <LabelPrimitive.Root
        ref={ref}
        htmlFor={`${context.id}-field`}
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.label,
            context.disabled && styles.labelDisabled,
            stylexProp
          ),
          className,
          style
        )}
      >
        {children}
        {context.required && (
          <span {...stylex.props(styles.requiredAsterisk)}> *</span>
        )}
      </LabelPrimitive.Root>
    );
  }
);
Label.displayName = 'Switch.Label';

export interface SwitchFieldProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  stylex?: stylex.StyleXStyles;
}

const Field = forwardRef<HTMLButtonElement, SwitchFieldProps>(
  ({ stylex: stylexProp, className, style, disabled, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
    const context = useSwitchContext();
    
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
    const isChecked = isControlled ? checked : internalChecked;
    
    const isDisabled = context.disabled || disabled;

    const handleCheckedChange = (newChecked: boolean) => {
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    return (
      <SwitchPrimitive.Root
        ref={ref}
        id={`${context.id}-field`}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={handleCheckedChange}
        disabled={isDisabled}
        required={context.required}
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.track,
            isChecked && styles.trackChecked,
            isDisabled && styles.trackDisabled,
            stylexProp
          ),
          className,
          style
        )}
      >
        <SwitchPrimitive.Thumb
          {...stylex.props(
            styles.thumb,
            isChecked && styles.thumbChecked
          )}
        />
      </SwitchPrimitive.Root>
    );
  }
);
Field.displayName = 'Switch.Field';

export const Switch = Object.assign(SwitchRoot, {
  Field,
  Label
});
