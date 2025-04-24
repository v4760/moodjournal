import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateEntry from './CreateEntry';
import { BrowserRouter } from 'react-router-dom';

describe('CreateEntry Component', () => {
  it('renders the form heading correctly', () => {
    render(
      <BrowserRouter>
        <CreateEntry />
      </BrowserRouter>
    );

    const heading = screen.getByText(/Create New Journal Entry/i);
    expect(heading).toBeInTheDocument();
  });
});