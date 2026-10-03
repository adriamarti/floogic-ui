import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Steps.stylex';
import { mergeStyles } from '../../utils/mergeStyles';

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The current step (1-indexed) */
  currentStep: number;
  /** The total number of steps */
  totalSteps: number;
  /** Callback fired when the back button is clicked. If not provided, the back button is hidden. */
  onBack?: () => void;
  stylex?: stylex.StyleXStyles;
}

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
  </svg>
);

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ currentStep, totalSteps, onBack, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        aria-label={`Step ${currentStep} of ${totalSteps}`}
        {...props} 
        {...mergeStyles(stylex.props(styles.container, stylexProp), className, style)}
      >
        <div {...stylex.props(styles.label)} aria-hidden="true">
          Step {currentStep} of {totalSteps}
        </div>
        
        <div {...stylex.props(styles.trackContainer)} role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isActive = index < currentStep;
            return (
              <div
                key={index}
                {...stylex.props(styles.segment, isActive && styles.segmentActive)}
              />
            );
          })}
        </div>

        {onBack && (
          <button 
            type="button" 
            onClick={onBack} 
            {...stylex.props(styles.backButton)}
            aria-label="Go back to previous step"
          >
            <ArrowLeftIcon />
            Back
          </button>
        )}
      </div>
    );
  }
);

Steps.displayName = 'Steps';
