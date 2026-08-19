import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HoverCard } from './HoverCard';

describe('HoverCard Component', () => {
  it('renders trigger element correctly', () => {
    render(
      <HoverCard open={true}>
        <HoverCard.Trigger>Hover me</HoverCard.Trigger>
        <HoverCard.Content>Hover Content Preview</HoverCard.Content>
      </HoverCard>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.getByText('Hover Content Preview')).toBeInTheDocument();
  });
});
