import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AlertGlobal } from './AlertGlobal';

describe('AlertGlobal Component', () => {
  it('renders global alert description and icon', () => {
    render(
      <AlertGlobal tone="brand" variant="solid">
        <AlertGlobal.Icon data-testid="global-alert-icon">Icon</AlertGlobal.Icon>
        <AlertGlobal.Content>
          <AlertGlobal.Description>Global banner notification</AlertGlobal.Description>
        </AlertGlobal.Content>
      </AlertGlobal>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByTestId('global-alert-icon')).toBeInTheDocument();
    expect(screen.getByText('Global banner notification')).toBeInTheDocument();
  });

  it('handles close button click', () => {
    const handleClose = vi.fn();
    render(
      <AlertGlobal tone="information">
        <AlertGlobal.Content>
          <AlertGlobal.Description>Info message</AlertGlobal.Description>
        </AlertGlobal.Content>
        <AlertGlobal.CloseButton aria-label="Dismiss banner" onClick={handleClose} />
      </AlertGlobal>
    );

    const closeBtn = screen.getByRole('button', { name: 'Dismiss banner' });
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
