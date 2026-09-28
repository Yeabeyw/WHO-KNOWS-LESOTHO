import { createServerFn } from "@tanstack/react-start";
import { saveGameResult, getAllGameResults, getGameStats, type GameResult } from "@/lib/game-data";

export const getResults = createServerFn({ method: "GET" }).handler(() => {
  const results = getAllGameResults();
  const stats = getGameStats();
  return { results, stats };
});

export const saveResult = createServerFn({ method: "POST" })
  .validator((data: Omit<GameResult, "id">) => data)
  .handler(({ data }) => {
    const result = saveGameResult({
      score: data.score,
      timestamp: data.timestamp || new Date().toISOString(),
      userAgent: data.userAgent,
      followedPage: data.followedPage,
    });
    return result;
  });
