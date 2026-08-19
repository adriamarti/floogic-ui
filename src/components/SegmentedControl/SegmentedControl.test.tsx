import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SegmentedControl } from './SegmentedControl';

describe('SegmentedControl Component', () => {
  it('renders items and handles selection', () => {
    const handleValueChange = vi.fn();
    render(
      <SegmentedControl defaultValue="day" onValueChange={handleValueChange}>
        <SegmentedControl.Item value="day">
          <SegmentedControl.Label>Day</SegmentedControl.Label>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="week">
          <SegmentedControl.Label>Week</SegmentedControl.Label>
        </SegmentedControl.Item>
      </SegmentedControl>
    );

    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();

    const weekBtn = screen.getByRole('radio', { name: 'Week' });
    fireEvent.click(weekBtn);

    expect(handleValueChange).toHaveBeenCalledWith('week');
  });
});
