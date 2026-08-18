import React, { forwardRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Avatar.stylex';

// ---------------------------------------------------------------------------
// Types & Context
// ---------------------------------------------------------------------------

export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarTone = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'information';

interface AvatarContextValue {
  size: AvatarSize;
}

const AvatarContext = React.createContext<AvatarContextValue>({ size: 'medium' });

export function useAvatarContext() {
  return React.useContext(AvatarContext);
}

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface AvatarProps extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  size?: AvatarSize;
}

/**
 * Avatar
 *
 * A visual representation of a user or entity. Supports images, initials, or icons as fallback.
 */
const AvatarRoot = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = 'medium', style, children, ...props  }, ref) => {
    
    const sizeStyle = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    const resolvedRoot = stylex.props(styles.root, sizeStyle, style);
    const resolvedContainer = stylex.props(styles.container);

    return (
      <AvatarContext.Provider value={{ size }}>
        <div ref={ref} className={resolvedRoot.className} style={resolvedRoot.style}>
          <AvatarPrimitive.Root className={resolvedContainer.className} style={resolvedContainer.style} {...props}>
            {children}
          </AvatarPrimitive.Root>
        </div>
      </AvatarContext.Provider>
    );
  }
);
AvatarRoot.displayName = 'Avatar';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface AvatarImageProps extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;}

const AvatarImage = forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
  ({ style, ...props  }, ref) => {
    const resolved = stylex.props(styles.image, style);
    return (
      <AvatarPrimitive.Image 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
AvatarImage.displayName = 'Avatar.Image';


export interface AvatarFallbackProps extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  tone?: AvatarTone;
}

const AvatarFallback = forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
  ({ tone = 'neutral', style, ...props  }, ref) => {
    const toneStyle = styles[`tone${tone.charAt(0).toUpperCase() + tone.slice(1)}` as keyof typeof styles];
    const resolved = stylex.props(styles.fallbackBase, toneStyle, style);

    return (
      <AvatarPrimitive.Fallback 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
AvatarFallback.displayName = 'Avatar.Fallback';


export interface AvatarBadgeProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  position?: 'bottom-right' | 'top-right';
  withRing?: boolean;
}

const AvatarBadge = forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ position = 'bottom-right', withRing = true, style, children, ...props  }, ref) => {
    
    const positionStyle = position === 'bottom-right' ? styles.badgeBottomRight : styles.badgeTopRight;
    const resolved = stylex.props(
      styles.badgeContainer, 
      positionStyle,
      withRing && styles.badgeRing
    , style);

    return (
      <span 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      >
        {children}
      </span>
    );
  }
);
AvatarBadge.displayName = 'Avatar.Badge';

// ---------------------------------------------------------------------------
// Group Component (Stack)
// ---------------------------------------------------------------------------

export interface AvatarGroupProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  limit?: number;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ limit, style, children, ...props  }, ref) => {
    const resolved = stylex.props(styles.group, style);
    
    const childrenArray = React.Children.toArray(children);
    const showMore = limit !== undefined && childrenArray.length > limit;
    const visibleChildren = showMore ? childrenArray.slice(0, limit) : childrenArray;
    const hiddenCount = showMore ? childrenArray.length - limit : 0;

    return (
      <div 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      >
        {visibleChildren.map((child, index) => {
          const isFirst = index === 0;
          const zIndex = childrenArray.length - index;
          const itemResolved = stylex.props(
            styles.groupItem, 
            !isFirst && styles.groupItemOverlap
          );
          
          return (
            <div key={index} className={itemResolved.className} style={{ ...itemResolved.style, zIndex }}>
              {child}
            </div>
          );
        })}
        
        {showMore && (
          <div 
            className={stylex.props(styles.groupItem, styles.groupItemOverlap).className} 
            style={{ ...stylex.props(styles.groupItem, styles.groupItemOverlap).style, zIndex: 0 }}
          >
            {/* We render a generic Avatar to display the remaining count */}
            <AvatarRoot>
              <AvatarFallback tone="neutral">
                +{hiddenCount}
              </AvatarFallback>
            </AvatarRoot>
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';

// ---------------------------------------------------------------------------
// Labelled layout component
// ---------------------------------------------------------------------------

export interface AvatarLabelProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
  title: string;
  description?: string;
  avatarSize?: AvatarSize; // Needed to scale text appropriately if needed
}

const AvatarLabel = forwardRef<HTMLDivElement, AvatarLabelProps>(
  ({ title, description, avatarSize = 'medium', style, children, ...props  }, ref) => {
    const resolvedLayout = stylex.props(styles.labelled, style);
    const resolvedContainer = stylex.props(styles.labelContainer);
    
    // Dynamic text sizes based on avatar size
    const titleSize = avatarSize === 'small' ? '14px' : avatarSize === 'large' ? '15px' : '14px';
    const descSize = avatarSize === 'small' ? '12px' : avatarSize === 'large' ? '13px' : '12.5px';
    const lineHeight = avatarSize === 'large' ? 1.35 : 1.3;

    return (
      <div 
        ref={ref} 
        className={resolvedLayout.className}
        style={resolvedLayout.style}
        {...props} 
      >
        {children}
        <div className={resolvedContainer.className} style={resolvedContainer.style}>
          <p {...stylex.props(styles.labelTitle)} style={{ fontSize: titleSize, lineHeight } as React.CSSProperties}>
            {title}
          </p>
          {description && (
            <p {...stylex.props(styles.labelDescription)} style={{ fontSize: descSize, lineHeight } as React.CSSProperties}>
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);
AvatarLabel.displayName = 'Avatar.Label';


// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Badge: AvatarBadge,
  Label: AvatarLabel,
});

export { AvatarGroup };
