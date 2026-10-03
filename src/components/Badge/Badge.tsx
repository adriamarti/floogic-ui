import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Badge.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export type BadgeTone = 'error' | 'warning' | 'success' | 'information' | 'neutral' | 'brand';
export type BadgeSize = 'small' | 'medium' | 'large';

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

export interface BadgeLabelProps extends React.ComponentPropsWithoutRef<'span'> {
  stylex?: stylex.StyleXStyles;
}

const BadgeLabel = forwardRef<HTMLSpanElement, BadgeLabelProps>(
  ({ stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <span 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.label, stylexProp), className, style)}
      />
    );
  }
);
BadgeLabel.displayName = 'Badge.Label';

export interface BadgeIconProps extends React.ComponentPropsWithoutRef<'span'> {
  stylex?: stylex.StyleXStyles;
}

const BadgeIcon = forwardRef<HTMLSpanElement, BadgeIconProps>(
  ({ stylex: stylexProp, className, style, children, ...props }, ref) => {
    const { tone, size } = useBadgeContext();
    
    const sizeStyle = styles[`icon${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    const toneStyle = styles[`icon_${tone}` as keyof typeof styles];

    return (
      <span 
        ref={ref} 
        aria-hidden="true"
        {...props}
        {...mergeStyles(stylex.props(styles.icon, sizeStyle, toneStyle, stylexProp), className, style)}
      >
        {children}
      </span>
    );
  }
);
BadgeIcon.displayName = 'Badge.Icon';

// ---------------------------------------------------------------------------
// Root Component
// ---------------------------------------------------------------------------

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: BadgeSize;
  stylex?: stylex.StyleXStyles;
}

/**
 * Badge
 *
 * A display-only element used to indicate status.
 */
const BadgeRoot = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = 'neutral', size = 'medium', stylex: stylexProp, className, style, children, ...props }, ref) => {
    const sizeStyle = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    const toneStyle = styles[tone];

    return (
      <BadgeContext.Provider value={{ tone, size }}>
        <span
          ref={ref}
          {...props}
          {...mergeStyles(
            stylex.props(
              styles.root,
              sizeStyle,
              toneStyle,
              stylexProp
            ),
            className,
            style
          )}
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
