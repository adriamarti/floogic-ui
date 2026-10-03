import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Popover.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

export interface PopoverProps extends PopoverPrimitive.PopoverProps {}

const PopoverRoot = ({ ...props }: PopoverProps) => {
  return <PopoverPrimitive.Root {...props} />;
};

export const PopoverTrigger = PopoverPrimitive.Trigger;

export interface PopoverContentProps extends PopoverPrimitive.PopoverContentProps {
  stylex?: stylex.StyleXStyles;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, side = 'bottom', sideOffset = 4, stylex: stylexProp, className, style, ...props }, ref) => {
    const sideStyle = 
      side === 'top' ? styles.sideTop :
      side === 'right' ? styles.sideRight :
      side === 'left' ? styles.sideLeft :
      styles.sideBottom;

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          {...props}
          {...mergeStyles(stylex.props(styles.content, sideStyle, stylexProp), className, style)}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);
PopoverContent.displayName = 'Popover.Content';

export const PopoverClose = PopoverPrimitive.Close;

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
});
