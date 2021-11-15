import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Start from './Start';

test('renders game setup form intially', () => {
  render(<Start />);

  const playerOneNameInput = screen.getByLabelText(/Enter name for player one/i);
  expect(playerOneNameInput).toBeInTheDocument();
  expect(playerOneNameInput).toHaveValue("");

  const playerTwoNameInput = screen.getByLabelText(/Enter name for player two/i);
  expect(playerTwoNameInput).toBeInTheDocument();
  expect(playerTwoNameInput).toHaveValue("");

  const startGameButton = screen.getByRole("button", {
    name: /Start Game/
  });
  expect(startGameButton).toBeInTheDocument();
  expect(startGameButton).toBeDisabled();
});

test('enables start game button when player names are entered', () => {
  render(<Start />);

  const startGameButton = screen.getByRole("button", {
    name: /Start Game/
  });

  const playerOneNameInput = screen.getByLabelText(/name for player one/);
  fireEvent.change(playerOneNameInput, { target: { value: "player1" } });

  expect(startGameButton).toBeDisabled();

  const playerTwoNameInput = screen.getByLabelText(/name for player two/);
  fireEvent.change(playerTwoNameInput, { target: { value: "player2" } });


  expect(startGameButton).not.toBeDisabled();
});

test('starts game', () => {
  render(<Start />);

  const startGameButton: HTMLElement = screen.getByRole("button", {
    name: /Start Game/
  });

  const playerOneNameInput = screen.getByLabelText(/name for player one/);
  fireEvent.change(playerOneNameInput, { target: { value: "player1" } });

  expect(startGameButton).toBeDisabled();

  const playerTwoNameInput = screen.getByLabelText(/name for player two/);
  fireEvent.change(playerTwoNameInput, { target: { value: "player2" } });

  fireEvent.click(startGameButton);

  expect(playerOneNameInput).not.toBeInTheDocument();
  expect(playerTwoNameInput).not.toBeInTheDocument();
  expect(startGameButton).not.toBeInTheDocument();

  const gameBoard = screen.getByText(/Start the game/);
  expect(gameBoard).toBeInTheDocument();
});

