import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders expected navigation', () => {
  const { container } = render(<App />);

  const navItems: NodeListOf<Element> = container.querySelectorAll('nav ul li');
  const expectedNavItemTextContent = [
    /Tic Tac Toe/
  ]

  navItems.forEach((navItem: Element, index: number) => {
    expect(navItem).toHaveTextContent(expectedNavItemTextContent[index]);
  }); 
});

test('navigates to tic tac toe when clicked', () => {
  render(<App />);
  const navItem: Element = screen.getByText(/Tic Tac Toe/);
  fireEvent.click(navItem);
  expect(window.location.pathname).toBe("/tictactoe");
});