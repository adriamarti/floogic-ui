import * as stylex from '@stylexjs/stylex';
import React, { forwardRef, createContext, useContext } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { styles } from './SegmentedControl.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

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

export interface SegmentedControlLabelProps extends React.ComponentPropsWithoutRef<'span'> {
  stylex?: stylex.StyleXStyles;
}

const SegmentedControlLabel = forwardRef<HTMLSpanElement, SegmentedControlLabelProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <span 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.label, stylexProp), className, style)}
      />
    );
  }
);
SegmentedControlLabel.displayName = 'SegmentedControl.Label';

export interface SegmentedControlIconProps extends React.ComponentPropsWithoutRef<'span'> {
  stylex?: stylex.StyleXStyles;
}

const SegmentedControlIcon = forwardRef<HTMLSpanElement, SegmentedControlIconProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <span 
        ref={ref} 
        aria-hidden="true"
        {...props}
        {...mergeStyles(stylex.props(styles.icon, stylexProp), className, style)}
      />
    );
  }
);
SegmentedControlIcon.displayName = 'SegmentedControl.Icon';

// ---------------------------------------------------------------------------
// Item Component
// ---------------------------------------------------------------------------

export interface SegmentedControlItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  stylex?: stylex.StyleXStyles;
  iconOnly?: boolean;
}

const SegmentedControlItem = forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ stylex: stylexProp, iconOnly, value, className, style, children, ...props }, ref) => {
    const { size, selectedValue } = useSegmentedControlContext();
    const isChecked = selectedValue === value;

    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.item,
            isChecked && styles.itemChecked,
            size === 'medium' ? styles.itemMedium : styles.itemSmall,
            iconOnly && size === 'medium' ? styles.itemMediumIconOnly : null,
            iconOnly && size === 'small' ? styles.itemSmallIconOnly : null,
            stylexProp
          ),
          className,
          style
        )}
      >
        {children}
      </RadioGroupPrimitive.Item>
    );
  }
);
SegmentedControlItem.displayName = 'SegmentedControl.Item';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface SegmentedControlProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  size?: 'small' | 'medium';
  stylex?: stylex.StyleXStyles;
}

const SegmentedControlRoot = forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ size = 'medium', stylex: stylexProp, className, style, value, defaultValue, onValueChange, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(value || defaultValue || '');
    
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
          {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)}
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
