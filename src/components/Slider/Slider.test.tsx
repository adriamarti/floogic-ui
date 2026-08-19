import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from './Slider';

describe('Slider Component', () => {
  it('renders label and formatted value', () => {
    render(
      <Slider
        label="Volume"
        value={[50]}
        formatValue={(val) => `${val}%`}
      />
    );

    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});
