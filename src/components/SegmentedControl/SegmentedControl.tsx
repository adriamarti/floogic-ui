import * as stylex from '@stylexjs/stylex';
import React, { forwardRef, createContext, useContext } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { styles } from './SegmentedControl.stylex';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface SegmentedControlContextValue {
  size: 'small' | 'medium';
  selectedValue?: string;
}

const SegmentedControlContext = createContext<SegmentedControlContextValue>({ size: 'medium' });

export function useSegmentedControlContext() {
  return useContext(SegmentedControlContext);
}

// ---------------------------------------------------------------------------
// Sub-components (SegmentedControl.Label, SegmentedControl.Icon)
// ---------------------------------------------------------------------------

export interface SegmentedControlLabelProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const SegmentedControlLabel = forwardRef<HTMLSpanElement, SegmentedControlLabelProps>(
  ({ style, ...props }, ref) => {
    const resolved = stylex.props(styles.label, style);
    return (
      <span 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
SegmentedControlLabel.displayName = 'SegmentedControl.Label';

export interface SegmentedControlIconProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const SegmentedControlIcon = forwardRef<HTMLSpanElement, SegmentedControlIconProps>(
  ({ style, ...props }, ref) => {
    const resolved = stylex.props(styles.icon, style);
    return (
      <span 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
SegmentedControlIcon.displayName = 'SegmentedControl.Icon';

// ---------------------------------------------------------------------------
// Item Component
// ---------------------------------------------------------------------------

// Radix RadioGroup handles state, but to style via StyleX dynamically we need the checked state.
// We can use a small wrapper around RadioGroup context if Radix exports it, but it doesn't.
// Let's use global CSS for the checked state via className, since StyleX pseudo-class `[data-state=checked]` might not be supported.
// Actually, StyleX allows defining CSS inside standard CSS files. Let's just create a `segmented-control.css` for this specific selector, OR we can use the `value` prop if we manage state ourselves.
// But Radix provides `data-state="checked"` on the DOM.
// StyleX does not support arbitrary attributes in `stylex.create`.
// Instead, let's just make the SegmentedControl controlled locally to apply styles, OR just use an inline style / className!

export interface SegmentedControlItemProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  iconOnly?: boolean;
}

const SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ style, iconOnly, value, ...props }, ref) => {
    const { size, selectedValue } = useSegmentedControlContext();
    const isChecked = selectedValue === value;

    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        {...props}
        {...stylex.props(
          styles.item,
          isChecked && styles.itemChecked,
          size === 'medium' ? styles.itemMedium : styles.itemSmall,
          iconOnly && size === 'medium' ? styles.itemMediumIconOnly : null,
          iconOnly && size === 'small' ? styles.itemSmallIconOnly : null,
          style
        )}
      >
        {props.children}
      </RadioGroupPrimitive.Item>
    );
  }
);
SegmentedControlItem.displayName = 'SegmentedControl.Item';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface SegmentedControlProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'className' | 'style'> {
  size?: 'small' | 'medium';
  style?: stylex.StyleXStyles;
}

const SegmentedControlRoot = forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ size = 'medium', style, value, defaultValue, onValueChange, ...props }, ref) => {
    
    // We need to know the selected value to style items via stylex.
    // If it's uncontrolled, we track it locally.
    const [localValue, setLocalValue] = React.useState(value || defaultValue || '');
    
    // If controlled, sync it.
    React.useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value || '');
      }
    }, [value]);

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setLocalValue(newValue || '');
      }
      onValueChange?.(newValue);
    };

    return (
      <SegmentedControlContext.Provider value={{ size, selectedValue: localValue }}>
        <RadioGroupPrimitive.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          {...props}
          {...stylex.props(styles.root, style)}
        />
      </SegmentedControlContext.Provider>
    );
  }
);
SegmentedControlRoot.displayName = 'SegmentedControl';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const SegmentedControl = Object.assign(SegmentedControlRoot, {
  Item: SegmentedControlItem,
  Label: SegmentedControlLabel,
  Icon: SegmentedControlIcon,
});
