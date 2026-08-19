import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders label and icon correctly', () => {
    render(
      <Button variant="primary" tone="brand">
        <Button.Icon data-testid="button-icon">Icon</Button.Icon>
        <Button.Label>Click Me</Button.Label>
      </Button>
    );

    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByTestId('button-icon')).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick}>
        <Button.Label>Submit</Button.Label>
      </Button>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        <Button.Label>Disabled</Button.Label>
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
