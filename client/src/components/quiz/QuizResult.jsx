import React from "react";
import { useLocation } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const { quizQuestions, totalScores } = location.state;
  const numQuestions = quizQuestions.length;
  const percentage = Math.round((totalScores / numQuestions) * 100);

  const handleRetakeQuiz = () => {
    // Implement retake quiz functionality here
    // alert("Oops! this functionality was not implemented!!!")
  };

  return (
    <section className="container mt-5">
      <h3 className="text-2xl font-bold mb-4">Your Quiz Result Summary</h3>
      <hr className="my-4" />
      <h5 className="text-lg font-bold text-purple-600">
        You answered {totalScores} out of {numQuestions} questions correctly.
      </h5>
      <p className="text-lg">
        Your total score is <span className="font-bold">{percentage}%</span>.
      </p>

      <button
        className="btn btn-primary btn-sm mt-4"
        onClick={handleRetakeQuiz}
      >
        Retake this quiz
      </button>
    </section>
  );
};

export default QuizResult;
