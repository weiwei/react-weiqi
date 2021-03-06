import React from "react";
import "./App.css";

import Board, { Pos } from "./engine";

const board = new Board(19);

const GRID_SIZE = 40;

interface BoardIntersectionProps {
  color: Pos;
  row: number;
  col: number;
}

export enum Position {
  Default = "default",
  UpperLeft = "upper-left",
  UpperRight = "upper-right",
  Upper = "upper",
  Lower = "lower",
  LowerLeft = "lower-left",
  LowerRight = "lower-right",
  Left = "left",
  Right = "right",
}

const BoardIntersection = (props: BoardIntersectionProps) => {
  let pos;
  if (props.row === 0) {
    if (props.col === 0) {
      pos = Position.UpperLeft;
    } else if (props.col === 18) {
      pos = Position.UpperRight;
    } else {
      pos = Position.Upper;
    }
  } else if (props.row === 18) {
    if (props.col === 0) {
      pos = Position.LowerLeft;
    } else if (props.col === 18) {
      pos = Position.LowerRight;
    } else {
      pos = Position.Lower;
    }
  } else {
    if (props.col === 0) {
      pos = Position.Left;
    } else if (props.col === 18) {
      pos = Position.Right;
    } else {
      pos = Position.Default;
    }
  }

  return (
    <div
      className="intersection"
      onClick={() => board.play(props.row, props.col)}
      style={{ top: props.row * GRID_SIZE, left: props.col * GRID_SIZE }}
    />
  );
};

const BoardView = () => {
  const intersections = [];
  for (let i = 0; i < board.size; i++)
    for (let j = 0; j < board.size; j++)
      intersections.push(
        BoardIntersection({
          color: Pos.EMPTY,
          row: i,
          col: j,
          // onPlay: onPlay
        })
      );
  const style = {
    width: board.size * GRID_SIZE,
    height: board.size * GRID_SIZE,
  };
  return (
    <div style={style} id="board">
      {intersections}
    </div>
  );
};

const AlertView = () => {
  let text = "";
  if (board.inAtari) text = "ATARI!";
  else if (board.isSuicideAttempt) text = "SUICIDE!";

  return <div id="alerts">{text}</div>;
};

const PassView = () => {
  return (
    <input
      id="pass-btn"
      type="button"
      value="Pass"
      onClick={() => board.pass()}
    />
  );
};

const App = () => {
  return (
    <div>
      <AlertView />
      <PassView />
      <BoardView />
    </div>
  );
};

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// };

export default App;
