import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';
import { Button } from '../Button';

describe('Modal Component', () => {
  it('renders open modal content with compound elements', () => {
    render(
      <Modal open={true}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Dialog Title</Modal.Title>
            <Modal.CloseButton aria-label="Close dialog" />
          </Modal.Header>
          <Modal.Body>
            <Modal.Description>Dialog body content</Modal.Description>
          </Modal.Body>
          <Modal.Footer>
            <Button>
              <Button.Label>Confirm</Button.Label>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );

    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog body content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('triggers onOpenChange when close button is clicked', () => {
    const handleOpenChange = vi.fn();
    render(
      <Modal open={true} onOpenChange={handleOpenChange}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Closeable Modal</Modal.Title>
            <Modal.CloseButton aria-label="Close dialog" />
          </Modal.Header>
        </Modal.Content>
      </Modal>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
