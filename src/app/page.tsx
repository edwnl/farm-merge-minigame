"use client";

import React from "react";
import { Button } from "antd";
import {
  PlayCircleOutlined,
  TrophyOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const FarmMergeLandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        Speed Merge Valley
      </h1>

      <div className="max-w-2xl text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Game Rules:</h2>
        <ul className="list-disc text-left pl-6 mb-4">
          <li>The game is played on a 10x10 grid filled with farm objects.</li>
          <li>
            Drag and drop objects to swap their positions or create matches.
          </li>
          <li>
            Match exactly 5 identical objects to merge them and clear them from
            the board.
          </li>
          <li>The goal is to clear all objects as quickly as possible.</li>
        </ul>
        <p className="font-semibold">
          Note: This game requires a large screen and cannot be played on mobile
          devices.
        </p>
      </div>

      <div className="mb-8">
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          className="bg-green-600 mr-4"
          onClick={() => router.push("/game")}
          size="large"
        >
          Start Game
        </Button>
        <Button
          icon={<TrophyOutlined />}
          className="border-green-600 text-green-600"
          onClick={() => router.push("/leaderboard")}
          size="large"
        >
          Leaderboard
        </Button>
      </div>

      <a
        href="https://github.com/yourusername/speed-merge-valley"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:text-green-800 transition-colors"
      >
        <GithubOutlined className="mr-2" />
        Made with 💚 by Edwin
      </a>
    </div>
  );
};

export default FarmMergeLandingPage;
