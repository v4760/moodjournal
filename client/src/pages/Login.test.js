import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

jest.mock('axios');


test('renders login form and submits', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });

  // Simulate typing
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Check values
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');

  axios.post.mockResolvedValue({
    data: { success: true } // or whatever your API returns
  });

  // Optionally, simulate submit
  fireEvent.click(loginButton);
});
