import type { PlayerAnswer } from "./gameSession";
import type { Question } from "./questions";

export type CommonPointItem = {
  questionId: string;
  questionText: string;
  answerLabel: string;
};

export type CommonPoint = {
  withPlayerIndex: number;
  items: CommonPointItem[];
};

export type ResultPlayer = {
  playerIndex: number;
  commonPoints: CommonPoint[];
  totalCommonPointCount: number;
};

export type QuestionOptionResult = {
  optionId: string;
  optionLabel: string;
  playerIndexes: number[];
};

export type QuestionResult = {
  questionId: string;
  questionText: string;
  conversationPrompt: string;
  optionResults: QuestionOptionResult[];
};

export type ResultAnalysis = {
  players: ResultPlayer[];
  questionResults: QuestionResult[];
};

export function analyzeResults(
  answers: PlayerAnswer[],
  questions: Question[],
): ResultAnalysis {
  const players: ResultPlayer[] = answers.map((playerAnswer) => ({
    playerIndex: playerAnswer.playerIndex,
    commonPoints: [],
    totalCommonPointCount: 0,
  }));

  players.forEach((currentPlayer, currentIndex) => {
    const currentAnswers = answers[currentIndex].answers;

    players.forEach((otherPlayer, otherIndex) => {
      if (currentIndex === otherIndex) return;

      const otherAnswers = answers[otherIndex].answers;
      const commonItems: CommonPointItem[] = [];

      questions.forEach((question) => {
        const answerId = currentAnswers[question.id];

        if (!answerId || answerId !== otherAnswers[question.id]) return;

        const answer = question.options.find(
          (option) => option.id === answerId,
        );

        if (!answer) return;

        commonItems.push({
          questionId: question.id,
          questionText: question.text,
          answerLabel: answer.label,
        });
      });

      currentPlayer.commonPoints.push({
        withPlayerIndex: otherPlayer.playerIndex,
        items: commonItems,
      });
    });
  });

  players.forEach((player) => {
    player.totalCommonPointCount = player.commonPoints.reduce(
      (sum, commonPoint) => sum + commonPoint.items.length,
      0,
    );
  });

  const questionResults = questions.map((question) => ({
    questionId: question.id,
    questionText: question.text,
    conversationPrompt: question.conversationPrompt,
    optionResults: question.options.map((option) => ({
      optionId: option.id,
      optionLabel: option.label,
      playerIndexes: answers
        .filter(
          (playerAnswer) => playerAnswer.answers[question.id] === option.id,
        )
        .map((playerAnswer) => playerAnswer.playerIndex),
    })),
  }));

  return { players, questionResults };
}
