import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as stylex from '@stylexjs/stylex';
import { styles } from './HoverCard.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

export interface HoverCardProps extends HoverCardPrimitive.HoverCardProps {}

const HoverCardRoot = ({ ...props }: HoverCardProps) => {
  return <HoverCardPrimitive.Root {...props} />;
};

export const HoverCardTrigger = HoverCardPrimitive.Trigger;

export interface HoverCardContentProps extends HoverCardPrimitive.HoverCardContentProps {
  stylex?: stylex.StyleXStyles;
}

export const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ children, side = 'bottom', sideOffset = 4, stylex: stylexProp, className, style, ...props }, ref) => {
    const sideStyle = 
      side === 'top' ? styles.sideTop :
      side === 'right' ? styles.sideRight :
      side === 'left' ? styles.sideLeft :
      styles.sideBottom;

    return (
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          ref={ref}
          side={side}
          sideOffset={sideOffset}
          {...props}
          {...mergeStyles(stylex.props(styles.content, sideStyle, stylexProp), className, style)}
        >
          {children}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    );
  }
);
HoverCardContent.displayName = 'HoverCard.Content';

export const HoverCard = Object.assign(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
});
