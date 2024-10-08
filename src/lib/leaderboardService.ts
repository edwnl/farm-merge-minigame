"use client";

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { LeaderboardItem, LeaderboardItemDisplay } from "@/types/leaderboard";
import { addDoc } from "@firebase/firestore";

interface LeaderboardUploadData {
  playerName: string;
  timeElapsed: number;
  swapMoves: number;
  mergeMoves: number;
}

export const uploadLeaderboardData = async (
  data: LeaderboardUploadData,
): Promise<void> => {
  const { playerName, timeElapsed, swapMoves, mergeMoves } = data;
  const totalMoves = swapMoves + mergeMoves;
  const movesPerSecond = totalMoves / timeElapsed;
  const swapToMergeRatio = swapMoves / mergeMoves;

  const leaderboardItem: Omit<LeaderboardItem, "id"> = {
    name: playerName,
    time: timeElapsed,
    swapMoves,
    mergeMoves,
    movesPerSecond,
    swapToMergeRatio,
    date: new Date(),
  };

  await addDoc(collection(db, "leaderboard"), leaderboardItem);
};

export const fetchLeaderboardData = async (): Promise<
  LeaderboardItemDisplay[]
> => {
  const leaderboardRef = collection(db, "leaderboard");
  const q = query(leaderboardRef, orderBy("time", "asc"), limit(1000));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
    const data = doc.data() as Omit<LeaderboardItem, "id" | "date"> & {
      date: { toDate: () => Date };
    };
    const date = data.date.toDate();

    return {
      id: doc.id,
      ...data,
      time: data.time.toFixed(2),
      date: date.toLocaleDateString(),
      timestamp: date.toLocaleString(),
    };
  });
};
