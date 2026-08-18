import * as stylex from '@stylexjs/stylex';
import React, { forwardRef, useState, useEffect } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { styles } from './Slider.stylex';

export interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof RadixSlider.Root>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  /** Label to display above the slider */
  label?: React.ReactNode;
  /** Function to format the value displayed next to the label (e.g. adding a % sign) */
  formatValue?: (value: number) => string;
  /** Minimum value. Defaults to 0. */
  min?: number;
  /** Maximum value. Defaults to 100. */
  max?: number;
}

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  ({ style, label, formatValue, value, defaultValue, min = 0, max = 100, onValueChange, disabled, ...props }, ref) => {
    // We need local state to display the value instantaneously as it slides
    const defaultInitial = min; 
    const initialValue = value !== undefined ? value : (defaultValue !== undefined ? defaultValue : [defaultInitial]);
    const [localValue, setLocalValue] = useState<number[]>(initialValue);

    // Sync with external value if controlled
    useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value);
      }
    }, [value]);

    const handleValueChange = (newValue: number[]) => {
      if (value === undefined) {
        setLocalValue(newValue);
      }
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const hasHeader = label !== undefined || formatValue !== undefined;
    const displayValue = formatValue ? formatValue(localValue[0]) : localValue[0].toString();

    return (
      <div {...stylex.props(styles.wrapper, disabled && styles.disabled, style)}>
        {hasHeader && (
          <div {...stylex.props(styles.header)}>
            {label && <span {...stylex.props(styles.label)}>{label}</span>}
            {formatValue && <span {...stylex.props(styles.value)}>{displayValue}</span>}
          </div>
        )}
        <RadixSlider.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          min={min}
          max={max}
          disabled={disabled}
          {...props}
          {...stylex.props(styles.root)}
        >
          <RadixSlider.Track {...stylex.props(styles.track)}>
            <RadixSlider.Range {...stylex.props(styles.range)} />
          </RadixSlider.Track>
          {localValue.map((_, i) => (
            <RadixSlider.Thumb key={i} {...stylex.props(styles.thumb)} />
          ))}
        </RadixSlider.Root>
      </div>
    );
  }
);
Slider.displayName = 'Slider';
