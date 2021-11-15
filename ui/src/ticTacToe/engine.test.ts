import * as engine from "./ticTacToe/engine"

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const allPlays: Array<number> = [...Array.from(Array<number>(9).keys())];

[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
].forEach((winnerPlays: Array<number>): void => {
  let remainingPlays: Array<number> = allPlays.filter((index: number) => {
    return (winnerPlays.find((winnerPlay: number) => {
      return winnerPlay === index;
    }) === undefined);
  });

  test(`has expected winner when player marks these positions [${winnerPlays.join(',')}]`, () => {
    const board = new game.Board("player1");
    board.joinGame("player2");

    while(!board.winner && winnerPlays.length && remainingPlays.length) {
      const winnerPlayIndex = getRandomInt(0, winnerPlays.length-1);
      const winnerPlay = winnerPlays.splice(winnerPlayIndex, 1)[0];

      const opponentPlayIndex = getRandomInt(0, remainingPlays.length-1);
      const opponentPlay = remainingPlays.splice(opponentPlayIndex, 1)[0];

      const winner = board.playerOne;
      const opponent = board.playerTwo!;
      board.setPlayerMark(winner, winnerPlay);
      board.setPlayerMark(opponent, opponentPlay);
    }

    expect(board.winner, board.getBoardMarks()).toBe(board.playerOne);
  });
});

test(`registers player one when calling constructor`, () => {
  const board = new game.Board("player1");
  expect(board.playerOne.name).toBe("player1");
});

test(`registers player two when they join game`, () => {
  const board = new game.Board("player1");
  board.joinGame("player2");
  expect(board.playerTwo!.name).toBe("player2");
});

test(`throws error if same play is made twice`, () => {
  const board = new game.Board("player1");
  board.joinGame("player2");

  board.setPlayerMark(board.playerOne, 2);
  expect(() => {
    board.setPlayerMark(board.playerTwo!, 2);
  }).toThrow();
});

[
  [0,4,8,6,2,5,3,1,7],
  [2,6,0,1,3,4,7,5,8],
  [3,4,5,6,7,8,0,1,2],
].forEach((drawPlays: Array<number>): void => {
  test(`ends in a draw when sequence of marks is [${drawPlays.join(',')}]`, () => {
    const board = new game.Board("player1");
    board.joinGame("player2");

    drawPlays.forEach((value: number, index: number) => {
      const player = index%2 ? board.playerTwo! : board.playerOne;
      board.setPlayerMark(player, value);
    });

    expect(board.winner).toBeUndefined()
  });
});

