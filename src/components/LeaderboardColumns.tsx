import { ColumnType } from "antd/es/table";
import { LeaderboardItemDisplay } from "@/types/leaderboard";

export const getLeaderboardColumns =
  (): ColumnType<LeaderboardItemDisplay>[] => [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      defaultSortOrder: "ascend",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Time (seconds)",
      dataIndex: "timeFormatted",
      key: "time",
      sorter: (a, b) => a.time - b.time,
    },
    {
      title: "Swap Moves",
      dataIndex: "swapMoves",
      key: "swapMoves",
      sorter: (a, b) => a.swapMoves - b.swapMoves,
    },
    {
      title: "Merge Moves",
      dataIndex: "mergeMoves",
      key: "mergeMoves",
      sorter: (a, b) => a.mergeMoves - b.mergeMoves,
    },
    {
      title: "Moves/Second",
      dataIndex: "movesPerSecondFormatted",
      key: "movesPerSecond",
      sorter: (a, b) => a.movesPerSecond - b.movesPerSecond,
    },
    {
      title: "Swap/Merge Ratio",
      dataIndex: "swapToMergeRatioFormatted",
      key: "swapToMergeRatio",
      sorter: (a, b) => a.swapToMergeRatio - b.swapToMergeRatio,
    },
    {
      title: "Date & Time",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    },
  ];
