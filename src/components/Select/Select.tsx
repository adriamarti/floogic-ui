import React, { createContext, useContext, useId, useState, useRef, useCallback } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Command } from 'cmdk';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Select.stylex';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type SelectContextValue = {
  id: string;
  value: string | string[] | undefined;
  onValueChange: (value: any) => void;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  searchable: boolean;
  multiselect: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  itemLabels: React.MutableRefObject<Map<string, React.ReactNode>>;
  registerItem: (value: string, label: React.ReactNode) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
};

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components must be rendered within a Select component');
  }
  return context;
};

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

type BaseSelectProps = {
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: stylex.StyleXStyles;
  children: React.ReactNode;
};

export type SingleSelectProps = BaseSelectProps & {
  multiselect?: false;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export type MultiSelectProps = BaseSelectProps & {
  multiselect: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

export type SelectProps = SingleSelectProps | MultiSelectProps;

const SelectRoot = (props: SelectProps) => {
  const generatedId = useId();
  
  // Safe destructuring of common props
  const {
    multiselect = false,
    invalid = false,
    required = false,
    disabled = false,
    searchable = multiselect, // default true for multiselect, false for single
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    style,
    children,
  } = props;

  const [uncontrolledSingleValue, setUncontrolledSingleValue] = useState<string | undefined>(
    !props.multiselect ? props.defaultValue : undefined
  );
  const [uncontrolledMultiValue, setUncontrolledMultiValue] = useState<string[]>(
    props.multiselect ? (props.defaultValue || []) : []
  );

  const isControlledValue = props.value !== undefined;
  
  let value: string | string[] | undefined;
  if (props.multiselect) {
    value = isControlledValue ? (props.value as string[]) : uncontrolledMultiValue;
  } else {
    value = isControlledValue ? (props.value as string) : uncontrolledSingleValue;
  }

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpenControlled = controlledOpen !== undefined;
  const open = isOpenControlled ? controlledOpen : uncontrolledOpen;
  
  const [inputValue, setInputValue] = useState('');

  const handleValueChange = (newVal: any) => {
    if (props.multiselect) {
      if (!isControlledValue) setUncontrolledMultiValue(newVal);
      props.onValueChange?.(newVal);
    } else {
      if (!isControlledValue) setUncontrolledSingleValue(newVal);
      props.onValueChange?.(newVal);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isOpenControlled) setUncontrolledOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const itemLabels = useRef(new Map<string, React.ReactNode>());
  // We use a small state to force re-render when a new item registers so the Trigger can display its label.
  const [, setTick] = useState(0);

  const registerItem = useCallback((val: string, label: React.ReactNode) => {
    if (itemLabels.current.get(val) !== label) {
      itemLabels.current.set(val, label);
      setTick(t => t + 1);
    }
  }, []);
  
  return (
    <SelectContext.Provider value={{ 
      id: generatedId, 
      value, 
      onValueChange: handleValueChange,
      invalid, 
      required, 
      disabled,
      searchable,
      multiselect,
      open,
      setOpen: handleOpenChange,
      itemLabels,
      registerItem,
      inputValue,
      setInputValue
    }}>
      <div {...stylex.props(styles.root, style)}>
        <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
          <Command shouldFilter={searchable} {...stylex.props(styles.commandRoot)}>
            {children}
          </Command>
        </PopoverPrimitive.Root>
      </div>
    </SelectContext.Provider>
  );
};

// ---------------------------------------------------------------------------

export type SelectLabelProps = Omit<React.ComponentPropsWithoutRef<'label'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

export const SelectLabel = React.forwardRef<HTMLLabelElement, SelectLabelProps>(
  ({ children, style, ...props }, ref) => {
    const context = useSelectContext();
    return (
      <div {...stylex.props(styles.labelContainer)}>
        <label
          ref={ref}
          id={`${context.id}-label`}
          htmlFor={`${context.id}-trigger`}
          {...stylex.props(styles.label, style)}
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
SelectLabel.displayName = 'Select.Label';

// ---------------------------------------------------------------------------

export type SelectHintProps = Omit<React.ComponentPropsWithoutRef<'p'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

export const SelectHint = React.forwardRef<HTMLParagraphElement, SelectHintProps>(
  ({ children, style, ...props }, ref) => {
    const context = useSelectContext();
    if (context.invalid) return null;
    return (
      <p ref={ref} {...stylex.props(styles.hint, style)} {...props}>
        {children}
      </p>
    );
  }
);
SelectHint.displayName = 'Select.Hint';

// ---------------------------------------------------------------------------

export type SelectErrorProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

export const SelectError = React.forwardRef<HTMLDivElement, SelectErrorProps>(
  ({ children, style, ...props }, ref) => {
    const context = useSelectContext();
    if (!context.invalid) return null;
    return (
      <div ref={ref} {...stylex.props(styles.errorContainer, style)} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...stylex.props(styles.errorIcon)}>
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
        <span {...stylex.props(styles.errorText)}>{children}</span>
      </div>
    );
  }
);
SelectError.displayName = 'Select.Error';

// ---------------------------------------------------------------------------

export type SelectTriggerProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'style'> & {
  placeholder?: string;
  style?: stylex.StyleXStyles;
};

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ placeholder, style, ...props }, ref) => {
    const context = useSelectContext();

    const handleRemoveTag = (e: React.MouseEvent, valToRemove: string) => {
      e.stopPropagation();
      const currentVal = (context.value as string[]) || [];
      context.onValueChange(currentVal.filter(v => v !== valToRemove));
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      context.onValueChange([]);
    };

    let contentNode: React.ReactNode = null;
    let hasValue = false;

    if (context.multiselect) {
      const currentValues = (context.value as string[]) || [];
      hasValue = currentValues.length > 0;
      if (hasValue) {
        contentNode = currentValues.map(val => (
          <span key={val} {...stylex.props(styles.tag)}>
            {context.itemLabels.current.get(val)}
            <span 
              {...stylex.props(styles.tagClose)} 
              onClick={(e) => handleRemoveTag(e, val)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
          </span>
        ));
      }
    } else {
      hasValue = context.value !== undefined && context.value !== '';
      if (hasValue) {
        contentNode = <span {...stylex.props(styles.triggerValue)}>{context.itemLabels.current.get(context.value as string)}</span>;
      }
    }

    return (
      <PopoverPrimitive.Trigger asChild>
        <button
          ref={ref}
          id={context.id}
          disabled={context.disabled}
          type="button"
          {...stylex.props(
            styles.trigger,
            context.disabled && styles.triggerDisabled,
            context.invalid && styles.triggerInvalid,
            style
          )}
          {...props}
        >
          {hasValue ? contentNode : (
            <span {...stylex.props(styles.triggerPlaceholder)}>{placeholder}</span>
          )}
          
          {context.multiselect && hasValue && (
            <div {...stylex.props(styles.clearWrapper)} onClick={handleClearAll} style={{ marginLeft: 'auto' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
          )}

          <div {...stylex.props(styles.triggerIcon)} style={{ transform: context.open ? 'rotate(180deg)' : 'none', marginLeft: (context.multiselect && hasValue) ? '0' : 'auto' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </button>
      </PopoverPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = 'Select.Trigger';

// ---------------------------------------------------------------------------

export type SelectContentProps = Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'style'> & {
  style?: stylex.StyleXStyles;
};

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, align = 'start', sideOffset = 4, style, ...props }, ref) => {
    const context = useSelectContext();
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          onOpenAutoFocus={(e) => {
            if (context.searchable) e.preventDefault();
          }}
          {...stylex.props(styles.content, style)}
          {...props}
        >
          {context.searchable && (
            <div {...stylex.props(styles.searchWrapper)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...stylex.props(styles.searchIcon)}>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <Command.Input 
                placeholder="Search..." 
                value={context.inputValue}
                onValueChange={context.setInputValue}
                {...stylex.props(styles.searchInput)}
              />
            </div>
          )}
          <Command.List {...stylex.props(styles.list)}>
            <Command.Empty {...stylex.props(styles.empty)}>No results found.</Command.Empty>
            {children}
          </Command.List>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);
SelectContent.displayName = 'Select.Content';

// ---------------------------------------------------------------------------

export type SelectItemProps = Omit<React.ComponentPropsWithoutRef<typeof Command.Item>, 'style'> & {
  style?: stylex.StyleXStyles;
};

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, onSelect, style, ...props }, ref) => {
    const context = useSelectContext();
    
    let isSelected = false;
    if (context.multiselect) {
      isSelected = (context.value as string[] || []).includes(value || '');
    } else {
      isSelected = context.value === value;
    }

    // Register this item's label in context so the trigger can display it
    React.useEffect(() => {
      if (value) {
        context.registerItem(value, children);
      }
    }, [value, children, context]);

    const handleSelect = (currentValue: string) => {
      if (context.multiselect) {
        const currentVals = (context.value as string[]) || [];
        if (isSelected) {
          context.onValueChange(currentVals.filter(v => v !== currentValue));
        } else {
          context.onValueChange([...currentVals, currentValue]);
        }
      } else {
        context.onValueChange(currentValue);
        context.setOpen(false);
      }
      onSelect?.(currentValue);
    };

    return (
      <Command.Item
        ref={ref}
        value={value}
        onSelect={handleSelect}
        {...stylex.props(
          styles.item,
          isSelected && !context.multiselect && styles.itemSelected,
          style
        )}
        {...props}
      >
        {context.multiselect && (
          <div {...stylex.props(
            styles.checkboxWrapper,
            isSelected && styles.checkboxWrapperSelected
          )}>
            {isSelected && (
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        )}

        <span {...stylex.props(styles.itemText)}>{children}</span>

        {!context.multiselect && isSelected && (
          <span {...stylex.props(styles.itemIndicator)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </Command.Item>
    );
  }
);
SelectItem.displayName = 'Select.Item';

export const Select = Object.assign(SelectRoot, {
  Label: SelectLabel,
  Hint: SelectHint,
  Error: SelectError,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
});
