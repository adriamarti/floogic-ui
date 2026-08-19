import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Drawer } from './Drawer';

describe('Drawer Component', () => {
  it('renders open drawer content', () => {
    render(
      <Drawer open={true}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer Header Title</Drawer.Title>
            <Drawer.CloseButton aria-label="Close panel" />
          </Drawer.Header>
          <Drawer.Body>
            <Drawer.Description>Side panel body content</Drawer.Description>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    );

    expect(screen.getByText('Drawer Header Title')).toBeInTheDocument();
    expect(screen.getByText('Side panel body content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeInTheDocument();
  });
});
