import * as stylex from '@stylexjs/stylex';
import React, { forwardRef } from 'react';
import { styles } from './ButtonGroup.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const ButtonGroupContext = React.createContext<boolean>(false);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface ButtonGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  stylex?: stylex.StyleXStyles;
}

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
  ({ stylex: stylexProp, className, style, children, role = 'group', ...props }, ref) => {
    return (
      <ButtonGroupContext.Provider value={true}>
        <div 
          ref={ref} 
          role={role}
          {...props}
          {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)}
        >
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
