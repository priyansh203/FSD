import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../../utils/QuizService";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

const GetAllQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const data = await getAllQuestions();
            setQuestions(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await deleteQuestion(id);
            setQuestions(questions.filter((question) => question.id !== id));
            setIsQuestionDeleted(true);
            setDeleteSuccess("Question deleted successfully.");
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {
            setDeleteSuccess("");
        }, 4000);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    }

    return (
        <section className="container mx-auto my-5 px-4">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-3xl font-semibold text-blue-600">All Quiz Questions</h4>
                <Link to={"/create-quiz"} className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    <FaPlus className="mr-2" /> Add Question
                </Link>
            </div>
            <hr className="my-4" />
            {isQuestionDeleted && <div className="bg-green-200 text-green-700 py-2 px-4 rounded-md mb-4">{deleteSuccess}</div>}
            {questions.map((question, index) => (
                <div key={question.id} className="bg-purple-100 shadow-md rounded-md mb-6 hover:shadow-lg transition duration-300 ease-in-out">
                    <div className="p-6">
                        <h5 className="text-lg font-semibold text-blue-700">{`${index + 1}. ${question.question}`}</h5>
                        <ul className="list-disc list-inside mt-2">
                            {question.choices.map((choice, index) => (
                                <li key={index} className="text-gray-600">{choice.choiceValue}</li>
                            ))}
                        </ul>
                        <p className="text-blue-700 mt-4">Correct Answers: {question.correctAnswers.map((correctAnswer) => correctAnswer.correctAnswerValue).join(', ')}</p>
                        <div className="mt-6 flex">
                            <Link to={`/update-quiz/${question.id}`} className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 mr-4 transform transition duration-300 hover:scale-105">
                                <FaEdit className="mr-2" /> Edit Question
                            </Link>
                            <button className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transform transition duration-300 hover:scale-105" onClick={() => handleDeleteQuestion(question.id)}>
                                <FaTrashAlt className="mr-2" /> Delete Question
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default GetAllQuiz;
