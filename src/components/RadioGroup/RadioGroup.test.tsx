import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup Component', () => {
  it('renders label and radio options', () => {
    render(
      <RadioGroup defaultValue="opt1">
        <RadioGroup.Label>Choose Plan</RadioGroup.Label>
        <RadioGroup.Item value="opt1">Basic Plan</RadioGroup.Item>
        <RadioGroup.Item value="opt2">Pro Plan</RadioGroup.Item>
      </RadioGroup>
    );

    expect(screen.getByText('Choose Plan')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByText('Basic Plan')).toBeInTheDocument();
    expect(screen.getByText('Pro Plan')).toBeInTheDocument();
  });

  it('handles value change on selection', () => {
    const handleValueChange = vi.fn();
    render(
      <RadioGroup value="opt1" onValueChange={handleValueChange}>
        <RadioGroup.Item value="opt1">Basic Plan</RadioGroup.Item>
        <RadioGroup.Item value="opt2">Pro Plan</RadioGroup.Item>
      </RadioGroup>
    );

    const proRadio = screen.getByRole('radio', { name: 'Pro Plan' });
    fireEvent.click(proRadio);

    expect(handleValueChange).toHaveBeenCalledWith('opt2');
  });
});
