import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BadgeDot } from './BadgeDot';

describe('BadgeDot Component', () => {
  it('renders badge dot with online status', () => {
    const { container } = render(<BadgeDot status="online" size="medium" data-testid="badge-dot" />);
    expect(container.querySelector('[data-testid="badge-dot"]')).toBeInTheDocument();
  });

  it('renders without icon for small size', () => {
    const { container } = render(<BadgeDot status="online" size="small" />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
