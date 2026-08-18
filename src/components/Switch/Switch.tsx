import React, { createContext, useContext, useId, useState, forwardRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Switch.stylex';

export type SwitchSize = 'small' | 'medium';

type SwitchContextValue = {
  id: string;
  size: SwitchSize;
  required: boolean;
  disabled: boolean;
};

const SwitchContext = createContext<SwitchContextValue | undefined>(undefined);

const useSwitchContext = () => {
  const context = useContext(SwitchContext);
  if (!context) throw new Error('Switch compound components must be within <Switch>');
  return context;
};

export type SwitchProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> & {
  id?: string;
  size?: SwitchSize;
  required?: boolean;
  disabled?: boolean;
  style?: stylex.StyleXStyles;
};

const SwitchRoot = forwardRef<HTMLDivElement, SwitchProps>(
  ({ id: idProp, size = 'medium', required = false, disabled = false, style, children, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp || generatedId;

    return (
      <SwitchContext.Provider value={{ id, size, required, disabled }}>
        <div ref={ref} {...stylex.props(styles.root, style)} {...props}>
          {children}
        </div>
      </SwitchContext.Provider>
    );
  }
);
SwitchRoot.displayName = 'Switch';

export type SwitchLabelProps = Omit<React.ComponentPropsWithoutRef<'label'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

const Label = forwardRef<HTMLLabelElement, SwitchLabelProps>(
  ({ children, style, ...props }, ref) => {
    const context = useSwitchContext();
    return (
      <LabelPrimitive.Root
        ref={ref}
        htmlFor={`${context.id}-field`}
        {...stylex.props(
          styles.label,
          context.disabled && styles.labelDisabled,
          style
        )}
        {...props}
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

export type SwitchFieldProps = Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'style'> & {
  style?: stylex.StyleXStyles;
};

const Field = forwardRef<HTMLButtonElement, SwitchFieldProps>(
  ({ style, disabled, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
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
        {...stylex.props(
          styles.track,
          context.size === 'medium' ? styles.trackMedium : styles.trackSmall,
          isChecked && styles.trackChecked,
          isDisabled && styles.trackDisabled,
          style
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          {...stylex.props(
            styles.thumb,
            context.size === 'medium' ? styles.thumbMedium : styles.thumbSmall,
            isChecked && styles.thumbChecked,
            isChecked && context.size === 'medium' && styles.thumbMediumChecked,
            isChecked && context.size === 'small' && styles.thumbSmallChecked
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
