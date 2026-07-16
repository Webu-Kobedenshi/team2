import { questions } from "./questions";
import { clearResultViewSession } from "./resultViewSession";

export type AnswerValue = string;
export type QuestionId = string;
export type QuestionAnswer = AnswerValue | null;

export type PlayerAnswer = {
  playerIndex: number;
  answers: Record<QuestionId, QuestionAnswer>;
};

export type QuestionProgress = {
  screen: "intro" | "question" | "identity" | "complete";
  currentPlayerOrderIndex: number;
  currentQuestionIndex: number;
};

export type GameSession = {
  playerCount: number;
  playerOrder: number[];
  resultPlayerOrder: number[];
  questionIds: QuestionId[];
  answers: PlayerAnswer[];
  questionProgress: QuestionProgress;
};

export const DEFAULT_QUESTION_IDS: readonly QuestionId[] = questions.map(
  (question) => question.id,
);

const GAME_SESSION_STORAGE_KEY = "commonFinderGame";
const validPlayerCounts = [2, 3, 4];
const validAnswerIdsByQuestionId = new Map(
  questions.map((question) => [
    question.id,
    new Set(question.options.map((option) => option.id)),
  ]),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isGameSession(value: unknown): value is GameSession {
  if (!isRecord(value)) {
    return false;
  }

  const {
    playerCount,
    playerOrder,
    resultPlayerOrder,
    questionIds,
    answers,
    questionProgress,
  } = value;

  if (
    typeof playerCount !== "number" ||
    !validPlayerCounts.includes(playerCount) ||
    !Array.isArray(playerOrder) ||
    playerOrder.length !== playerCount ||
    !Array.isArray(resultPlayerOrder) ||
    resultPlayerOrder.length !== playerCount ||
    !Array.isArray(questionIds) ||
    questionIds.length !== DEFAULT_QUESTION_IDS.length ||
    !questionIds.every((questionId) => typeof questionId === "string") ||
    !questionIds.every(
      (questionId, index) => questionId === DEFAULT_QUESTION_IDS[index],
    ) ||
    !Array.isArray(answers) ||
    answers.length !== playerCount ||
    !isRecord(questionProgress)
  ) {
    return false;
  }

  const { screen, currentPlayerOrderIndex, currentQuestionIndex } =
    questionProgress;

  if (
    !["intro", "question", "identity", "complete"].includes(
      typeof screen === "string" ? screen : "",
    ) ||
    typeof currentPlayerOrderIndex !== "number" ||
    !Number.isInteger(currentPlayerOrderIndex) ||
    currentPlayerOrderIndex < 0 ||
    currentPlayerOrderIndex >= playerCount ||
    typeof currentQuestionIndex !== "number" ||
    !Number.isInteger(currentQuestionIndex) ||
    currentQuestionIndex < 0 ||
    currentQuestionIndex >= questionIds.length
  ) {
    return false;
  }

  const expectedPlayerIndexes = new Set(
    Array.from({ length: playerCount }, (_, index) => index),
  );

  const isValidPlayerOrder = (order: unknown[]) =>
    order.every(
      (playerIndex) =>
        typeof playerIndex === "number" &&
        expectedPlayerIndexes.has(playerIndex),
    ) && new Set(order).size === playerCount;

  if (
    !isValidPlayerOrder(playerOrder) ||
    !isValidPlayerOrder(resultPlayerOrder)
  ) {
    return false;
  }

  const answerPlayerIndexes = new Set<number>();

  const hasValidAnswers = answers.every((playerAnswer) => {
    if (!isRecord(playerAnswer)) {
      return false;
    }

    const { playerIndex, answers: playerAnswers } = playerAnswer;

    if (!isRecord(playerAnswers)) {
      return false;
    }

    if (Object.keys(playerAnswers).length !== questionIds.length) {
      return false;
    }

    if (
      typeof playerIndex !== "number" ||
      !expectedPlayerIndexes.has(playerIndex) ||
      answerPlayerIndexes.has(playerIndex)
    ) {
      return false;
    }

    answerPlayerIndexes.add(playerIndex);

    return questionIds.every((questionId) => {
      const answer = playerAnswers[questionId];
      return (
        answer === null ||
        (typeof answer === "string" &&
          validAnswerIdsByQuestionId.get(questionId)?.has(answer) === true)
      );
    });
  });

  if (!hasValidAnswers) {
    return false;
  }

  return screen !== "complete" || isGameSessionComplete(value as GameSession);
}

function createPlayerOrder(playerCount: number): number[] {
  return Array.from({ length: playerCount }, (_, index) => index);
}

function createShuffledPlayerOrder(playerCount: number): number[] {
  const order = createPlayerOrder(playerCount);

  for (let index = order.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[randomIndex]] = [order[randomIndex], order[index]];
  }

  return order;
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

export function createGameSession(playerCount: number): GameSession {
  return {
    playerCount,
    playerOrder: createPlayerOrder(playerCount),
    resultPlayerOrder: createShuffledPlayerOrder(playerCount),
    questionIds: [...DEFAULT_QUESTION_IDS],
    answers: createEmptyAnswers(playerCount, DEFAULT_QUESTION_IDS),
    questionProgress: {
      screen: "intro",
      currentPlayerOrderIndex: 0,
      currentQuestionIndex: 0,
    },
  };
}

export function isGameSessionComplete(session: GameSession): boolean {
  return session.answers.every((playerAnswer) =>
    session.questionIds.every(
      (questionId) => playerAnswer.answers[questionId] !== null,
    ),
  );
}

export function loadGameSession(): GameSession | null {
  const raw = sessionStorage.getItem(GAME_SESSION_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const session = JSON.parse(raw) as unknown;
    return isGameSession(session) ? session : null;
  } catch {
    return null;
  }
}

export function saveGameSession(session: GameSession) {
  sessionStorage.setItem(GAME_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function saveQuestionProgress(
  session: GameSession,
  questionProgress: QuestionProgress,
): GameSession {
  return {
    ...session,
    questionProgress,
  };
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
  clearResultViewSession();
}
