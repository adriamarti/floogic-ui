import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider Component', () => {
  it('renders horizontal decorative divider by default', () => {
    const { container } = render(<Divider data-testid="divider" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
