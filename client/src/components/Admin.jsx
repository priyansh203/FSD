import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section className="container mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome to Admin Home Page</h2>
      <hr className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/create-quiz"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 flex justify-center items-center"
        >
          <span className="mr-2">Create a New Quiz</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Link>
        <Link
          to="/all-quizzes"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 flex justify-center items-center"
        >
          <span className="mr-2">Manage Existing Quizzes</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Admin;
