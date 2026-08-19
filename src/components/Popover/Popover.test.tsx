import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Popover } from './Popover';

describe('Popover Component', () => {
  it('renders trigger and open popover content', () => {
    render(
      <Popover open={true}>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content>Popover Body Content</Popover.Content>
      </Popover>
    );

    expect(screen.getByText('Open Popover')).toBeInTheDocument();
    expect(screen.getByText('Popover Body Content')).toBeInTheDocument();
  });
});
