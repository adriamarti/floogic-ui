import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Toast } from './Toast';

describe('Toast Component', () => {
  it('renders open toast title and description', () => {
    render(
      <Toast.Provider>
        <Toast open={true} tone="success">
          <Toast.Title>Operation successful</Toast.Title>
          <Toast.Description>Your changes have been saved.</Toast.Description>
        </Toast>
        <Toast.Viewport />
      </Toast.Provider>
    );

    expect(screen.getByText('Operation successful')).toBeInTheDocument();
    expect(screen.getByText('Your changes have been saved.')).toBeInTheDocument();
  });
});
