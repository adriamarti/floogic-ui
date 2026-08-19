import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch Component', () => {
  it('renders switch field and label', () => {
    render(
      <Switch>
        <Switch.Label>Dark Mode</Switch.Label>
        <Switch.Field aria-label="Toggle dark mode" />
      </Switch>
    );

    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('handles toggle state changes', () => {
    const handleCheckedChange = vi.fn();
    render(
      <Switch>
        <Switch.Label>Notifications</Switch.Label>
        <Switch.Field checked={false} onCheckedChange={handleCheckedChange} />
      </Switch>
    );

    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(toggle);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });
});
