export enum Pos {
  EMPTY = 0,
  BLACK = 1,
  WHITE = 2
}

export default class Board {
  private currentColor: Pos;
  public size: number;
  private board: any;
  private lastMovePassed: boolean;
  public inAtari: boolean;
  public isSuicideAttempt: boolean;

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

  play = (i: number, j: number) => {
    this.isSuicideAttempt = this.inAtari = false;
    if (this.board[i][j] !== Pos.EMPTY) {
      return false;
    }
    const color = (this.board[i][j] = this.currentColor);
    const captured: any[] = [];
    const neighbors = this.getNeighbors(i, j);
    let atari = false;

    neighbors.forEach(n => {
      const state = this.board[n[0]][n[1]];
      if (state !== Pos.EMPTY && state !== color) {
        const group = this.getGroup(n[0], n[1]);
        if (group && group["liberties"] === 0) {
          captured.push(group);
        } else if (group && group["liberties"] === 1) {
          atari = true;
        }
      }
    });

    const grp = this.getGroup(i, j);
    if (captured.length === 0 && grp && grp["liberties"] === 0) {
      this.board[i][j] = Pos.EMPTY;
      this.isSuicideAttempt = true;
      return false;
    }

    captured.forEach(group =>
      group["stones"].forEach(
        (stone: any) => (this.board[stone[0]][stone[1]] = Pos.EMPTY)
      )
    );

    if (atari) {
      this.inAtari = true;
    }

    this.lastMovePassed = false;
    this.switchPlayer();
    return true;
  };

  getNeighbors = (i: number, j: number): any[] => {
    const neighbors = [];
    if (i > 0) neighbors.push([i - 1, j]);
    if (j < this.size - 1) neighbors.push([i, j + 1]);
    if (i < this.size - 1) neighbors.push([i + 1, j]);
    if (j > 0) neighbors.push([i, j - 1]);
    return neighbors;
  };

  getGroup = (i: number, j: number) => {
    const color = this.board[i][j];
    if (color === Pos.EMPTY) return null;

    // const visited = {}; // for O(1) lookups
    const visited_list = []; // for returning
    const queue = [[i, j].join(",")];
    let count = 0;

    while (queue.length > 0) {
      const stone = queue.pop();
      // if (stone && visited[stone]) continue;

      // var neighbors = this.getNeighbors(stone[0], stone[1]);
      // eslint-disable-next-line no-loop-func
      // neighbors.forEach(n => {
      // const state = self.board[n[0]][n[1]];
      // if (state === Pos.EMPTY) count++;
      // if (state === color) queue.push([n[0], n[1]]);
      // });

      // visited[stone] = true;
      visited_list.push(stone);
    }

    return {
      liberties: count,
      stones: visited_list
    };
  };
}
