export enum PlayerMark {
  X,
  O
}
export type Player = {
  name: string
  mark: PlayerMark
}

export class Board  {
  plays: Array<Player | undefined> = Object.seal((new Array<Player | undefined>(9).fill(undefined)))
  winner?: Player
  currentPlayer?: Player
  playerOne: Player
  playerTwo?: Player

  constructor(playerName: string) {
    this.playerOne = {
      name: playerName,
      mark: PlayerMark.X
    } as Player;

    this.currentPlayer = this.playerOne;

    return this;
  }

  joinGame(playerName: string) {
    this.playerTwo = {
      name: playerName,
      mark: PlayerMark.O
    } as Player;
  }

  getBoardMarks(): string {
    return this.plays.reduce<string>((result: string, playerMark: (Player | undefined)): string => {
      return `${result}${playerMark === undefined ? "." : PlayerMark[playerMark.mark]}`;
    }, "");
  } 
  
  setPlayerMark(player: Player, index: number): void {
    if (this.plays[index] !== undefined) {
      throw new Error("The position is already marked.")
    }

    this.plays[index] = player;

    const boardMarks = this.getBoardMarks();
    
    if (RegExp(/^(?:X..X..X..|.X..X..X.|..X..X..X|XXX......|...XXX...|......XXX|X...X...X|..X.X.X..)$/).test(boardMarks)) {
      this.winner = this.playerOne;
    } else if (RegExp(/^(?:O..O..O..|.O..O..O.|..O..O..O|OOO......|...OOO...|......OOO|O...O...O|..O.O.O..)$/).test(boardMarks)) {
      this.winner = this.playerTwo;
    } else {
      this.currentPlayer = player === this.playerOne ? this.playerTwo! : this.playerOne;
    }
  }
}