import React, { forwardRef, useId, useState } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { DayPicker, DayButton } from 'react-day-picker';
import { format } from 'date-fns';
import * as stylex from '@stylexjs/stylex';
import { styles } from './DatePicker.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface DatePickerContextValue {
  id: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DatePickerContext = React.createContext<DatePickerContextValue | null>(null);

export function useDatePickerContext() {
  const context = React.useContext(DatePickerContext);
  if (!context) {
    throw new Error('DatePicker subcomponents must be used within a <DatePicker>');
  }
  return context;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface DatePickerLabelProps extends React.ComponentPropsWithoutRef<'label'> {
  stylex?: stylex.StyleXStyles;
}

const Label = forwardRef<HTMLLabelElement, DatePickerLabelProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const context = useDatePickerContext();
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
Label.displayName = 'DatePicker.Label';

export interface DatePickerHintProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const Hint = forwardRef<HTMLDivElement, DatePickerHintProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const context = useDatePickerContext();
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
Hint.displayName = 'DatePicker.Hint';

export interface DatePickerErrorProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const ErrorMsg = forwardRef<HTMLDivElement, DatePickerErrorProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const context = useDatePickerContext();
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
ErrorMsg.displayName = 'DatePicker.Error';

export interface DatePickerTriggerProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'value' | 'defaultValue'> {
  stylex?: stylex.StyleXStyles;
  placeholder?: string;
}

const Trigger = forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  ({ stylex: stylexProp, className, style, placeholder = "dd/mm/yyyy", type = 'button', ...props }, ref) => {
    const context = useDatePickerContext();

    return (
      <PopoverPrimitive.Root open={context.open} onOpenChange={context.setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            ref={ref}
            type={type}
            id={context.id}
            aria-invalid={context.invalid}
            disabled={context.disabled}
            {...props}
            {...mergeStyles(
              stylex.props(
                styles.trigger,
                context.invalid && styles.triggerInvalid,
                context.disabled && styles.triggerDisabled,
                stylexProp
              ),
              className,
              style
            )}
          >
            {context.value ? (
              <span>{format(context.value, 'dd/MM/yyyy')}</span>
            ) : (
              <span {...stylex.props(styles.triggerPlaceholder)}>{placeholder}</span>
            )}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              {...stylex.props(styles.icon)}
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            sideOffset={4}
            {...stylex.props(styles.popoverContent)}
          >
            <DayPicker
              mode="single"
              selected={context.value}
              onSelect={(d) => {
                context.onValueChange?.(d);
                context.setOpen(false);
              }}
              classNames={{
                root: stylex.props(styles.rdpRoot).className as string,
                months: stylex.props(styles.rdpMonths).className as string,
                month: stylex.props(styles.rdpMonth).className as string,
                month_caption: stylex.props(styles.rdpCaption).className as string,
                caption_label: stylex.props(styles.rdpCaptionLabel).className as string,
                nav: stylex.props(styles.rdpNav).className as string,
                button_previous: stylex.props(styles.rdpNavButton, styles.rdpNavButtonPrevious).className as string,
                button_next: stylex.props(styles.rdpNavButton, styles.rdpNavButtonNext).className as string,
                month_grid: stylex.props(styles.rdpHead).className as string,
                weekdays: stylex.props(styles.rdpHeadRow).className as string,
                weekday: stylex.props(styles.rdpHeadCell).className as string,
                weeks: stylex.props(styles.rdpTbody).className as string,
                week: stylex.props(styles.rdpRow).className as string,
                day: stylex.props(styles.rdpCell).className as string,
                today: stylex.props(styles.rdpDayToday).className as string,
                outside: stylex.props(styles.rdpDayOutside).className as string,
                disabled: stylex.props(styles.rdpDayDisabled).className as string,
              }}
              components={{
                DayButton: (dayProps) => {
                  const { day, modifiers, ...buttonProps } = dayProps;
                  const isSelected = modifiers.selected;
                  return (
                    <DayButton 
                      day={day}
                      modifiers={modifiers}
                      {...buttonProps} 
                      className={stylex.props(styles.rdpDay, isSelected && styles.rdpDaySelected).className as string} 
                    />
                  );
                },
                Chevron: (chevronProps) => {
                  if (chevronProps.orientation === 'left') {
                    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
                  }
                  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
                }
              }}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }
);
Trigger.displayName = 'DatePicker.Trigger';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface DatePickerProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'defaultValue'> {
  stylex?: stylex.StyleXStyles;
  id?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DatePickerRoot = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ 
    stylex: stylexProp, 
    className,
    style,
    id: idProp, 
    invalid, 
    required, 
    disabled, 
    value: controlledValue,
    defaultValue,
    onValueChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    ...props 
  }, ref) => {
    const generatedId = useId();
    const id = idProp || generatedId;

    const [uncontrolledValue, setUncontrolledValue] = useState<Date | undefined>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlledOpen = controlledOpen !== undefined;
    const open = isControlledOpen ? controlledOpen : uncontrolledOpen;

    const handleValueChange = (newVal: Date | undefined) => {
      if (!isControlled) setUncontrolledValue(newVal);
      onValueChange?.(newVal);
    };

    const handleOpenChange = (newOpen: boolean) => {
      if (!isControlledOpen) setUncontrolledOpen(newOpen);
      onOpenChange?.(newOpen);
    };

    return (
      <DatePickerContext.Provider value={{ 
        id, 
        invalid, 
        required, 
        disabled, 
        value,
        onValueChange: handleValueChange,
        open,
        setOpen: handleOpenChange
      }}>
        <div 
          ref={ref} 
          {...props}
          {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)}
        />
      </DatePickerContext.Provider>
    );
  }
);
DatePickerRoot.displayName = 'DatePicker';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const DatePicker = Object.assign(DatePickerRoot, {
  Label,
  Hint,
  Error: ErrorMsg,
  Trigger,
});
