import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  it('renders fallback initials when image is absent', () => {
    render(
      <Avatar size="medium">
        <Avatar.Fallback tone="brand">JD</Avatar.Fallback>
      </Avatar>
    );

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders Avatar.Label with title and description', () => {
    render(
      <Avatar.Label title="Jane Doe" description="Software Engineer">
        <Avatar>
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
      </Avatar.Label>
    );

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders Avatar.Group with limit overflow', () => {
    render(
      <Avatar.Group limit={2}>
        <Avatar><Avatar.Fallback>A</Avatar.Fallback></Avatar>
        <Avatar><Avatar.Fallback>B</Avatar.Fallback></Avatar>
        <Avatar><Avatar.Fallback>C</Avatar.Fallback></Avatar>
      </Avatar.Group>
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.queryByText('C')).not.toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });
});
