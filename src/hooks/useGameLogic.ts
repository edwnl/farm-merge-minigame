import { useCallback, useEffect, useRef, useState } from "react";
import { message } from "antd";
import { uploadLeaderboardData } from "@/lib/leaderboardService";

const FARM_OBJECTS = ["🌻", "🐮", "🐖", "🐤", "🥕"]; // Wheat, Cow, Pig, Chicken, Carrot

export interface Cell {
  id: string;
  value: string;
}

interface DraggedItem {
  row: number;
  col: number;
  value: string;
}

export const useGameLogic = (gridWidth: number, gridHeight: number) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<[number, number][]>(
    [],
  );
  const [hoveredCell, setHoveredCell] = useState<[number, number] | null>(null);
  const [itemsLeft, setItemsLeft] = useState(gridWidth * gridHeight);
  const [isGameOver, setIsGameOver] = useState(false);
  const [swapMoves, setSwapMoves] = useState(0);
  const [mergeMoves, setMergeMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initializeGrid = useCallback(() => {
    const totalCells = gridWidth * gridHeight;
    let items: string[] = [];
    let totalItems = 0;

    // Add items in multiples of 5
    FARM_OBJECTS.forEach((object) => {
      const count = Math.floor(totalCells / 25) * 5; // Ensure at least 5 of each, but not more than fits
      items = items.concat(Array(count).fill(object));
      totalItems += count;
    });

    // Shuffle the items
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    // Fill the grid
    const newGrid: Cell[][] = [];
    let itemIndex = 0;
    for (let i = 0; i < gridHeight; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < gridWidth; j++) {
        if (itemIndex < items.length) {
          row.push({
            id: Math.random().toString(36).substr(2, 9),
            value: items[itemIndex],
          });
          itemIndex++;
        } else {
          // Add empty cell
          row.push({
            id: Math.random().toString(36).substr(2, 9),
            value: "",
          });
        }
      }
      newGrid.push(row);
    }

    setGrid(newGrid);
    setItemsLeft(totalItems);
  }, [gridWidth, gridHeight]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenTooSmall(window.innerWidth < 1400 || window.innerHeight < 700);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isScreenTooSmall && !isGameOver) {
      initializeGrid();
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => +(prev + 0.01).toFixed(2));
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isScreenTooSmall, isGameOver, initializeGrid]);

  useEffect(() => {
    if (itemsLeft === 0) {
      setIsGameOver(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [itemsLeft]);

  const handleDragStart = (row: number, col: number) => {
    if (grid[row][col].value) {
      setDraggedItem({ row, col, value: grid[row][col].value });
    }
  };

  const handleDragOver = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    setHoveredCell([row, col]);
    if (draggedItem) {
      const connectedCells = findConnectedCells(
        row,
        col,
        draggedItem.value,
      ).filter(([r, c]) => !(r === draggedItem.row && c === draggedItem.col));
      if (connectedCells.length >= 4) setHighlightedCells(connectedCells);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setHighlightedCells([]);
    setHoveredCell(null);
  };

  const handleDrop = (targetRow: number, targetCol: number) => {
    if (!draggedItem) return;

    const newGrid = [...grid];
    const connectedCells = findConnectedCells(
      targetRow,
      targetCol,
      draggedItem.value,
    ).filter(([r, c]) => !(r === draggedItem.row && c === draggedItem.col));

    if (connectedCells.length > 4) {
      message.error(
        `You are trying to merge ${connectedCells.length + 1} items! (Only 5 is allowed)`,
      );
    } else if (connectedCells.length === 4) {
      performMerge([...connectedCells, [draggedItem.row, draggedItem.col]]);
      message.success("Merged!");
      setItemsLeft((prev) => prev - 5);
      setMergeMoves((prev) => prev + 1);
    } else {
      // Swap items
      const temp = newGrid[targetRow][targetCol];
      newGrid[targetRow][targetCol] = newGrid[draggedItem.row][draggedItem.col];
      newGrid[draggedItem.row][draggedItem.col] = temp;
      setGrid(newGrid);
      setSwapMoves((prev) => prev + 1);
    }

    handleDragEnd();
  };

  const handleNameSubmit = async () => {
    if (playerName.trim()) {
      try {
        setIsSubmitting(true);
        await uploadLeaderboardData({
          playerName,
          timeElapsed,
          swapMoves,
          mergeMoves,
        });
        message.success("Score submitted successfully!");
      } catch (error) {
        message.error("Failed to submit score. Please try again.");
        console.error(error);
      } finally {
        setIsSubmitting(false);
        reset();
      }
    } else {
      message.warning("Please enter your name.");
    }
  };

  const findConnectedCells = (
    row: number,
    col: number,
    value: string,
  ): [number, number][] => {
    const visited: boolean[][] = Array(gridHeight)
      .fill(null)
      .map(() => Array(gridWidth).fill(false));
    const connected: [number, number][] = [];

    const dfs = (r: number, c: number) => {
      if (
        r < 0 ||
        r >= gridHeight ||
        c < 0 ||
        c >= gridWidth ||
        visited[r][c]
      ) {
        return;
      }

      // Check if this cell is the one being dragged
      if (draggedItem && r === draggedItem.row && c === draggedItem.col) {
        return; // Treat the dragged cell as empty
      }

      if (grid[r][c].value !== value) {
        return;
      }

      visited[r][c] = true;
      connected.push([r, c]);
      dfs(r - 1, c);
      dfs(r + 1, c);
      dfs(r, c - 1);
      dfs(r, c + 1);
    };

    dfs(row, col);
    return connected;
  };

  const performMerge = (cells: [number, number][]) => {
    const newGrid = [...grid];
    cells.forEach(([r, c]) => {
      newGrid[r][c] = {
        id: Math.random().toString(36).substr(2, 9),
        value: "",
      };
    });
    setGrid(newGrid);
  };

  const reset = () => {
    initializeGrid();
    setTimeElapsed(0);
    setIsGameOver(false);
    setPlayerName("");
    setSwapMoves(0);
    setMergeMoves(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => +(prev + 0.01).toFixed(2));
    }, 10);
  };

  return {
    grid,
    itemsLeft,
    timeElapsed,
    isGameOver,
    playerName,
    swapMoves,
    mergeMoves,
    isSubmitting,
    isScreenTooSmall,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    setPlayerName,
    reset,
    handleNameSubmit,
    highlightedCells,
    hoveredCell,
  };
};
