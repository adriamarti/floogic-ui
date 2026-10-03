import React, { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './BadgeDot.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

export type BadgeDotStatus = 'online' | 'busy' | 'away' | 'offline' | 'notification';
export type BadgeDotSize = 'small' | 'medium' | 'large';

export interface BadgeDotProps extends React.HTMLAttributes<HTMLSpanElement> {
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
  stylex?: stylex.StyleXStyles;
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
    <path d="M8 5V8L9.5 9.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrossIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BadgeDotRoot = forwardRef<HTMLSpanElement, BadgeDotProps>(
  ({ status = 'online', size = 'medium', stylex: stylexProp, className, style, ...props }, ref) => {
    const sizeStyle = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles];
    const statusStyle = styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}` as keyof typeof styles];

    const iconSize = size === 'large' ? 12 : size === 'medium' ? 8 : 0;
    
    // Notification and Small size do not show icons
    const showIcon = status !== 'notification' && size !== 'small';

    return (
      <span
        ref={ref}
        aria-hidden="true"
        {...props}
        {...mergeStyles(
          stylex.props(
            styles.root,
            sizeStyle,
            statusStyle,
            stylexProp
          ),
          className,
          style
        )}
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
