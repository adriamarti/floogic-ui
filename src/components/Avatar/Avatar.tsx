import React, { forwardRef } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as stylex from '@stylexjs/stylex';
import { styles, dynamicStyles } from './Avatar.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

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

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  stylex?: stylex.StyleXStyles;
  size?: AvatarSize;
}

/**
 * Avatar
 *
 * A visual representation of a user or entity. Supports images, initials, or icons as fallback.
 */
const AvatarRoot = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = 'medium', stylex: stylexProp, className, style, children, ...props }, ref) => {
    const sizeStyle = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    const resolvedContainer = stylex.props(styles.container);

    const avatarChildren: React.ReactNode[] = [];
    const badgeChildren: React.ReactNode[] = [];

    const processChild = (child: React.ReactNode) => {
      if (!child) return;
      if (React.isValidElement(child)) {
        if (child.type === React.Fragment) {
          React.Children.forEach((child.props as any).children, processChild);
        } else if (child.type === AvatarBadge || (child.type as any)?.displayName === 'Avatar.Badge') {
          badgeChildren.push(child);
        } else {
          avatarChildren.push(child);
        }
      } else {
        avatarChildren.push(child);
      }
    };

    React.Children.forEach(children, processChild);

    return (
      <AvatarContext.Provider value={{ size }}>
        <div 
          ref={ref} 
          {...mergeStyles(stylex.props(styles.root, sizeStyle, stylexProp), className, style)}
        >
          <AvatarPrimitive.Root className={resolvedContainer.className} style={resolvedContainer.style} {...props}>
            {avatarChildren}
          </AvatarPrimitive.Root>
          {badgeChildren}
        </div>
      </AvatarContext.Provider>
    );
  }
);
AvatarRoot.displayName = 'Avatar';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  stylex?: stylex.StyleXStyles;
}

const AvatarImage = forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <AvatarPrimitive.Image 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.image, stylexProp), className, style)}
      />
    );
  }
);
AvatarImage.displayName = 'Avatar.Image';

export interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  stylex?: stylex.StyleXStyles;
  tone?: AvatarTone;
}

const AvatarFallback = forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
  ({ tone = 'neutral', stylex: stylexProp, className, style, ...props }, ref) => {
    const toneStyle = styles[`tone${tone.charAt(0).toUpperCase() + tone.slice(1)}` as keyof typeof styles];

    return (
      <AvatarPrimitive.Fallback 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.fallbackBase, toneStyle, stylexProp), className, style)}
      />
    );
  }
);
AvatarFallback.displayName = 'Avatar.Fallback';

export interface AvatarBadgeProps extends React.ComponentPropsWithoutRef<'span'> {
  stylex?: stylex.StyleXStyles;
  position?: 'bottom-right' | 'top-right';
  withRing?: boolean;
}

const AvatarBadge = forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ position = 'bottom-right', withRing = true, stylex: stylexProp, className, style, children, ...props }, ref) => {
    const positionStyle = position === 'bottom-right' ? styles.badgeBottomRight : styles.badgeTopRight;

    return (
      <span 
        ref={ref} 
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.badgeContainer, 
            positionStyle,
            withRing && styles.badgeRing,
            stylexProp
          ),
          className,
          style
        )}
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

export interface AvatarGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
  limit?: number;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ limit, stylex: stylexProp, className, style, children, role = 'group', ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const showMore = limit !== undefined && childrenArray.length > limit;
    const visibleChildren = showMore ? childrenArray.slice(0, limit) : childrenArray;
    const hiddenCount = showMore ? childrenArray.length - limit : 0;

    return (
      <div 
        ref={ref} 
        role={role}
        {...props}
        {...mergeStyles(stylex.props(styles.group, stylexProp), className, style)}
      >
        {visibleChildren.map((child, index) => {
          const isFirst = index === 0;
          const zIndex = childrenArray.length - index;
          const itemResolved = stylex.props(
            styles.groupItem, 
            !isFirst && styles.groupItemOverlap,
            dynamicStyles.zIndex(zIndex)
          );
          
          return (
            <div key={index} className={itemResolved.className} style={itemResolved.style}>
              {child}
            </div>
          );
        })}
        
        {showMore && (
          <div 
            {...stylex.props(styles.groupItem, styles.groupItemOverlap, dynamicStyles.zIndex(0))}
          >
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
AvatarGroup.displayName = 'Avatar.Group';

// ---------------------------------------------------------------------------
// Labelled layout component
// ---------------------------------------------------------------------------

export interface AvatarLabelProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
  title: string;
  description?: string;
  avatarSize?: AvatarSize;
}

const AvatarLabel = forwardRef<HTMLDivElement, AvatarLabelProps>(
  ({ title, description, avatarSize = 'medium', stylex: stylexProp, className, style, children, ...props }, ref) => {
    const resolvedContainer = stylex.props(styles.labelContainer);
    
    const titleStyle = avatarSize === 'small' ? styles.labelTitleSmall : avatarSize === 'large' ? styles.labelTitleLarge : styles.labelTitleMedium;
    const descStyle = avatarSize === 'small' ? styles.labelDescriptionSmall : avatarSize === 'large' ? styles.labelDescriptionLarge : styles.labelDescriptionMedium;

    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.labelled, stylexProp), className, style)}
      >
        {children}
        <div className={resolvedContainer.className} style={resolvedContainer.style}>
          <p {...stylex.props(styles.labelTitle, titleStyle)}>
            {title}
          </p>
          {description && (
            <p {...stylex.props(styles.labelDescription, descStyle)}>
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
  Group: AvatarGroup,
});
