import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders card title, content and footer', () => {
    render(
      <Card>
        <Card.Media src="image.png" alt="Card Header Media" />
        <Card.Content>
          <Card.Heading>Card Title</Card.Heading>
          <Card.Description>Card Description Body</Card.Description>
        </Card.Content>
        <Card.Footer>Card Footer</Card.Footer>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description Body')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
    expect(screen.getByAltText('Card Header Media')).toBeInTheDocument();
  });
});
