import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../../utils/QuizService";

const QuizStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState("");
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      const subjectsData = await getSubjects();
      setSubjects(subjectsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (selectedSubject && selectedNumQuestions) {
        navigate("/take-quiz", { state: { selectedNumQuestions, selectedSubject } });
      } else {
        alert("Please select a subject and number of questions.");
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleNumQuestionsChange = (event) => {
    setSelectedNumQuestions(event.target.value);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-indigo-600 mb-2">I want to take a quiz on :</h3>
            <select
              className="form-select bg-indigo-100 border-indigo-300"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        );
      case 2:
        return (
          <div>
            <h4 className="text-indigo-600 mb-2">How many questions would you like to attempt ?</h4>
            <input
              type="number"
              className="form-control bg-indigo-100 border-indigo-300"
              value={selectedNumQuestions}
              onChange={handleNumQuestionsChange}
              placeholder="Enter the number of questions"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-indigo-600">Confirmation</h2>
            <p className="text-indigo-600">Subject: {selectedSubject}</p>
            <p className="text-indigo-600">Number of Questions: {selectedNumQuestions}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100;
    return (
      <div className="progress bg-gradient-to-r from-indigo-500 to-purple-600 h-10 rounded-full">
        <div
          className="progress-bar bg-indigo-600 h-full rounded-full"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span className="sr-only">{`Step ${currentStep}`}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="mt-5">
      <h3 className="text-indigo-600 mb-4">Welcome to the Online Quiz</h3>
      {renderProgressBar()}
      <div className="bg-indigo-100 rounded-lg shadow-lg p-6">
        {renderStepContent()}
        <div className="flex justify-between mt-4">
          {currentStep > 1 && (
            <button className="btn btn-primary bg-indigo-500 hover:bg-indigo-600" onClick={handlePrevious}>
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button
              className="btn btn-primary bg-indigo-500 hover:bg-indigo-600"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !selectedSubject) ||
                (currentStep === 2 && !selectedNumQuestions)
              }
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button className="btn btn-success bg-green-500 hover:bg-green-600" onClick={handleNext}>
              Start Quiz
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizStepper;
