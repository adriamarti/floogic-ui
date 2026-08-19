import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker Component', () => {
  it('renders trigger placeholder and label', () => {
    render(
      <DatePicker>
        <DatePicker.Label>Select Date</DatePicker.Label>
        <DatePicker.Trigger placeholder="Choose date..." />
      </DatePicker>
    );

    expect(screen.getByText('Select Date')).toBeInTheDocument();
    expect(screen.getByText('Choose date...')).toBeInTheDocument();
  });

  it('renders formatted selected date', () => {
    const selectedDate = new Date(2025, 0, 15);
    render(
      <DatePicker value={selectedDate}>
        <DatePicker.Trigger />
      </DatePicker>
    );

    expect(screen.getByText('15/01/2025')).toBeInTheDocument();
  });
});
