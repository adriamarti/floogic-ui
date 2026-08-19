import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TextInput } from './TextInput';

describe('TextInput Component', () => {
  it('associates label with input field', () => {
    render(
      <TextInput required>
        <TextInput.Label>Email Address</TextInput.Label>
        <TextInput.Field placeholder="user@example.com" />
      </TextInput>
    );

    const input = screen.getByPlaceholderText('user@example.com');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    const handleChange = vi.fn();
    render(
      <TextInput>
        <TextInput.Label>Username</TextInput.Label>
        <TextInput.Field placeholder="Username" onChange={handleChange} />
      </TextInput>
    );

    const input = screen.getByPlaceholderText('Username');
    fireEvent.change(input, { target: { value: 'john_doe' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders error message when invalid is true', () => {
    render(
      <TextInput invalid>
        <TextInput.Label>Password</TextInput.Label>
        <TextInput.Field placeholder="Password" />
        <TextInput.Error>Password is required</TextInput.Error>
      </TextInput>
    );

    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
});
