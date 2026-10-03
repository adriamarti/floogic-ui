import React, { forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Tooltip.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

export type TooltipProviderProps = TooltipPrimitive.TooltipProviderProps;

const Provider = ({
  delayDuration = 200,
  skipDelayDuration = 300,
  disableHoverableContent = true,
  children,
  ...props
}: TooltipProviderProps) => (
  <TooltipPrimitive.Provider
    delayDuration={delayDuration}
    skipDelayDuration={skipDelayDuration}
    disableHoverableContent={disableHoverableContent}
    {...props}
  >
    {children}
  </TooltipPrimitive.Provider>
);

export type TooltipProps = TooltipPrimitive.TooltipProps;

const Root = ({
  delayDuration = 200,
  disableHoverableContent = true,
  children,
  ...props
}: TooltipProps) => (
  <TooltipPrimitive.Root
    delayDuration={delayDuration}
    disableHoverableContent={disableHoverableContent}
    {...props}
  >
    {children}
  </TooltipPrimitive.Root>
);

export interface TooltipTriggerProps extends TooltipPrimitive.TooltipTriggerProps {
  stylex?: stylex.StyleXStyles;
}

const Trigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <TooltipPrimitive.Trigger
        ref={ref}
        {...props}
        {...mergeStyles(stylexProp ? stylex.props(stylexProp) : undefined, className, style)}
      />
    );
  }
);
Trigger.displayName = 'Tooltip.Trigger';

export interface TooltipContentProps extends TooltipPrimitive.TooltipContentProps {
  stylex?: stylex.StyleXStyles;
  showArrow?: boolean;
}

const Content = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ stylex: stylexProp, className, style, sideOffset = 4, showArrow = true, children, ...props }, ref) => {
    const sideClass = props.side === 'top' ? styles.sideTop :
                      props.side === 'right' ? styles.sideRight :
                      props.side === 'bottom' ? styles.sideBottom :
                      props.side === 'left' ? styles.sideLeft : null;

    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          {...props}
          {...mergeStyles(stylex.props(styles.content, sideClass, stylexProp), className, style)}
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
