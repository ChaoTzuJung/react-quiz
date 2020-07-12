import React, { useState, useEffect } from 'react';
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
  const [ gameOver, setGameOver ] = useState(true);

  // https://stackoverflow.com/questions/53898810/executing-async-code-on-update-of-state-with-react-hooks
  // 模擬 DidUpdate
  // useEffect(() => {
  //   console.log(questions)
  //   if (questions != []) {
  //     setLoading(false);
  //   }
  // }, [questions])

  // NOTE: 順序？ setLoading 要等 setQuestions 完成 ? Error Handling?
  const startTrivia = async () => {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
  const nextQuestuin = () => {}

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>Start</button>
      ) : null}
      {!gameOver ? <p className="score">Score:</p> : null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}          
        />
      )}
      {
        !gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number + 1 !== TOTAL_QUESTIONS ? (
          <button className="start" onClick={nextQuestuin}>Next Question</button>
        ) : null
      }
    </div>
  )
}

export default App;
