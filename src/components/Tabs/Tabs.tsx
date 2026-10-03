import * as stylex from '@stylexjs/stylex';
import React, { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { styles } from './Tabs.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

// ---------------------------------------------------------------------------
// Sub-components (Tabs.Label, Tabs.Icon)
// ---------------------------------------------------------------------------

export interface TabsLabelProps extends React.ComponentPropsWithoutRef<'span'> {
  stylex?: stylex.StyleXStyles;
}

const TabsLabel = forwardRef<HTMLSpanElement, TabsLabelProps>(
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
TabsLabel.displayName = 'Tabs.Label';

export interface TabsIconProps extends React.ComponentPropsWithoutRef<'span'> {
  stylex?: stylex.StyleXStyles;
}

const TabsIcon = forwardRef<HTMLSpanElement, TabsIconProps>(
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
TabsIcon.displayName = 'Tabs.Icon';

// ---------------------------------------------------------------------------
// Context & Root
// ---------------------------------------------------------------------------

const TabsContext = React.createContext<{ value: string; size: 'small' | 'medium' }>({ value: '', size: 'medium' });

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  stylex?: stylex.StyleXStyles;
  size?: 'small' | 'medium';
}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  ({ value, defaultValue, onValueChange, size = 'medium', stylex: stylexProp, className, style, ...props }, ref) => {
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
      <TabsContext.Provider value={{ value: localValue, size }}>
        <TabsPrimitive.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          {...props}
          {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)}
        />
      </TabsContext.Provider>
    );
  }
);
TabsRoot.displayName = 'Tabs';

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  stylex?: stylex.StyleXStyles;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <TabsPrimitive.List
        ref={ref}
        {...props}
        {...mergeStyles(stylex.props(styles.list, stylexProp), className, style)}
      />
    );
  }
);
TabsList.displayName = 'Tabs.List';

export interface TabsItemProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  stylex?: stylex.StyleXStyles;
}

const TabsItem = forwardRef<HTMLButtonElement, TabsItemProps>(
  ({ stylex: stylexProp, className, style, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const isActive = context.value === value;

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        value={value}
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.item, 
            context.size === 'medium' ? styles.itemMedium : styles.itemSmall,
            isActive && styles.itemActive, 
            stylexProp
          ),
          className,
          style
        )}
      />
    );
  }
);
TabsItem.displayName = 'Tabs.Item';

export interface TabsPanelProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  stylex?: stylex.StyleXStyles;
}

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <TabsPrimitive.Content
        ref={ref}
        {...props}
        {...mergeStyles(stylex.props(styles.panel, stylexProp), className, style)}
      />
    );
  }
);
TabsPanel.displayName = 'Tabs.Panel';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Item: TabsItem,
  Panel: TabsPanel,
  Label: TabsLabel,
  Icon: TabsIcon,
});
