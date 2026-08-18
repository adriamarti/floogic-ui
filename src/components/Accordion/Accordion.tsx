import React, { forwardRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Accordion.stylex';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export type AccordionProps = (
  | Omit<AccordionPrimitive.AccordionSingleProps, 'className' | 'style'>
  | Omit<AccordionPrimitive.AccordionMultipleProps, 'className' | 'style'>
) & {
  style?: stylex.StyleXStyles;
};

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  ({ style, ...props  }, ref) => {
    const resolved = stylex.props(styles.root, style);
    return (
      <AccordionPrimitive.Root 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
AccordionRoot.displayName = 'Accordion';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface AccordionItemProps extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ style, ...props  }, ref) => {
    const resolved = stylex.props(styles.item, style);
    return (
      <AccordionPrimitive.Item 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
AccordionItem.displayName = 'Accordion.Item';

export interface AccordionHeaderProps extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  ({ style, ...props  }, ref) => {
    const resolved = stylex.props(styles.header, style);
    return (
      <AccordionPrimitive.Header 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
AccordionHeader.displayName = 'Accordion.Header';

export interface AccordionTriggerProps extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ style, children, ...props  }, ref) => {
    const resolved = stylex.props(styles.trigger, style);
    const chevronResolved = stylex.props(styles.chevron);
    return (
      <AccordionPrimitive.Trigger 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
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

export interface AccordionContentProps extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ style, children, ...props  }, ref) => {
    const resolved = stylex.props(styles.content, style);
    const innerResolved = stylex.props(styles.contentInner);
    return (
      <AccordionPrimitive.Content 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
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
