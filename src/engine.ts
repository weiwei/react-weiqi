enum Pos {
  EMPTY = 0,
  BLACK = 1,
  WHITE = 2
}

export default class Board {
  private currentColor: Pos;
  private size: number;
  private board: any;
  private lastMovePassed: boolean;
  private inAtari: boolean;
  private isSuicideAttempt: boolean;

  constructor(size: number) {
    this.currentColor = Pos.BLACK;
    this.size = size;
    this.board = this.createBoard(size);
    this.lastMovePassed = false;
    this.inAtari = false;
    this.isSuicideAttempt = false;
  }

  createBoard = (size: number) => {
    return Array(size)
      .fill([])
      .map(a => Array(size).fill(Pos.EMPTY));
  };

  switchPlayer = () => {
    this.currentColor = this.currentColor === Pos.BLACK ? Pos.WHITE : Pos.BLACK;
  };

  pass = () => {
    if (this.lastMovePassed) {
      this.endGame();
    } else {
      this.switchPlayer();
    }
  };

  endGame = () => {
    console.log("GAME OVER");
  };

  play = () => {};

  getAdjacentIntersections = (i: number, j: number) => {};

  getGroup = (i: number, j: number) => {};
}
