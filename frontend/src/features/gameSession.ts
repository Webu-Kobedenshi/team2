export type AnswerValue = string;

export type PlayerAnswer = {
  playerIndex: number;
  answers: Record<string, AnswerValue>;
};

export type GameSession = {
  playerCount: number;
  answers: PlayerAnswer[];
};

const GAME_SESSION_STORAGE_KEY = "commonFinderGame";

export function createGameSession(playerCount: number): GameSession {
  return {
    playerCount,
    answers: [],
  };
}

export function loadGameSession(): GameSession | null {
  const raw = sessionStorage.getItem(GAME_SESSION_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as GameSession;
  } catch {
    return null;
  }
}

export function saveGameSession(session: GameSession) {
  sessionStorage.setItem(GAME_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearGameSession() {
  sessionStorage.removeItem(GAME_SESSION_STORAGE_KEY);
}
