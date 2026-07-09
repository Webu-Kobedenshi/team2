export type AnswerValue = string;
export type QuestionId = string;
export type QuestionAnswer = AnswerValue | null;

export type PlayerAnswer = {
  playerIndex: number;
  answers: Record<QuestionId, QuestionAnswer>;
};

export type GameSession = {
  playerCount: number;
  playerOrder: number[];
  questionIds: QuestionId[];
  answers: PlayerAnswer[];
};

export const DEFAULT_QUESTION_IDS = [
  "bloodType",
  "usualStyle",
  "holidayStyle",
  "uncomfortablePlace",
  "specialAbility",
  "loveOrFriendship",
  "decisionStyle",
  "motivation",
] as const satisfies readonly QuestionId[];

const GAME_SESSION_STORAGE_KEY = "commonFinderGame";

function createPlayerOrder(playerCount: number): number[] {
  return Array.from({ length: playerCount }, (_, index) => index);
}

function createEmptyAnswerRecord(
  questionIds: readonly QuestionId[],
): Record<QuestionId, QuestionAnswer> {
  return Object.fromEntries(
    questionIds.map((questionId) => [questionId, null]),
  ) as Record<QuestionId, QuestionAnswer>;
}

function createEmptyAnswers(
  playerCount: number,
  questionIds: readonly QuestionId[],
): PlayerAnswer[] {
  return Array.from({ length: playerCount }, (_, playerIndex) => ({
    playerIndex,
    answers: createEmptyAnswerRecord(questionIds),
  }));
}

export function createGameSession(
  playerCount: number,
  questionIds: readonly QuestionId[] = DEFAULT_QUESTION_IDS,
): GameSession {
  return {
    playerCount,
    playerOrder: createPlayerOrder(playerCount),
    questionIds: [...questionIds],
    answers: createEmptyAnswers(playerCount, questionIds),
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

export function savePlayerAnswer(
  session: GameSession,
  playerIndex: number,
  questionId: QuestionId,
  answer: AnswerValue,
): GameSession {
  return {
    ...session,
    answers: session.answers.map((playerAnswer) => {
      if (playerAnswer.playerIndex !== playerIndex) {
        return playerAnswer;
      }

      return {
        ...playerAnswer,
        answers: {
          ...playerAnswer.answers,
          [questionId]: answer,
        },
      };
    }),
  };
}

export function clearGameSession() {
  sessionStorage.removeItem(GAME_SESSION_STORAGE_KEY);
}
