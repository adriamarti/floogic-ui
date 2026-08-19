import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  it('renders page buttons and triggers page change', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />
    );

    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();

    const nextPageBtn = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextPageBtn);

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
