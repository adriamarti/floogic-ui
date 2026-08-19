import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from './Progress';

describe('Progress Component', () => {
  it('renders progress bar with label when showLabel is true', () => {
    render(<Progress value={45} showLabel={true} />);
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('clamps progress value between 0 and 100', () => {
    render(<Progress value={150} showLabel={true} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
