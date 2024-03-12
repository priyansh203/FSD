import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "../../../utils/QuizService";

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([{ id: "", choiceValue: "" }]);
  const [correctAnswers, setCorrectAnswers] = useState([{ id: "", correctAnswerValue: "" }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question);
        setChoices(questionToUpdate.choices);
        setCorrectAnswers(questionToUpdate.correctAnswers);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index].choiceValue = e.target.value;
    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (index, e) => {
    const updatedCorrectAnswers = [...correctAnswers];
    updatedCorrectAnswers[index].correctAnswerValue = e.target.value;
    setCorrectAnswers(updatedCorrectAnswers);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers,
      };
      await updateQuestion(id, updatedQuestion);
      navigate("/all-quizzes");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h4 className="mt-5 text-3xl font-semibold text-purple-700">Update Quiz Question</h4>
      <div className="mt-8">
        <form onSubmit={handleUpdate}>
          <div className="mb-6">
            <label className="block text-xl text-blue-700 mb-2">Question:</label>
            <textarea
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows={4}
              value={question}
              onChange={handleQuestionChange}
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-xl text-blue-700 mb-2">Choices:</label>
            {choices.map((choice, index) => (
              <input
                key={index}
                type="text"
                className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={choice.choiceValue}
                onChange={(e) => handleChoiceChange(index, e)}
              />
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-xl text-blue-700 mb-2">Correct Answer(s):</label>
            {correctAnswers.map((answer, index) => (
              <input
                key={index}
                type="text"
                className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={answer.correctAnswerValue}
                onChange={(e) => handleCorrectAnswerChange(index, e)}
              />
            ))}
          </div>

          <div className="flex items-center">
            <button type="submit" className="bg-purple-600 text-white py-3 px-6 rounded-lg mr-4 hover:bg-purple-700 focus:outline-none focus:bg-purple-700 transition duration-300">
              Update Question
            </button>
            <Link to={"/all-quizzes"} className="text-purple-600 hover:text-purple-700 text-xl focus:outline-none">
              Back to All Questions
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuestion;
