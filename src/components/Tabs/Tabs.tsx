import * as stylex from '@stylexjs/stylex';
import React, { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { styles } from './Tabs.stylex';

// ---------------------------------------------------------------------------
// Sub-components (Tabs.Label, Tabs.Icon)
// ---------------------------------------------------------------------------

export interface TabsLabelProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const TabsLabel = forwardRef<HTMLSpanElement, TabsLabelProps>(
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
TabsLabel.displayName = 'Tabs.Label';

export interface TabsIconProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const TabsIcon = forwardRef<HTMLSpanElement, TabsIconProps>(
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
TabsIcon.displayName = 'Tabs.Icon';

// ---------------------------------------------------------------------------
// Context & Root
// ---------------------------------------------------------------------------

const TabsContext = React.createContext<{ value: string; size: 'small' | 'medium' }>({ value: '', size: 'medium' });

export interface TabsProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  size?: 'small' | 'medium';
}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  ({ value, defaultValue, onValueChange, size = 'medium', style, ...props }, ref) => {
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
          {...stylex.props(styles.root, style)}
        />
      </TabsContext.Provider>
    );
  }
);
TabsRoot.displayName = 'Tabs';

export interface TabsListProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ style, ...props }, ref) => {
    return (
      <TabsPrimitive.List
        ref={ref}
        {...props}
        {...stylex.props(styles.list, style)}
      />
    );
  }
);
TabsList.displayName = 'Tabs.List';

export interface TabsItemProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const TabsItem = forwardRef<HTMLButtonElement, TabsItemProps>(
  ({ style, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const isActive = context.value === value;

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        value={value}
        {...props}
        {...stylex.props(
          styles.item, 
          context.size === 'medium' ? styles.itemMedium : styles.itemSmall,
          isActive && styles.itemActive, 
          style
        )}
      />
    );
  }
);
TabsItem.displayName = 'Tabs.Item';

export interface TabsPanelProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ style, ...props }, ref) => {
    return (
      <TabsPrimitive.Content
        ref={ref}
        {...props}
        {...stylex.props(styles.panel, style)}
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
