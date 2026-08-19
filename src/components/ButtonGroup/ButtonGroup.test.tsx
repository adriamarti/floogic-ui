import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';

describe('ButtonGroup Component', () => {
  it('renders children within button group container', () => {
    render(
      <ButtonGroup>
        <Button><Button.Label>First</Button.Label></Button>
        <Button><Button.Label>Second</Button.Label></Button>
      </ButtonGroup>
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
