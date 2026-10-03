import React, { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Accordion.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export type AccordionProps = (
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps
) & {
  stylex?: stylex.StyleXStyles;
};

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <AccordionPrimitive.Root 
        ref={ref} 
        {...(props as any)}
        {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)}
      />
    );
  }
);
AccordionRoot.displayName = 'Accordion';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  stylex?: stylex.StyleXStyles;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <AccordionPrimitive.Item 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.item, stylexProp), className, style)}
      />
    );
  }
);
AccordionItem.displayName = 'Accordion.Item';

export interface AccordionHeaderProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header> {
  stylex?: stylex.StyleXStyles;
}

const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <AccordionPrimitive.Header 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.header, stylexProp), className, style)}
      />
    );
  }
);
AccordionHeader.displayName = 'Accordion.Header';

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  stylex?: stylex.StyleXStyles;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const chevronResolved = stylex.props(styles.chevron);
    return (
      <AccordionPrimitive.Trigger 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.trigger, stylexProp), className, style)}
      >
        {children}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={chevronResolved.className}
          style={chevronResolved.style}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </AccordionPrimitive.Trigger>
    );
  }
);
AccordionTrigger.displayName = 'Accordion.Trigger';

export interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  stylex?: stylex.StyleXStyles;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const innerResolved = stylex.props(styles.contentInner);
    return (
      <AccordionPrimitive.Content 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.content, stylexProp), className, style)}
      >
        <div className={innerResolved.className} style={innerResolved.style}>
          {children}
        </div>
      </AccordionPrimitive.Content>
    );
  }
);
AccordionContent.displayName = 'Accordion.Content';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
