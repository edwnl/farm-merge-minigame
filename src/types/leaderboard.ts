export interface LeaderboardItem {
  id: string;
  name: string;
  time: number;
  swapMoves: number;
  mergeMoves: number;
  movesPerSecond: number;
  swapToMergeRatio: number;
  date: Date;
}

export interface LeaderboardItemDisplay extends Omit<LeaderboardItem, "date"> {
  timeFormatted: string;
  movesPerSecondFormatted: string;
  swapToMergeRatioFormatted: string;
  date: string;
  timestamp: string;
}

export type SortOption =
  | "time-asc"
  | "time-desc"
  | "swapMoves-asc"
  | "swapMoves-desc"
  | "mergeMoves-asc"
  | "mergeMoves-desc"
  | "movesPerSecond-desc"
  | "movesPerSecond-asc"
  | "swapToMergeRatio-desc"
  | "swapToMergeRatio-asc";
