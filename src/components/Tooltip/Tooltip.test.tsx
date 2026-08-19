import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip Component', () => {
  it('renders trigger element correctly', () => {
    render(
      <Tooltip.Provider>
        <Tooltip open={true}>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Content>Tooltip text content</Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.getByText('Tooltip text content')).toBeInTheDocument();
  });
});
