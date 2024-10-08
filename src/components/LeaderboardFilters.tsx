import React from "react";
import { Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

interface LeaderboardFiltersProps {
  onSort: (value: string) => void;
  onSearch: (value: string) => void;
}

const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  onSort,
  onSearch,
}) => (
  <div className="flex justify-between mb-4">
    <Select
      defaultValue="time-asc"
      style={{ width: 200 }}
      onChange={onSort}
      className={"mr-4"}
    >
      <Option value="time-asc">Time (Fastest First)</Option>
      <Option value="time-desc">Time (Slowest First)</Option>
      <Option value="swapMoves-asc">Swap Moves (Least First)</Option>
      <Option value="swapMoves-desc">Swap Moves (Most First)</Option>
      <Option value="mergeMoves-asc">Merge Moves (Least First)</Option>
      <Option value="mergeMoves-desc">Merge Moves (Most First)</Option>
      <Option value="movesPerSecond-desc">Moves/Second (Highest First)</Option>
      <Option value="movesPerSecond-asc">Moves/Second (Lowest First)</Option>
      <Option value="swapToMergeRatio-desc">
        Swap/Merge Ratio (Highest First)
      </Option>
      <Option value="swapToMergeRatio-asc">
        Swap/Merge Ratio (Lowest First)
      </Option>
    </Select>
    <Input
      placeholder="Search by name"
      prefix={<SearchOutlined />}
      style={{ width: 200 }}
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

export default LeaderboardFilters;
