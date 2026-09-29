import React, { createContext, useContext, useId, useState, useRef, useCallback } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Command } from 'cmdk';
import { Check, ChevronDown, Search, X } from 'lucide-react';
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
  emptyMessage?: React.ReactNode;
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
  emptyMessage?: React.ReactNode;
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
    emptyMessage,
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
      setInputValue,
      emptyMessage,
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

export type SelectHintProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'style'> & {
  style?: stylex.StyleXStyles;
};

export const SelectHint = React.forwardRef<HTMLDivElement, SelectHintProps>(
  ({ children, style, ...props }, ref) => {
    const context = useSelectContext();
    if (context.invalid) return null;
    return (
      <div ref={ref} {...stylex.props(styles.hint, style)} {...props}>
        {children}
      </div>
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
            {context.itemLabels.current.get(val) || val}
            <span 
              {...stylex.props(styles.tagClose)} 
              onClick={(e) => handleRemoveTag(e, val)}
            >
              <X size={12} />
            </span>
          </span>
        ));
      }
    } else {
      hasValue = context.value !== undefined && context.value !== '';
      if (hasValue) {
        contentNode = <span {...stylex.props(styles.triggerValue)}>{context.itemLabels.current.get(context.value as string) || (context.value as string)}</span>;
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
            <div {...stylex.props(styles.clearWrapper)} onClick={handleClearAll}>
              <X size={14} />
            </div>
          )}

          <div {...stylex.props(styles.triggerIcon, context.open && styles.triggerIconOpen, (context.multiselect && hasValue) ? styles.marginLeftZero : styles.marginLeftAuto)}>
            <ChevronDown size={16} />
          </div>
        </button>
      </PopoverPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = 'Select.Trigger';

// ---------------------------------------------------------------------------

export type SelectContentProps = Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'style'> & {
  emptyMessage?: React.ReactNode;
  style?: stylex.StyleXStyles;
};

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, align = 'start', sideOffset = 4, emptyMessage: emptyMessageProp, style, ...props }, ref) => {
    const context = useSelectContext();
    const emptyMsg = emptyMessageProp ?? context.emptyMessage ?? 'No results found.';
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
              <Search size={14} {...stylex.props(styles.searchIcon)} />
              <Command.Input 
                placeholder="Search..." 
                value={context.inputValue}
                onValueChange={context.setInputValue}
                {...stylex.props(styles.searchInput)}
              />
            </div>
          )}
          <Command.List {...stylex.props(styles.list)}>
            <Command.Empty {...stylex.props(styles.empty)}>{emptyMsg}</Command.Empty>
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
          isSelected && styles.itemSelected,
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
              <Check size={10} strokeWidth={3} />
            )}
          </div>
        )}

        <span {...stylex.props(styles.itemText)}>{children}</span>

        {!context.multiselect && isSelected && (
          <span {...stylex.props(styles.itemIndicator)}>
            <Check size={14} />
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
