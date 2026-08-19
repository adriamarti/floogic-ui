import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton Component', () => {
  it('renders button with accessible aria-label and icon child', () => {
    const handleClick = vi.fn();
    render(
      <IconButton aria-label="Close dialog" onClick={handleClick}>
        <svg data-testid="icon-svg"><path d="M0 0" /></svg>
      </IconButton>
    );

    const btn = screen.getByRole('button', { name: 'Close dialog' });
    expect(btn).toBeInTheDocument();
    expect(screen.getByTestId('icon-svg')).toBeInTheDocument();

    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
