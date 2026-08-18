import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Card.stylex';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export type CardLayout = 'vertical' | 'horizontal';

interface CardContextValue {
  layout: CardLayout;
}

const CardContext = React.createContext<CardContextValue>({ layout: 'vertical' });

export function useCardContext() {
  return React.useContext(CardContext);
}

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface CardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  layout?: CardLayout;
  as?: React.ElementType;
  reactive?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Card
 *
 * Used to display content and actions on a single topic.
 */
const CardRoot = forwardRef<HTMLElement, CardProps>(
  ({ layout = 'vertical', as: Component = 'div', reactive = false, style, children, ...props  }, ref) => {
    
    const layoutStyle = layout === 'horizontal' ? styles.layoutHorizontal : styles.layoutVertical;
    const isInteractive = Component === 'button' || Component === 'a' || props.onClick;
    
    const resolved = stylex.props(
      styles.root, 
      layoutStyle,
      isInteractive && !reactive && styles.rootInteractive,
      reactive && styles.rootReactive
    , style);

    return (
      <CardContext.Provider value={{ layout }}>
        <Component 
          ref={ref as any} 
          className={resolved.className} 
          style={resolved.style} 
          {...props}
        >
          {children}
        </Component>
      </CardContext.Provider>
    );
  }
);
CardRoot.displayName = 'Card';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface CardMediaProps extends Omit<React.ComponentPropsWithoutRef<'img'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;}

const CardMedia = forwardRef<HTMLImageElement, CardMediaProps>(
  ({ style, alt = '', ...props  }, ref) => {
    const { layout } = useCardContext();
    const layoutStyle = layout === 'horizontal' ? styles.mediaHorizontal : styles.mediaVertical;
    const resolved = stylex.props(styles.media, layoutStyle, style);

    return (
      <img 
        ref={ref} 
        alt={alt}
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
CardMedia.displayName = 'Card.Media';


export interface CardContentProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ style, children, ...props  }, ref) => {
    const resolved = stylex.props(styles.content, style);
    return (
      <div 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      >
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'Card.Content';


export interface CardIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;}

const CardIcon = forwardRef<HTMLDivElement, CardIconProps>(
  ({ style, children, ...props  }, ref) => {
    const resolved = stylex.props(styles.iconContainer, style);
    return (
      <div 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      >
        {children}
      </div>
    );
  }
);
CardIcon.displayName = 'Card.Icon';


export interface CardHeadingProps extends Omit<React.ComponentPropsWithoutRef<'h3'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;}

const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(
  ({ style, children, ...props  }, ref) => {
    const resolved = stylex.props(styles.heading, style);
    return (
      <h3 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      >
        {children}
      </h3>
    );
  }
);
CardHeading.displayName = 'Card.Heading';


export interface CardDescriptionProps extends Omit<React.ComponentPropsWithoutRef<'p'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ style, children, ...props  }, ref) => {
    const resolved = stylex.props(styles.description, style);
    return (
      <p 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      >
        {children}
      </p>
    );
  }
);
CardDescription.displayName = 'Card.Description';


export interface CardFooterProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ style, children, ...props  }, ref) => {
    const resolved = stylex.props(styles.footer, style);
    return (
      <div 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'Card.Footer';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Card = Object.assign(CardRoot, {
  Media: CardMedia,
  Content: CardContent,
  Icon: CardIcon,
  Heading: CardHeading,
  Description: CardDescription,
  Footer: CardFooter,
});
