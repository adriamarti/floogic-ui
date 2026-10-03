import React, { createContext, useContext, useId, useState, forwardRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import { styles } from './RadioGroup.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

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

export interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  layout?: RadioGroupLayout;
  stylex?: stylex.StyleXStyles;
}

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    value: controlledValue, 
    defaultValue = '', 
    onValueChange, 
    invalid = false, 
    required = false, 
    disabled = false, 
    layout = 'vertical',
    stylex: stylexProp, 
    className,
    style,
    children,
    ...props 
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
          aria-labelledby={`${generatedId}-label`}
          {...props}
          {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)}
        >
          {groupedChildren}
        </RadioGroupPrimitive.Root>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroupRoot.displayName = 'RadioGroup';

// ---------------------------------------------------------------------------

export interface RadioGroupLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  stylex?: stylex.StyleXStyles;
}

const Label = forwardRef<HTMLLabelElement, RadioGroupLabelProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const context = useRadioGroupContext();
    return (
      <div {...stylex.props(styles.labelContainer)}>
        <label
          ref={ref}
          id={`${context.id}-label`}
          {...props}
          {...mergeStyles(stylex.props(styles.label, stylexProp), className, style)}
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

export interface RadioGroupHintProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const Hint = forwardRef<HTMLDivElement, RadioGroupHintProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const context = useRadioGroupContext();
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
Hint.displayName = 'RadioGroup.Hint';

// ---------------------------------------------------------------------------

export interface RadioGroupErrorProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const ErrorMessage = forwardRef<HTMLDivElement, RadioGroupErrorProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const context = useRadioGroupContext();
    if (!context.invalid) return null;
    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.errorContainer, stylexProp), className, style)}
      >
        <span {...stylex.props(styles.errorText)}>
          {children}
        </span>
      </div>
    );
  }
);
ErrorMessage.displayName = 'RadioGroup.Error';

// ---------------------------------------------------------------------------

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  value: string;
  stylex?: stylex.StyleXStyles;
}

const Item = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ children, value, stylex: stylexProp, className, style, disabled, ...props }, ref) => {
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
          {...props}
          {...mergeStyles(
            stylex.props(
              styles.radioRoot,
              styles.radioControl,
              isChecked && styles.radioRootChecked,
              context.invalid && !isChecked && styles.radioRootInvalid,
              context.invalid && isChecked && styles.radioRootInvalidChecked,
              isDisabled && styles.radioRootDisabled,
              stylexProp
            ),
            className,
            style
          )}
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
