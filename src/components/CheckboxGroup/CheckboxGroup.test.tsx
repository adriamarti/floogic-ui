import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheckboxGroup } from './CheckboxGroup';

describe('CheckboxGroup Component', () => {
  it('renders label and items', () => {
    render(
      <CheckboxGroup defaultValue={['opt1']}>
        <CheckboxGroup.Label>Select Preferences</CheckboxGroup.Label>
        <CheckboxGroup.Item value="opt1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="opt2">Option 2</CheckboxGroup.Item>
      </CheckboxGroup>
    );

    expect(screen.getByText('Select Preferences')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('triggers onValueChange when item checked state toggles', () => {
    const handleValueChange = vi.fn();
    render(
      <CheckboxGroup value={['opt1']} onValueChange={handleValueChange}>
        <CheckboxGroup.Label>Select Preferences</CheckboxGroup.Label>
        <CheckboxGroup.Item value="opt1">Option 1</CheckboxGroup.Item>
        <CheckboxGroup.Item value="opt2">Option 2</CheckboxGroup.Item>
      </CheckboxGroup>
    );

    const checkbox2 = screen.getByRole('checkbox', { name: 'Option 2' });
    fireEvent.click(checkbox2);

    expect(handleValueChange).toHaveBeenCalledWith(['opt1', 'opt2']);
  });
});
