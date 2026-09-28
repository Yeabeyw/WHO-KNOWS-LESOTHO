export interface GameResult {
  id: string;
  score: number;
  timestamp: string;
  userAgent: string | undefined;
  followedPage: boolean | undefined;
  difficulty: number;
}

// In-memory storage (use a real database in production)
const gameResults = new Map<string, GameResult>();

export function saveGameResult(result: Omit<GameResult, "id">): GameResult {
  const id = crypto.randomUUID();
  const gameResult: GameResult = { ...result, id };
  gameResults.set(id, gameResult);
  return gameResult;
}

export function getAllGameResults(): GameResult[] {
  return Array.from(gameResults.values()).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function getGameResultById(id: string): GameResult | undefined {
  return gameResults.get(id);
}

export function deleteGameResult(id: string): boolean {
  return gameResults.delete(id);
}

export function getGameStats() {
  const results = getAllGameResults();
  const totalGames = results.length;
  const averageScore = totalGames > 0 
    ? results.reduce((sum, r) => sum + r.score, 0) / totalGames 
    : 0;
  const followers = results.filter(r => r.followedPage).length;
  
  return {
    totalGames,
    averageScore: Math.round(averageScore * 10) / 10,
    followers,
    followerRate: totalGames > 0 ? Math.round((followers / totalGames) * 100) : 0,
  };
}
