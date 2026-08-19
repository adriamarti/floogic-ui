import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TextArea } from './TextArea';

describe('TextArea Component', () => {
  it('renders label and textarea field', () => {
    render(
      <TextArea required>
        <TextArea.Label>Comments</TextArea.Label>
        <TextArea.Field placeholder="Write your comments here..." />
      </TextArea>
    );

    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your comments here...')).toBeInTheDocument();
  });

  it('updates text value on change', () => {
    const handleChange = vi.fn();
    render(
      <TextArea>
        <TextArea.Field placeholder="Feedback" onChange={handleChange} />
      </TextArea>
    );

    const textarea = screen.getByPlaceholderText('Feedback');
    fireEvent.change(textarea, { target: { value: 'Great library!' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
