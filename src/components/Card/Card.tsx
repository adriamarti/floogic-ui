import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Card.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

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

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
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
  ({ layout = 'vertical', as: Component = 'div', reactive = false, stylex: stylexProp, className, style, children, ...props }, ref) => {
    const layoutStyle = layout === 'horizontal' ? styles.layoutHorizontal : styles.layoutVertical;
    const isInteractive = Component === 'button' || Component === 'a' || props.onClick;
    
    return (
      <CardContext.Provider value={{ layout }}>
        <Component 
          ref={ref as any} 
          {...props}
          {...mergeStyles(
            stylex.props(
              styles.root, 
              layoutStyle,
              isInteractive && !reactive && styles.rootInteractive,
              reactive && styles.rootReactive,
              stylexProp
            ),
            className,
            style
          )}
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

export interface CardMediaProps extends React.ComponentPropsWithoutRef<'img'> {
  stylex?: stylex.StyleXStyles;
}

const CardMedia = forwardRef<HTMLImageElement, CardMediaProps>(
  ({ stylex: stylexProp, className, style, alt = '', ...props }, ref) => {
    const { layout } = useCardContext();
    const layoutStyle = layout === 'horizontal' ? styles.mediaHorizontal : styles.mediaVertical;

    return (
      <img 
        ref={ref} 
        alt={alt}
        {...props}
        {...mergeStyles(stylex.props(styles.media, layoutStyle, stylexProp), className, style)}
      />
    );
  }
);
CardMedia.displayName = 'Card.Media';

export interface CardContentProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.content, stylexProp), className, style)}
      >
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'Card.Content';

export interface CardIconProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const CardIcon = forwardRef<HTMLDivElement, CardIconProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.iconContainer, stylexProp), className, style)}
      >
        {children}
      </div>
    );
  }
);
CardIcon.displayName = 'Card.Icon';

export interface CardHeadingProps extends React.ComponentPropsWithoutRef<'h3'> {
  stylex?: stylex.StyleXStyles;
}

const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    return (
      <h3 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.heading, stylexProp), className, style)}
      >
        {children}
      </h3>
    );
  }
);
CardHeading.displayName = 'Card.Heading';

export interface CardDescriptionProps extends React.ComponentPropsWithoutRef<'p'> {
  stylex?: stylex.StyleXStyles;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    return (
      <p 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.description, stylexProp), className, style)}
      >
        {children}
      </p>
    );
  }
);
CardDescription.displayName = 'Card.Description';

export interface CardFooterProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.footer, stylexProp), className, style)}
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
