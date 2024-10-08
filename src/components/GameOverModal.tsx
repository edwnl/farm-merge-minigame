import React from "react";
import { Input, Modal } from "antd";

interface GameOverModalProps {
  isGameOver: boolean;
  timeElapsed: number;
  swapMoves: number;
  mergeMoves: number;
  playerName: string;
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
  onReset: () => void;
  onPlayerNameChange: (name: string) => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isGameOver,
  timeElapsed,
  swapMoves,
  mergeMoves,
  playerName,
  isSubmitting,
  onSubmit,
  onReset,
  onPlayerNameChange,
}) => {
  return (
    <Modal
      title="Finished!"
      open={isGameOver}
      onOk={onSubmit}
      onCancel={onReset}
      okText="Submit Score"
      okButtonProps={{
        className: "bg-green-600 text-white",
        loading: isSubmitting,
        disabled: isSubmitting,
      }}
      cancelButtonProps={{
        className: "border-green-600",
        disabled: isSubmitting,
      }}
      cancelText="Play Again"
    >
      <p>
        Congratulations! You completed the game in {timeElapsed.toFixed(2)}{" "}
        seconds.
      </p>
      <p>Swap Moves: {swapMoves}</p>
      <p>Merge Moves: {mergeMoves}</p>
      <p>
        Average Moves per Second:{" "}
        {((swapMoves + mergeMoves) / timeElapsed).toFixed(2)}
      </p>
      <p>Swap to Merge Ratio: {(swapMoves / mergeMoves).toFixed(2)}</p>
      <Input
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => onPlayerNameChange(e.target.value)}
        className="mt-4"
        disabled={isSubmitting}
      />
    </Modal>
  );
};
