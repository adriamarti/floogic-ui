import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BadgeCount } from './BadgeCount';

describe('BadgeCount Component', () => {
  it('renders count number correctly', () => {
    render(<BadgeCount count={5} tone="error" />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders max threshold when count exceeds max', () => {
    render(<BadgeCount count={150} max={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not render when count is 0 and showZero is false', () => {
    const { container } = render(<BadgeCount count={0} showZero={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders 0 when count is 0 and showZero is true', () => {
    render(<BadgeCount count={0} showZero={true} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
