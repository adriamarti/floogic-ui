import React, { createContext, useContext, useId, useState, forwardRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as stylex from '@stylexjs/stylex';
import { styles } from './CheckboxGroup.stylex';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export type CheckboxGroupSize = 'small' | 'large';

type CheckboxGroupContextValue = {
  id: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  size: CheckboxGroupSize;
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

export type CheckboxGroupProps = {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  size?: CheckboxGroupSize;
  layout?: CheckboxGroupLayout;
  style?: stylex.StyleXStyles;
  children: React.ReactNode;
};

const CheckboxGroupRoot = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ 
    value: controlledValue, 
    defaultValue = [], 
    onValueChange, 
    invalid = false, 
    required = false, 
    disabled = false, 
    size = 'small', 
    layout = 'vertical',
    style, 
    children 
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
        size
      }}>
        <div ref={ref} {...stylex.props(styles.root, style)} role="group" aria-labelledby={`${generatedId}-label`}>
          {groupedChildren}
        </div>
      </CheckboxGroupContext.Provider>
    );
  }
);
CheckboxGroupRoot.displayName = 'CheckboxGroup';

// ---------------------------------------------------------------------------

export type CheckboxGroupLabelProps = Omit<React.ComponentPropsWithoutRef<'label'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

const Label = forwardRef<HTMLLabelElement, CheckboxGroupLabelProps>(
  ({ children, style, ...props }, ref) => {
    const context = useCheckboxGroupContext();
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
Label.displayName = 'CheckboxGroup.Label';

// ---------------------------------------------------------------------------

export type CheckboxGroupHintProps = Omit<React.ComponentPropsWithoutRef<'p'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

const Hint = forwardRef<HTMLParagraphElement, CheckboxGroupHintProps>(
  ({ children, style, ...props }, ref) => {
    const context = useCheckboxGroupContext();
    if (context.invalid) return null;
    return (
      <p 
        ref={ref} 
        {...stylex.props(
          styles.hint, 
          context.size === 'small' ? styles.hintSmall : styles.hintLarge,
          style
        )} 
        {...props}
      >
        {children}
      </p>
    );
  }
);
Hint.displayName = 'CheckboxGroup.Hint';

// ---------------------------------------------------------------------------

export type CheckboxGroupErrorProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

const ErrorMessage = forwardRef<HTMLDivElement, CheckboxGroupErrorProps>(
  ({ children, style, ...props }, ref) => {
    const context = useCheckboxGroupContext();
    if (!context.invalid) return null;
    return (
      <div ref={ref} {...stylex.props(styles.errorContainer, style)} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width={context.size === 'small' ? "12" : "14"} height={context.size === 'small' ? "12" : "14"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...stylex.props(styles.errorIcon)}>
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
        <span {...stylex.props(
          styles.errorText,
          context.size === 'small' ? styles.errorTextSmall : styles.errorTextLarge
        )}>
          {children}
        </span>
      </div>
    );
  }
);
ErrorMessage.displayName = 'CheckboxGroup.Error';

// ---------------------------------------------------------------------------

export type CheckboxGroupItemProps = Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'style' | 'checked' | 'onCheckedChange'> & {
  value: string;
  style?: stylex.StyleXStyles;
};

const Item = forwardRef<HTMLButtonElement, CheckboxGroupItemProps>(
  ({ children, value, style, disabled, ...props }, ref) => {
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
          {...stylex.props(
            styles.checkboxRoot,
            context.size === 'small' ? styles.checkboxSmall : styles.checkboxLarge,
            isChecked && styles.checkboxRootChecked,
            context.invalid && !isChecked && styles.checkboxRootInvalid,
            isDisabled && styles.checkboxRootDisabled,
            style
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator {...stylex.props(styles.indicator)}>
            <svg xmlns="http://www.w3.org/2000/svg" width={context.size === 'small' ? "10" : "12"} height={context.size === 'small' ? "10" : "12"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {children && (
          <LabelPrimitive.Root
            htmlFor={id}
            {...stylex.props(
              styles.itemLabel,
              context.size === 'small' ? styles.itemLabelSmall : styles.itemLabelLarge,
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
