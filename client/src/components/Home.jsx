import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/quiz-stepper");
  };

  return (
    <main className="flex mt-16 justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Welcome to the Quizilla</h1>
        <p className="text-lg text-gray-600 mb-10">Challenge yourself with our quizzes</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          Get Started
        </button>
      </div>
    </main>
  );
};

export default Home;
