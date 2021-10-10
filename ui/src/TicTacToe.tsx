import React, { FormEvent, useState } from "react";
import * as ticTacToeEngine from "./ticTacToeEngine"

function TicTacToe() {
  const [playerOneName, setPlayerOneName] = useState<string>("");
  const [playerTwoName, setPlayerTwoName] = useState<string>("");
  const [board, setBoard] = useState<ticTacToeEngine.Board | null>(null)

  const startGame = (e: FormEvent): void => {
    e.preventDefault();

    const newboard: ticTacToeEngine.Board = new ticTacToeEngine.Board(playerOneName);
    newboard.joinGame(playerTwoName);
    setBoard(newboard);
  }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {board === null ? 
        <form onSubmit={e => startGame(e)}>
          <label>
            Enter name for player one:
            <input type="text" 
              key="playerOneName"
              value={playerOneName}
              onChange={e => setPlayerOneName(e.target.value)} />
          </label>
          <label>
            Enter name for player two:
            <input type="text" 
              key="playerTwoName"
              value={playerTwoName}
              onChange={e => setPlayerTwoName(e.target.value)} />
          </label>
          <button 
            type="submit"
            disabled={playerOneName.length === 0 || playerTwoName.length === 0}>Start Game</button>
        </form> : <div>Start the game!</div>
      }
    </div>
  );
}

export default TicTacToe;
