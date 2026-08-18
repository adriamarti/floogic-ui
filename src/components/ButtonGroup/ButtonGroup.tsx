import * as stylex from '@stylexjs/stylex';
import React, { forwardRef } from 'react';

import { styles } from './ButtonGroup.stylex';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const ButtonGroupContext = React.createContext<boolean>(false);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface ButtonGroupProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles;}

/**
 * ButtonGroup
 *
 * Groups multiple buttons together. Removes inner border radius and overlaps borders seamlessly.
 *
 * @example
 * <ButtonGroup>
 *   <Button>One</Button>
 *   <Button>Two</Button>
 * </ButtonGroup>
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ style, children, ...props  }, ref) => {
    const resolved = stylex.props(styles.root, style);
    return (
      <ButtonGroupContext.Provider value={true}>
        <div 
          ref={ref} 
          className={resolved.className}
          style={resolved.style}
          {...props}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
