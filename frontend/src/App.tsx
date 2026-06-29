import { useState } from "react";

import { Home } from "./pages/Home";
import { HowToPlay } from "./pages/HowToPlay";
import { PlayerSelect } from "./pages/PlayerSelect";
import { PassDevice } from "./pages/PassDevice";
import { Questions } from "./pages/Questions";
import { Loading } from "./pages/Loading";
import { Result } from "./pages/Result";

import { questions } from "./data/questions";

type Page =
  | "home"
  | "howToPlay"
  | "playerSelect"
  | "passDevice"
  | "questions"
  | "loading"
  | "result";

type Answer = {
  player: number;
  questionId: number;
  answer: string;
};

function App() {
  const [page, setPage] = useState<Page>("home");

  const [totalPlayers, setTotalPlayers] = useState(2);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [answers, setAnswers] = useState<Answer[]>([]);

  const totalQuestions = questions.length;

  const restartGame = () => {
    setPage("home");
    setTotalPlayers(2);
    setCurrentPlayer(1);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers([]);
  };

  const saveAnswer = () => {
    if (!selectedAnswer) return;

    setAnswers((prev) => [
      ...prev,
      {
        player: currentPlayer,
        questionId: questions[currentQuestion].id,
        answer: selectedAnswer,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    saveAnswer();

    // Next question
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      return;
    }

    // Next player
    if (currentPlayer < totalPlayers) {
      setCurrentPlayer((prev) => prev + 1);
      setCurrentQuestion(0);
      setSelectedAnswer("");
      setPage("passDevice");
      return;
    }

    // Game finished
    setPage("loading");
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) return;

    setCurrentQuestion((prev) => prev - 1);
    setSelectedAnswer("");
  };

  const handlePlayerSelect = (players: number) => {
    setTotalPlayers(players);
    setCurrentPlayer(1);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers([]);
    setPage("passDevice");
  };

  const current = questions[currentQuestion];

  const commonPoints = questions
  .map((question) => {
    const answersForQuestion = answers.filter(
      (a) => a.questionId === question.id
    );

    if (answersForQuestion.length !== totalPlayers) {
      return null;
    }

    const firstAnswer = answersForQuestion[0].answer;

    const everyoneSame = answersForQuestion.every(
      (a) => a.answer === firstAnswer
    );

    if (!everyoneSame) {
      return null;
    }

    return {
      question: question.question,
      answer: firstAnswer,
    };
  })
  .filter(
    (
      item
    ): item is { question: string; answer: string } => item !== null
  );

  switch (page) {
    case "home":
      return (
        <Home
          onStart={() => setPage("playerSelect")}
          onShowHowToPlay={() => setPage("howToPlay")}
        />
      );

    case "howToPlay":
      return (
        <HowToPlay
          onBack={() => setPage("home")}
          onStart={() => setPage("playerSelect")}
        />
      );

    case "playerSelect":
      return (
        <PlayerSelect
          onNext={handlePlayerSelect}
          onBack={() => setPage("home")}
        />
      );

    case "passDevice":
      return (
        <PassDevice
          currentPlayer={currentPlayer}
          totalPlayers={totalPlayers}
          onNext={() => {
            setCurrentQuestion(0);
            setSelectedAnswer("");
            setPage("questions");
          }}
        />
      );

    case "questions":
      return (
        <Questions
          currentPlayer={currentPlayer}
          totalPlayers={totalPlayers}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          question={current.question}
          choices={current.choices}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={setSelectedAnswer}
          onNext={handleNextQuestion}
          onPrevious={handlePreviousQuestion}
        />
      );

    case "loading":
      return (
        <Loading
          onShowResult={() => setPage("result")}
        />
      );

    case "result":
      return (
        <Result
          commonPoints={commonPoints}
          onRestart={restartGame}
        />
      );

    default:
      return null;
  }
}

export default App;