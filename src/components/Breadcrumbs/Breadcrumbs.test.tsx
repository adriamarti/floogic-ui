import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs Component', () => {
  it('renders breadcrumb items correctly', () => {
    render(
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
        <Breadcrumbs.Item>Breadcrumbs</Breadcrumbs.Item>
      </Breadcrumbs>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('Breadcrumbs')).toBeInTheDocument();
  });

  it('collapses items when total exceeds itemsBeforeCollapse', async () => {
    const user = userEvent.setup();
    render(
      <Breadcrumbs itemsBeforeCollapse={2}>
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/category">Category</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/subcategory">Subcategory</Breadcrumbs.Item>
        <Breadcrumbs.Item>Current</Breadcrumbs.Item>
      </Breadcrumbs>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show path' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show path' }));

    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Subcategory')).toBeInTheDocument();
  });
});
