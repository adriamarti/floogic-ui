import React, { createContext, useContext, useId, useState, forwardRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Check } from 'lucide-react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './CheckboxGroup.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type CheckboxGroupContextValue = {
  id: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | undefined>(undefined);

const useCheckboxGroupContext = () => {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error('CheckboxGroup compound components must be rendered within a CheckboxGroup');
  }
  return context;
};

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export type CheckboxGroupLayout = 'horizontal' | 'vertical';

export interface CheckboxGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  layout?: CheckboxGroupLayout;
  stylex?: stylex.StyleXStyles;
}

const CheckboxGroupRoot = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ 
    value: controlledValue, 
    defaultValue = [], 
    onValueChange, 
    invalid = false, 
    required = false, 
    disabled = false, 
    layout = 'vertical',
    stylex: stylexProp, 
    className,
    style,
    children,
    role = 'group',
    ...props 
  }, ref) => {
    const generatedId = useId();
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (newVal: string[]) => {
      if (!isControlled) setUncontrolledValue(newVal);
      onValueChange?.(newVal);
    };

    const childrenArray = React.Children.toArray(children);
    const groupedChildren: React.ReactNode[] = [];
    let currentItemsGroup: React.ReactNode[] = [];

    childrenArray.forEach((child) => {
      if (React.isValidElement(child) && (child.type as any).displayName === 'CheckboxGroup.Item') {
        currentItemsGroup.push(child);
      } else {
        if (currentItemsGroup.length > 0) {
          groupedChildren.push(
            <div key={`group-${groupedChildren.length}`} {...stylex.props(styles.itemsGroup, layout === 'horizontal' ? styles.layoutHorizontal : styles.layoutVertical)}>
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
        <div key={`group-${groupedChildren.length}`} {...stylex.props(styles.itemsGroup, layout === 'horizontal' ? styles.layoutHorizontal : styles.layoutVertical)}>
          {currentItemsGroup}
        </div>
      );
    }

    return (
      <CheckboxGroupContext.Provider value={{
        id: generatedId,
        value,
        onValueChange: handleValueChange,
        invalid,
        required,
        disabled,
      }}>
        <div 
          ref={ref} 
          role={role} 
          aria-labelledby={`${generatedId}-label`}
          {...props}
          {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)}
        >
          {groupedChildren}
        </div>
      </CheckboxGroupContext.Provider>
    );
  }
);
CheckboxGroupRoot.displayName = 'CheckboxGroup';

// ---------------------------------------------------------------------------

export interface CheckboxGroupLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  stylex?: stylex.StyleXStyles;
}

const Label = forwardRef<HTMLLabelElement, CheckboxGroupLabelProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const context = useCheckboxGroupContext();
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
Label.displayName = 'CheckboxGroup.Label';

// ---------------------------------------------------------------------------

export interface CheckboxGroupHintProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const Hint = forwardRef<HTMLDivElement, CheckboxGroupHintProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const context = useCheckboxGroupContext();
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
Hint.displayName = 'CheckboxGroup.Hint';

// ---------------------------------------------------------------------------

export interface CheckboxGroupErrorProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const ErrorMessage = forwardRef<HTMLDivElement, CheckboxGroupErrorProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const context = useCheckboxGroupContext();
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
ErrorMessage.displayName = 'CheckboxGroup.Error';

// ---------------------------------------------------------------------------

export interface CheckboxGroupItemProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'checked' | 'onCheckedChange'> {
  value: string;
  stylex?: stylex.StyleXStyles;
}

const Item = forwardRef<HTMLButtonElement, CheckboxGroupItemProps>(
  ({ children, value, stylex: stylexProp, className, style, disabled, ...props }, ref) => {
    const context = useCheckboxGroupContext();
    const id = `${context.id}-item-${value}`;
    
    const isChecked = context.value.includes(value);
    const isDisabled = context.disabled || disabled;

    const handleCheckedChange = (checked: boolean | 'indeterminate') => {
      if (checked === true) {
        context.onValueChange([...context.value, value]);
      } else {
        context.onValueChange(context.value.filter(v => v !== value));
      }
    };

    return (
      <div {...stylex.props(styles.itemContainer)}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={id}
          checked={isChecked}
          onCheckedChange={handleCheckedChange}
          disabled={isDisabled}
          {...props}
          {...mergeStyles(
            stylex.props(
              styles.checkboxRoot,
              styles.checkboxControl,
              isChecked && styles.checkboxRootChecked,
              context.invalid && !isChecked && styles.checkboxRootInvalid,
              isDisabled && styles.checkboxRootDisabled,
              stylexProp
            ),
            className,
            style
          )}
        >
          <CheckboxPrimitive.Indicator {...stylex.props(styles.indicator)}>
            <Check size={10} strokeWidth={3} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
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
Item.displayName = 'CheckboxGroup.Item';

// ---------------------------------------------------------------------------

export const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Label,
  Hint,
  Error: ErrorMessage,
  Item
});
