import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cell } from "@/hooks/useGameLogic";

interface GameBoardProps {
  grid: Cell[][];
  highlightedCells: [number, number][];
  hoveredCell: [number, number] | null;
  onDragStart: (row: number, col: number) => void;
  onDragOver: (e: React.DragEvent, row: number, col: number) => void;
  onDragEnd: () => void;
  onDrop: (row: number, col: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  grid,
  highlightedCells,
  hoveredCell,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
}) => {
  return (
    <div
      className="grid bg-green-300 p-4 rounded-md grid-cols-10 gap-2 absolute top-0"
      style={{
        transform: "rotateX(55deg) rotateZ(-50deg)",
        transformStyle: "preserve-3d",
      }}
    >
      <AnimatePresence>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <motion.div
              key={cell.id}
              className={`w-24 h-24 flex items-center justify-center rounded cursor-move transition-colors ${
                highlightedCells.some(
                  ([r, c]) => r === rowIndex && c === colIndex,
                )
                  ? highlightedCells.length === 4
                    ? "bg-green-200"
                    : "bg-red-200"
                  : hoveredCell &&
                      hoveredCell[0] === rowIndex &&
                      hoveredCell[1] === colIndex
                    ? "bg-green-200"
                    : "bg-green-100"
              }`}
              style={{
                transform: `translate3d(${colIndex * 2}px, ${rowIndex * 2}px, 0)`,
              }}
              draggable
              onDragStart={() => onDragStart(rowIndex, colIndex)}
              onDragOver={(e) => onDragOver(e, rowIndex, colIndex)}
              onDragEnd={onDragEnd}
              onDrop={() => onDrop(rowIndex, colIndex)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span style={{ fontSize: "3rem", rotate: "90deg" }}>
                {cell.value}
              </span>
            </motion.div>
          )),
        )}
      </AnimatePresence>
    </div>
  );
};
