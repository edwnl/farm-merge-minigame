"use client";

import React from "react";
import { Button, Card, Statistic } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, RedoOutlined } from "@ant-design/icons";
import { useGameLogic } from "@/hooks/useGameLogic";
import { GameBoard } from "@/components/GameBoard";
import { GameOverModal } from "@/components/GameOverModal";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

const FarmMergeGame: React.FC = () => {
  const router = useRouter();
  const {
    grid,
    itemsLeft,
    timeElapsed,
    isGameOver,
    swapMoves,
    mergeMoves,
    isScreenTooSmall,
    playerName,
    setPlayerName,
    isSubmitting,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    reset,
    handleNameSubmit,
    highlightedCells,
    hoveredCell,
  } = useGameLogic(GRID_WIDTH, GRID_HEIGHT);

  if (isScreenTooSmall) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-center mb-4">
          Please enlarge your browser window to play the game.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="m-4">
        <div className="flex z-[100]">
          <Button
            onClick={() => router.push("/")}
            icon={<ArrowLeftOutlined />}
            className="mr-4 border-green-600 text-green-600"
          >
            Back
          </Button>
          <p className="text-3xl font-bold text-green-600 mr-4 mb-4">
            Speed Merge Valley
          </p>
          <Button
            onClick={reset}
            className="bg-green-600 text-white"
            icon={<RedoOutlined />}
          >
            Reset
          </Button>
        </div>

        <div className="flex w-full items-center justify-center max-w-md">
          <Card size="small" className="w-full mr-4">
            <Statistic title="Time" value={timeElapsed.toFixed(2)} suffix="s" />
          </Card>
          <Card size="small" className="w-full">
            <Statistic title="Items Left" value={itemsLeft} />
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <GameBoard
          grid={grid}
          highlightedCells={highlightedCells}
          hoveredCell={hoveredCell}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        />
        <GameOverModal
          isGameOver={isGameOver}
          timeElapsed={timeElapsed}
          swapMoves={swapMoves}
          mergeMoves={mergeMoves}
          playerName={playerName}
          isSubmitting={isSubmitting}
          onSubmit={handleNameSubmit}
          onReset={reset}
          onPlayerNameChange={setPlayerName}
        />
      </div>
    </div>
  );
};

export default FarmMergeGame;
