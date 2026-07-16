import {
  DEFAULT_QUESTION_IDS,
  type GameSession,
  type PlayerAnswer,
} from "./gameSession";

function buildResultDebugSession(
  playerAnswers: PlayerAnswer["answers"][],
): GameSession {
  const playerCount = playerAnswers.length;

  return {
    playerCount,
    playerOrder: Array.from({ length: playerCount }, (_, index) => index),
    resultPlayerOrder: Array.from(
      { length: playerCount },
      (_, index) => playerCount - index - 1,
    ),
    questionIds: [...DEFAULT_QUESTION_IDS],
    answers: playerAnswers.map((answers, playerIndex) => ({
      playerIndex,
      answers,
    })),
    questionProgress: {
      screen: "complete",
      currentPlayerOrderIndex: playerCount - 1,
      currentQuestionIndex: DEFAULT_QUESTION_IDS.length - 1,
    },
  };
}

export function createResultDebugSession(): GameSession {
  return buildResultDebugSession([
    {
      bloodType: "a",
      usualStyle: "outdoor",
      holidayStyle: "withPeople",
      uncomfortablePlace: "highPlace",
      specialAbility: "teleport",
      loveOrFriendship: "friendship",
      decisionStyle: "intuition",
      motivation: "recognized",
    },
    {
      bloodType: "b",
      usualStyle: "outdoor",
      holidayStyle: "withPeople",
      uncomfortablePlace: "highPlace",
      specialAbility: "teleport",
      loveOrFriendship: "friendship",
      decisionStyle: "intuition",
      motivation: "recognized",
    },
    {
      bloodType: "o",
      usualStyle: "indoor",
      holidayStyle: "withPeople",
      uncomfortablePlace: "hauntedHouse",
      specialAbility: "teleport",
      loveOrFriendship: "love",
      decisionStyle: "intuition",
      motivation: "recognized",
    },
    {
      bloodType: "ab",
      usualStyle: "indoor",
      holidayStyle: "aloneTime",
      uncomfortablePlace: "narrowPlace",
      specialAbility: "teleport",
      loveOrFriendship: "love",
      decisionStyle: "indecisive",
      motivation: "recognized",
    },
  ]);
}
