import React from "react";

const AnswerOptions = ({ question, isChecked, handleAnswerChange, handleCheckboxChange }) => {
  if (!question) {
    return (
      <div>
        No questions available, <br /> you may try again by reducing your requested number of questions on this topic
      </div>
    );
  }

  const { id, questionType, choices } = question;

  if (questionType === "single") {
    return (
      <div>
        {choices.sort((a, b) => a.id - b.id).map((choice) => (
          <div key={choice.id} className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              id={choice.id}
              name={question.id}
              value={choice.choiceValue}
              checked={isChecked(question.id, choice.choiceValue)}
              onChange={() => handleAnswerChange(id, choice.choiceValue)}
            />
            <label htmlFor={choice.id} className="form-check-label ms-2">
              {choice.choiceValue}
            </label>
          </div>
        ))}
      </div>
    );
  } else if (questionType === "multiple") {
    return (
      <div>
        {choices.sort((a, b) => a.id - b.id).map((choice) => (
          <div key={choice.id} className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id={choice.id}
              name={question.id}
              value={choice.choiceValue}
              checked={isChecked(question.id, choice.choiceValue)}
              onChange={() => handleCheckboxChange(id, choice.choiceValue)}
            />
            <label htmlFor={choice.id} className="form-check-label ms-2">
              {choice.choiceValue}
            </label>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default AnswerOptions;
