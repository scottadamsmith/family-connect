import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login button', () => {
  render(<App />);
  const loginButtonElement = screen.getByText(/login/i)
  expect(loginButtonElement).toBeInTheDocument();
});

test('renders logout button', () => {
  render(<App />);
  const loginButtonElement = screen.getByText(/logout/i)
  expect(loginButtonElement).toBeInTheDocument();
});

