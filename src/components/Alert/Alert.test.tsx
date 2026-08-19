import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert Component', () => {
  it('renders title, description and actions correctly', () => {
    render(
      <Alert tone="warning">
        <Alert.Content>
          <Alert.Heading>Warning Alert</Alert.Heading>
          <Alert.Description>This is a warning message.</Alert.Description>
        </Alert.Content>
      </Alert>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Warning Alert')).toBeInTheDocument();
    expect(screen.getByText('This is a warning message.')).toBeInTheDocument();
  });

  it('renders close button and handles click', () => {
    const handleClose = vi.fn();
    render(
      <Alert tone="error">
        <Alert.Content>
          <Alert.Heading>Error Alert</Alert.Heading>
        </Alert.Content>
        <Alert.CloseButton aria-label="Close alert" onClick={handleClose} />
      </Alert>
    );

    const closeBtn = screen.getByRole('button', { name: 'Close alert' });
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
