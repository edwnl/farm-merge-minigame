import { ColumnType } from "antd/es/table";
import { LeaderboardItemDisplay } from "@/types/leaderboard";

export const leaderboardColumns: ColumnType<LeaderboardItemDisplay>[] = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Time (seconds)",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Swap Moves",
    dataIndex: "swapMoves",
    key: "swapMoves",
  },
  {
    title: "Merge Moves",
    dataIndex: "mergeMoves",
    key: "mergeMoves",
  },
  {
    title: "Moves/Second",
    dataIndex: "movesPerSecond",
    key: "movesPerSecond",
    render: (value: number) => value.toFixed(2),
  },
  {
    title: "Swap/Merge Ratio",
    dataIndex: "swapToMergeRatio",
    key: "swapToMergeRatio",
    render: (value: number) => value.toFixed(2),
  },
  {
    title: "Date & Time",
    dataIndex: "timestamp",
    key: "timestamp",
  },
];
