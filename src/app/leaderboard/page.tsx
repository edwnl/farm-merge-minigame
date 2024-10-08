"use client";

import React, { useState, useEffect } from "react";
import { Table, Spin, message, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { fetchLeaderboardData } from "@/lib/leaderboardService";
import { LeaderboardItemDisplay } from "@/types/leaderboard";
import { leaderboardColumns } from "@/components/LeaderboardColumns";
import LeaderboardFilters from "@/components/LeaderboardFilters";

type SortableFields = keyof Omit<
  LeaderboardItemDisplay,
  "id" | "date" | "timestamp"
>;

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<
    LeaderboardItemDisplay[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortableFields>("time");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  const loadLeaderboardData = async () => {
    try {
      const data = await fetchLeaderboardData();
      setLeaderboardData(data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      message.error("Failed to load leaderboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (value: string) => {
    const [field, order] = value.split("-") as [SortableFields, "asc" | "desc"];
    setSortField(field);
    setSortOrder(order);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const sortedAndFilteredData = leaderboardData
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        const numA = Number(aValue);
        const numB = Number(bValue);
        return sortOrder === "asc" ? numA - numB : numB - numA;
      }
    })
    .map((item, index) => ({ ...item, rank: index + 1 }));

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-6xl">
        <Button
          onClick={() => router.push("/")}
          className="mb-4 flex items-center border-green-600 text-green-600"
        >
          <ArrowLeftOutlined className="mr-2" /> Back to Home
        </Button>
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Speed Merge Valley Leaderboard
        </h1>
        <LeaderboardFilters onSort={handleSort} onSearch={handleSearch} />
        {loading ? (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={sortedAndFilteredData}
            columns={leaderboardColumns}
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
