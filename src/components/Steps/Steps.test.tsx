import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Steps } from './Steps';

describe('Steps Component', () => {
  it('renders current step label and progressbar', () => {
    render(<Steps currentStep={2} totalSteps={4} />);

    expect(screen.getByText('Step 2 of 4')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
  });

  it('renders back button and handles onBack', () => {
    const handleBack = vi.fn();
    render(<Steps currentStep={2} totalSteps={4} onBack={handleBack} />);

    const backBtn = screen.getByRole('button', { name: 'Go back to previous step' });
    fireEvent.click(backBtn);

    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
