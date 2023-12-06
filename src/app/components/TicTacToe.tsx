"use client";
import React, { useEffect, useState } from "react";

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [scores, setScores] = useState<{ X: number; O: number }>({
    X: 0,
    O: 0,
  });

  const handleClick = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setScores((prevScores) => {
        const winnerKey = newWinner as keyof typeof prevScores;
        return { ...prevScores, [winnerKey]: prevScores[winnerKey] + 1 };
      });
    } else if (newBoard.every((square) => square !== null)) {
      setWinner("Empate!");
      setTimeout(resetGame, 1500);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  useEffect(() => {
    if (winner) {
      setTimeout(resetGame, 1500);
    }
  }, [winner]);

  const renderSquare = (index: number) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const status = winner
    ? `Ganador: ${winner}`
    : board.every((square) => square !== null)
    ? "Es un empate!"
    : `Siguiente Jugador: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Tic Tac Toe</h1>
        <div className="status mb-4 text-2xl">{status}</div>
        <div className="board mb-4">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="score-board text-xl">
          <p>Score:</p>
          <p>X: {scores.X}</p>
          <p>O: {scores.O}</p>
        </div>
      </div>
    </div>
  );
};

const calculateWinner = (squares: (string | null)[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;
