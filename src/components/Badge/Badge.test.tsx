import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders badge label and icon', () => {
    render(
      <Badge tone="success" size="medium">
        <Badge.Icon data-testid="badge-icon">✓</Badge.Icon>
        <Badge.Label>Active</Badge.Label>
      </Badge>
    );

    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
  });
});
