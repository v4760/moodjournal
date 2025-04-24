import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { BrowserRouter } from 'react-router-dom';

describe('Dashboard Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  });

  it('renders the dashboard heading', () => {
    const heading = screen.getByText(/Your Journal/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders New Entry and Logout buttons', () => {
    const newEntryBtn = screen.getByRole('button', { name: /new entry/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    expect(newEntryBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('renders an empty list initially', () => {
    const items = screen.queryAllByRole('listitem');
    expect(items.length).toBe(0); // because entries array is initially empty
  });
});