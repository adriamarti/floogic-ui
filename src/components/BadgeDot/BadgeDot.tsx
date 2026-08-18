import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './BadgeDot.stylex';

export type BadgeDotStatus = 'online' | 'busy' | 'away' | 'offline' | 'notification';
export type BadgeDotSize = 'small' | 'medium' | 'large';

export interface BadgeDotProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> {
  /**
   * The status type of the badge dot
   * @default 'online'
   */
  status?: BadgeDotStatus;
  /**
   * The size of the badge dot
   * @default 'medium'
   */
  size?: BadgeDotSize;
  style?: stylex.StyleXStyles;
}

const CheckIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 8L7 10.5L11.5 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MinusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 8H11.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const ClockIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V8L9.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrossIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BadgeDotRoot = forwardRef<HTMLSpanElement, BadgeDotProps>(
  ({ status = 'online', size = 'medium', style, ...props }, ref) => {

    const sizeStyle = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    const statusStyle = styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}` as keyof typeof styles];

    const resolved = stylex.props(
      styles.root,
      sizeStyle,
      statusStyle,
      style
    );

    const iconSize = size === 'large' ? 12 : size === 'medium' ? 8 : 0;
    
    // Notification and Small size do not show icons
    const showIcon = status !== 'notification' && size !== 'small';

    return (
      <span
        ref={ref}
        className={resolved.className}
        style={resolved.style}
        {...props}
      >
        {showIcon && (
          <>
            {status === 'online' && <CheckIcon size={iconSize} />}
            {status === 'busy' && <MinusIcon size={iconSize} />}
            {status === 'away' && <ClockIcon size={iconSize} />}
            {status === 'offline' && <CrossIcon size={iconSize} />}
          </>
        )}
      </span>
    );
  }
);

BadgeDotRoot.displayName = 'BadgeDot';

export const BadgeDot = Object.assign(BadgeDotRoot, {});
