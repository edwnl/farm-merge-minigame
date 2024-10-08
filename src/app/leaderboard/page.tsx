"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, message, Spin, Table } from "antd";
import { ArrowLeftOutlined, RedoOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { fetchLeaderboardData } from "@/lib/leaderboardService";
import { LeaderboardItemDisplay } from "@/types/leaderboard";
import { getLeaderboardColumns } from "@/components/LeaderboardColumns";

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<
    LeaderboardItemDisplay[]
  >([]);
  const [displayData, setDisplayData] = useState<LeaderboardItemDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshDisabled, setRefreshDisabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const loadLeaderboardData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchLeaderboardData();
      const rankedData = data
        .sort((a, b) => a.time - b.time)
        .map((item, index) => ({ ...item, rank: index + 1 }));
      setLeaderboardData(rankedData);
      setDisplayData(rankedData);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      message.error("Failed to load leaderboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeaderboardData();
  }, [loadLeaderboardData]);

  const handleRefresh = () => {
    if (!refreshDisabled) {
      loadLeaderboardData();
      setRefreshDisabled(true);
      setTimeout(() => setRefreshDisabled(false), 2000);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredData = leaderboardData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setDisplayData(filteredData);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-6xl">
        <Button
          onClick={() => router.push("/")}
          className="mb-4 flex items-center border-green-600 text-green-600"
        >
          <ArrowLeftOutlined className="mr-2" /> Back to Home
        </Button>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-green-600">
            Speed Merge Valley Leaderboard
          </h1>
          <Button
            icon={<RedoOutlined />}
            onClick={handleRefresh}
            type="primary"
            disabled={refreshDisabled || loading}
            className="ml-4 bg-green-600 text-white flex-shrink-0"
          />
        </div>
        <Input
          placeholder="Search by name"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchText}
          className="mb-4"
        />
        {loading ? (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table<LeaderboardItemDisplay>
            dataSource={displayData}
            columns={getLeaderboardColumns()}
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
            rowKey="id"
          />
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
