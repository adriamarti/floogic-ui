import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Typography } from './Typography';

describe('Typography Component', () => {
  it('renders heading with default tag for h1 variant', () => {
    render(<Typography variant="h1">Heading Level 1</Typography>);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Heading Level 1');
  });

  it('renders paragraph for body variant', () => {
    render(<Typography variant="body">Body paragraph text</Typography>);
    expect(screen.getByText('Body paragraph text')).toBeInTheDocument();
  });
});
