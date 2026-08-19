import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Accordion } from './Accordion';

describe('Accordion Component', () => {
  it('renders accordion items and triggers', () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Header>
            <Accordion.Trigger>Item 1 Trigger</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Item 1 Content</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Header>
            <Accordion.Trigger>Item 2 Trigger</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Item 2 Content</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    expect(screen.getByText('Item 1 Trigger')).toBeInTheDocument();
    expect(screen.getByText('Item 1 Content')).toBeInTheDocument();
    expect(screen.getByText('Item 2 Trigger')).toBeInTheDocument();
  });

  it('expands accordion content on click', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Header>
            <Accordion.Trigger>Toggle Item 1</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Expandable Content</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const trigger = screen.getByRole('button', { name: /Toggle Item 1/i });
    await user.click(trigger);

    expect(await screen.findByText('Expandable Content')).toBeInTheDocument();
  });
});
