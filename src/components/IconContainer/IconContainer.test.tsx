import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IconContainer } from './IconContainer';

describe('IconContainer Component', () => {
  it('renders icon container with children', () => {
    render(
      <IconContainer tone="brand" variant="filled" shape="circle" size="md">
        <span data-testid="icon-content">Icon</span>
      </IconContainer>
    );

    expect(screen.getByTestId('icon-content')).toBeInTheDocument();
  });
});
