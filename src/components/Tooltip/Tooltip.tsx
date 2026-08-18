import React, { forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Tooltip.stylex';

const Provider = TooltipPrimitive.Provider;

export type TooltipProps = TooltipPrimitive.TooltipProps;

const Root = TooltipPrimitive.Root;

export type TooltipTriggerProps = Omit<TooltipPrimitive.TooltipTriggerProps, 'style'> & {
  style?: stylex.StyleXStyles;
};

const Trigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ style, ...props }, ref) => {
    const resolved = stylex.props(style);
    return (
      <TooltipPrimitive.Trigger
        ref={ref}
        className={resolved.className}
        style={resolved.style}
        {...props}
      />
    );
  }
);
Trigger.displayName = 'Tooltip.Trigger';

export type TooltipContentProps = Omit<TooltipPrimitive.TooltipContentProps, 'style'> & {
  style?: stylex.StyleXStyles;
  showArrow?: boolean;
};

const Content = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ style, sideOffset = 4, showArrow = true, children, ...props }, ref) => {
    const sideClass = props.side === 'top' ? styles.sideTop :
                      props.side === 'right' ? styles.sideRight :
                      props.side === 'bottom' ? styles.sideBottom :
                      props.side === 'left' ? styles.sideLeft : null;

    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          {...stylex.props(styles.content, sideClass, style)}
          {...props}
        >
          {children}
          {showArrow && (
            <TooltipPrimitive.Arrow {...stylex.props(styles.arrow)} />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  }
);
Content.displayName = 'Tooltip.Content';

export const Tooltip = Object.assign(Root, {
  Provider,
  Trigger,
  Content,
});
