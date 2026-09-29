import React, { createContext, useContext, useId, useState, forwardRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import { styles } from './RadioGroup.stylex';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type RadioGroupContextValue = {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup compound components must be rendered within a RadioGroup');
  }
  return context;
};

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export type RadioGroupLayout = 'horizontal' | 'vertical';

export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  layout?: RadioGroupLayout;
  style?: stylex.StyleXStyles;
  children: React.ReactNode;
};

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    value: controlledValue, 
    defaultValue = '', 
    onValueChange, 
    invalid = false, 
    required = false, 
    disabled = false, 
    layout = 'vertical',
    style, 
    children 
  }, ref) => {
    const generatedId = useId();
    const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (newVal: string) => {
      if (!isControlled) setUncontrolledValue(newVal);
      onValueChange?.(newVal);
    };

    const childrenArray = React.Children.toArray(children);
    const groupedChildren: React.ReactNode[] = [];
    let currentItemsGroup: React.ReactNode[] = [];

    childrenArray.forEach((child) => {
      if (React.isValidElement(child) && (child.type as any).displayName === 'RadioGroup.Item') {
        currentItemsGroup.push(child);
      } else {
        if (currentItemsGroup.length > 0) {
          groupedChildren.push(
            <div
              key={`group-${groupedChildren.length}`}
              {...stylex.props(styles.itemsGroup, layout === 'horizontal' ? styles.layoutHorizontal : styles.layoutVertical)}
            >
              {currentItemsGroup}
            </div>
          );
          currentItemsGroup = [];
        }
        groupedChildren.push(child);
      }
    });

    if (currentItemsGroup.length > 0) {
      groupedChildren.push(
        <div
          key={`group-${groupedChildren.length}`}
          {...stylex.props(styles.itemsGroup, layout === 'horizontal' ? styles.layoutHorizontal : styles.layoutVertical)}
        >
          {currentItemsGroup}
        </div>
      );
    }

    return (
      <RadioGroupContext.Provider value={{
        id: generatedId,
        value,
        onValueChange: handleValueChange,
        invalid,
        required,
        disabled,
      }}>
        <RadioGroupPrimitive.Root 
          ref={ref} 
          value={value}
          onValueChange={handleValueChange}
          disabled={disabled}
          required={required}
          {...stylex.props(styles.root, style)} 
          aria-labelledby={`${generatedId}-label`}
        >
          {groupedChildren}
        </RadioGroupPrimitive.Root>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroupRoot.displayName = 'RadioGroup';

// ---------------------------------------------------------------------------

export type RadioGroupLabelProps = Omit<React.ComponentPropsWithoutRef<'label'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

const Label = forwardRef<HTMLLabelElement, RadioGroupLabelProps>(
  ({ children, style, ...props }, ref) => {
    const context = useRadioGroupContext();
    return (
      <div {...stylex.props(styles.labelContainer)}>
        <label
          ref={ref}
          id={`${context.id}-label`}
          {...stylex.props(
            styles.label, 
            style
          )}
          {...props}
        >
          {children}
          {context.required && (
            <span {...stylex.props(styles.requiredAsterisk)}> *</span>
          )}
        </label>
      </div>
    );
  }
);
Label.displayName = 'RadioGroup.Label';

// ---------------------------------------------------------------------------

export type RadioGroupHintProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

const Hint = forwardRef<HTMLDivElement, RadioGroupHintProps>(
  ({ children, style, ...props }, ref) => {
    const context = useRadioGroupContext();
    if (context.invalid) return null;
    return (
      <div 
        ref={ref} 
        {...stylex.props(
          styles.hint, 
          style
        )} 
        {...props}
      >
        {children}
      </div>
    );
  }
);
Hint.displayName = 'RadioGroup.Hint';

// ---------------------------------------------------------------------------

export type RadioGroupErrorProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

const ErrorMessage = forwardRef<HTMLDivElement, RadioGroupErrorProps>(
  ({ children, style, ...props }, ref) => {
    const context = useRadioGroupContext();
    if (!context.invalid) return null;
    return (
      <div ref={ref} {...stylex.props(styles.errorContainer, style)} {...props}>
        <span {...stylex.props(styles.errorText)}>
          {children}
        </span>
      </div>
    );
  }
);
ErrorMessage.displayName = 'RadioGroup.Error';

// ---------------------------------------------------------------------------

export type RadioGroupItemProps = Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'style'> & {
  value: string;
  style?: stylex.StyleXStyles;
};

const Item = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ children, value, style, disabled, ...props }, ref) => {
    const context = useRadioGroupContext();
    const id = `${context.id}-item-${value}`;
    
    const isChecked = context.value === value;
    const isDisabled = context.disabled || disabled;

    return (
      <div {...stylex.props(styles.itemContainer)}>
        <RadioGroupPrimitive.Item
          ref={ref}
          id={id}
          value={value}
          disabled={isDisabled}
          {...stylex.props(
            styles.radioRoot,
            styles.radioControl,
            isChecked && styles.radioRootChecked,
            context.invalid && !isChecked && styles.radioRootInvalid,
            context.invalid && isChecked && styles.radioRootInvalidChecked,
            isDisabled && styles.radioRootDisabled,
            style
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator {...stylex.props(styles.indicator, context.invalid && styles.indicatorInvalid)} />
        </RadioGroupPrimitive.Item>
        {children && (
          <LabelPrimitive.Root
            htmlFor={id}
            {...stylex.props(
              styles.itemLabel,
              isDisabled && styles.itemLabelDisabled
            )}
          >
            {children}
          </LabelPrimitive.Root>
        )}
      </div>
    );
  }
);
Item.displayName = 'RadioGroup.Item';

// ---------------------------------------------------------------------------

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Label,
  Hint,
  Error: ErrorMessage,
  Item
});
