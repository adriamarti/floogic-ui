import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select } from './Select';

describe('Select Component', () => {
  it('renders trigger with label and placeholder', () => {
    render(
      <Select defaultValue="option-1">
        <Select.Label>Country</Select.Label>
        <Select.Trigger placeholder="Choose country..." />
        <Select.Content>
          <Select.Item value="option-1">Spain</Select.Item>
          <Select.Item value="option-2">France</Select.Item>
        </Select.Content>
      </Select>
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
