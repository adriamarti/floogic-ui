import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Badge.stylex';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export type BadgeTone = 'error' | 'warning' | 'success' | 'information' | 'neutral' | 'brand';
export type BadgeSize = 'small' | 'medium';

interface BadgeContextValue {
  tone: BadgeTone;
  size: BadgeSize;
}

const BadgeContext = React.createContext<BadgeContextValue>({ tone: 'neutral', size: 'medium' });

export function useBadgeContext() {
  return React.useContext(BadgeContext);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface BadgeLabelProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const BadgeLabel = forwardRef<HTMLSpanElement, BadgeLabelProps>(
  ({ style, ...props }, ref) => {
    const resolved = stylex.props(styles.label, style);
    return (
      <span 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      />
    );
  }
);
BadgeLabel.displayName = 'Badge.Label';


export interface BadgeIconProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;
}

const BadgeIcon = forwardRef<HTMLSpanElement, BadgeIconProps>(
  ({ style, children, ...props }, ref) => {
    const { tone, size } = useBadgeContext();
    
    const sizeStyle = styles[`icon${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    const toneStyle = styles[`icon_${tone}` as keyof typeof styles];

    const resolved = stylex.props(styles.icon, sizeStyle, toneStyle, style);

    return (
      <span 
        ref={ref} 
        className={resolved.className}
        style={resolved.style}
        {...props} 
      >
        {/* If children is an SVG, it will inherit the width/height/color from this span */}
        {children}
      </span>
    );
  }
);
BadgeIcon.displayName = 'Badge.Icon';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> {
  tone?: BadgeTone;
  size?: BadgeSize;
  style?: stylex.StyleXStyles;
}

/**
 * Badge
 *
 * A display-only element used to indicate status.
 */
const BadgeRoot = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = 'neutral', size = 'medium', style, children, ...props }, ref) => {

    const sizeStyle = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    const toneStyle = styles[tone];

    const resolved = stylex.props(
      styles.root,
      sizeStyle,
      toneStyle,
      style
    );

    return (
      <BadgeContext.Provider value={{ tone, size }}>
        <span
          ref={ref}
          className={resolved.className}
          style={resolved.style}
          {...props}
        >
          {children}
        </span>
      </BadgeContext.Provider>
    );
  }
);

BadgeRoot.displayName = 'Badge';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const Badge = Object.assign(BadgeRoot, {
  Label: BadgeLabel,
  Icon: BadgeIcon,
});
