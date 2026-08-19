import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tabs } from './Tabs';

describe('Tabs Component', () => {
  it('renders tab list and default panel correctly', () => {
    render(
      <Tabs defaultValue="account">
        <Tabs.List>
          <Tabs.Item value="account">Account</Tabs.Item>
          <Tabs.Item value="password">Password</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel value="account">Account Settings Panel</Tabs.Panel>
        <Tabs.Panel value="password">Password Settings Panel</Tabs.Panel>
      </Tabs>
    );

    expect(screen.getByText('Account Settings Panel')).toBeInTheDocument();
  });

  it('switches panel when tab item is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="account">
        <Tabs.List>
          <Tabs.Item value="account">Account</Tabs.Item>
          <Tabs.Item value="password">Password</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel value="account">Account Settings Panel</Tabs.Panel>
        <Tabs.Panel value="password">Password Settings Panel</Tabs.Panel>
      </Tabs>
    );

    const passwordTab = screen.getByRole('tab', { name: 'Password' });
    await user.click(passwordTab);

    expect(await screen.findByText('Password Settings Panel')).toBeInTheDocument();
  });
});
