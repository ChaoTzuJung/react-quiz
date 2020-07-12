import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { Difficulty, QuestionState, fetchQuizQuestions } from './api';

type AnswerObject = {
  question: string;
  answer: string;
  correct: string;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [ loading, setLoading ] = useState(false);
  const [ questions, setQuestions ] = useState<QuestionState[]>([]);
  const [ number, setNumber ] = useState(0);
  const [ userAnswers, setUserAnswers ] = useState<AnswerObject[]>([]);
  const [ score, setScore ] = useState(0);
  const [ gameOver, setGameOver ] = useState(false);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      console.log(newQuestions);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0)
    }

    catch (err) {
      setLoading(false);
      setGameOver(true);
    }
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
  const nextQuestuin = () => {}

  return (
    <div className="App">
      <h1>Quiz</h1>
      <button className="start" onClick={startTrivia}>Start</button>
      <p className="score">Score:</p>
      <p>Loading Questions...</p>
      {/* <QuestionCard
        question={questions[number].question}
        answers={questions[number].answers}
        callback={checkAnswer}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
      /> */}
      <button className="start" onClick={nextQuestuin}>Next</button>
    </div>
  )
}

export default App;
