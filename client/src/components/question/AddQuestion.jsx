import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import { createQuestion, getSubjects } from "../../../utils/QuizService"

const AddQuestion = () => {
	const [question, setQuestionText] = useState("")
	const [questionType, setQuestionType] = useState("single")
	const [choices, setChoices] = useState([""])
	const [correctAnswers, setCorrectAnswers] = useState([""])
	const [subject, setSubject] = useState("")
	const [newSubject, setNewSubject] = useState("")
	const [subjectOptions, setSubjectOptions] = useState([""])

	useEffect(() => {
		fetchSubjects()
	}, [])

	const fetchSubjects = async () => {
		try {
			const subjectsData = await getSubjects()
			setSubjectOptions(subjectsData)
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddChoice = () => {
		const lastChoice = choices[choices.length - 1]
		const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A"
		const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
		const newChoice = `${newChoiceLetter}.`
		setChoices([...choices, newChoice])
	}

	const handleRemoveChoice = (index) => {
		setChoices(choices.filter((choice, i) => i !== index))
	}

	const handleChoiceChange = (index, value) => {
		setChoices(choices.map((choice, i) => (i === index ? value : choice)))
	}

	const handleCorrectAnswerChange = (index, value) => {
		setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
	}

	const handleAddCorrectAnswer = () => {
		setCorrectAnswers([...correctAnswers, ""])
	}

	const handleRemoveCorrectAnswer = (index) => {
		setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const result = {
				question,
				questionType,
				choices,
				correctAnswers: correctAnswers.map((answer) => {
					const choiceLetter = answer.charAt(0).toUpperCase()
					const choiceIndex = choiceLetter.charCodeAt(0) - 65
					return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null
				}),

				subject
			}

			await createQuestion(result)

			setQuestionText("")
			setQuestionType("single")
			setChoices([""])
			setCorrectAnswers([""])
			setSubject("")
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddSubject = () => {
		if (newSubject.trim() !== "") {
			setSubject(newSubject.trim())
			setSubjectOptions([...subjectOptions, newSubject.trim()])
			setNewSubject("")
		}
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6  mt-5">
					<div className="card">
						<div class="card-header bg-gradient-to-r from-blue-400 to-purple-400 px-6 text-white flex justify-center items-center">
							<h5 class="card-title text-2xl font-semibold pt-2">Add New Questions</h5>
						</div>



						<div className="card-body">
							<form onSubmit={handleSubmit} className="p-2">
								<div class="mb-6">
									<label for="subject" class="block text-lg font-semibold text-gray-600 mb-2">Select a Subject</label>
									<div class="relative">
										<select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} class="block appearance-none w-full bg-purple-50 border border-purple-500 text-gray-600 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-purple-500">
											<option value="">Select subject</option>
											<option value={"New"}>Add New</option>
											{subjectOptions.map((option) => (
												<option key={option} value={option}>{option}</option>
											))}
										</select>
										<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
											<svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
										</div>
									</div>
								</div>


								{subject === "New" && (
									<div className="mb-3">
										<label htmlFor="new-subject" className="text-gray-600  block text-lg font-semibold  mb-2">
											Add New Subject
										</label>
										<input
											type="text"
											id="new-subject"
											value={newSubject}
											onChange={(event) => setNewSubject(event.target.value)}
											className="form-control  bg-purple-50 border border-purple-00 text-gray-600 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-purple-500"
										/>
										<button
											type="button"
											onClick={handleAddSubject}
											className=" mt-2 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-md hover:bg-purple-700 mr-4 transform transition duration-300 hover:scale-105">
											Add Subject
										</button>
									</div>
								)}
								<div className="mb-3 ">
									<label htmlFor="question-text" className="form-label text-gray-600  block text-lg font-semibold  mb-2">
										Question
									</label>
									<textarea
										className="form-control  bg-purple-50"
										rows={4}
										value={question}
										onChange={(e) => setQuestionText(e.target.value)}></textarea>
								</div>
								<div className="mb-3">
									<label htmlFor="question-type" className="form-label  text-gray-600  block text-lg font-semibold  mb-2">
										Question type
									</label>
									<select
										id="question-type"
										value={questionType}
										onChange={(event) => setQuestionType(event.target.value)}
										className="form-control  bg-purple-50">
										<option value="single">Single Answer</option>
										<option value="multiple">Multiple Answer</option>
									</select>
								</div>
								<div className="mb-3">
									<label htmlFor="choices" className="form-label text-gray-600  block text-lg font-semibold  mb-2">
										Choices
									</label>
									{choices.map((choice, index) => (
										<div key={index} className="input-group mb-3">
											<input
												type="text"
												value={choice}
												onChange={(e) => handleChoiceChange(index, e.target.value)}
												className="form-control bg-purple-50 rounded"
											/>
											<button
												type="button"
												onClick={() => handleRemoveChoice(index)}
												className="rounded mx-3 inline-flex items-center px-4 py-2 bg-red-500 text-white hover:bg-red-600 transform transition duration-300 hover:scale-105">
												Remove
											</button>
										</div>
									))}
									<button
										type="button"
										onClick={handleAddChoice}
										className="btn  mt-2 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white rounded-md hover:bg-purple-700 mr-4 transform transition duration-300 hover:scale-105">
										Add Choice
									</button>
								</div>
								{questionType === "single" && (
									<div className="mb-3">
										<label htmlFor="answer" className="form-label text-success text-lg font-semibold ">
											Correct Answer
										</label>
										<input
											type="text"
											className="form-control  bg-purple-50"
											id="answer"
											value={correctAnswers[0]}
											onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
										/>
									</div>
								)}
								{questionType === "multiple" && (
									<div className="mb-3">
										<label htmlFor="answer" className="form-label text-success text-lg font-semibold">
											Correct Answer(s)
										</label>
										{correctAnswers.map((answer, index) => (
											<div key={index} className="d-flex mb-2">
												<input
													type="text"
													className="form-control me-2"
													value={answer}
													onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
												/>
												{index > 0 && (
													<button
														type="button"
														className="btn btn-danger"
														onClick={() => handleRemoveCorrectAnswer(index)}>
														Remove
													</button>
												)}
											</div>
										))}
										<button
											type="button"
											className="btn btn-outline-info"
											onClick={handleAddCorrectAnswer}>
											Add Correct Answer
										</button>
									</div>
								)}

								{!correctAnswers.length && <p>Please enter at least one correct answer.</p>}

								<div className="btn-group">
									<button type="submit" className="btn btn-outline-success mr-2">
										Save Question
									</button>
									<Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
										Back to existing questions
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddQuestion


// import { Link } from "react-router-dom"
// //import { createQuestion, getSubjects } from "../../../utils/QuizService"

// const AddQuestion = () => {
// 	const [question, setQuestionText] = useState("")
// 	const [questionType, setQuestionType] = useState("single")
// 	const [choices, setChoices] = useState([""])
// 	const [correctAnswers, setCorrectAnswers] = useState([""])
// 	const [subject, setSubject] = useState("")
// 	const [newSubject, setNewSubject] = useState("")
// 	const [subjectOptions, setSubjectOptions] = useState([""])

// 	useEffect(() => {
// 		fetchSubjects()
// 	}, [])

// 	const fetchSubjects = async () => {
// 		try {
// 			const subjectsData = await getSubjects()
// 			setSubjectOptions(subjectsData)
// 		} catch (error) {
// 			console.error(error)
// 		}
// 	}

// 	const handleAddChoice = () => {
// 		const lastChoice = choices[choices.length - 1]
// 		const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A"
// 		const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
// 		const newChoice = `${newChoiceLetter}`
// 		setChoices([...choices, newChoice])
// 	}

// 	const handleRemoveChoice = (index) => {
// 		setChoices(choices.filter((choice, i) => i !== index))
// 	}

// 	const handleChoiceChange = (index, value) => {
// 		setChoices(choices.map((choice, i) => (i === index ? value : choice)))
// 	}

// 	const handleCorrectAnswerChange = (index, value) => {
// 		setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
// 	}

// 	const handleAddCorrectAnswer = () => {
// 		setCorrectAnswers([...correctAnswers, ""])
// 	}

// 	const handleRemoveCorrectAnswer = (index) => {
// 		setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
// 	}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()
// 		try {
// 			const result = {
// 				question,
// 				questionType,
// 				choices,
// 				correctAnswers: correctAnswers.map((answer) => {
// 					const choiceLetter = answer.charAt(0).toUpperCase()
// 					const choiceIndex = choiceLetter.charCodeAt(0) - 65
// 					return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null
// 				}),

// 				subject
// 			}

// 			// await createQuestion(result)

// 			// setQuestionText("")
// 			// setQuestionType("single")
// 			// setChoices([""])
// 			// setCorrectAnswers([""])
// 			// setSubject("")
// 		} catch (error) {
// 			console.error(error)
// 		}
// 	}

// 	const handleAddSubject = () => {
// 		if (newSubject.trim() !== "") {
// 			setSubject(newSubject.trim())
// 			setSubjectOptions([...subjectOptions, newSubject.trim()])
// 			setNewSubject("")
// 		}
// 	}

// 	return (
// 		<div className="container">
// 			<div className="row justify-content-center">
// 				<div className="col-md-16  mt-5">
// 					<div className="card">
// 						<div className="card-header">
// 							<h5 className="card-title">Add New Questions</h5>
// 						</div>
// 						<div className="card-body">
// 							<form onSubmit={handleSubmit} className="p-2">
// 								<div className="mb-3">
// 									<label htmlFor="subject" className="form-label text-info">
// 										Select a Subject
// 									</label>
// 									<select
// 										id="subject"
// 										value={subject}
// 										onChange={(e) => setSubject(e.target.value)}
// 										className="form-control">
// 										<option value="">Select subject</option>
// 										<option value={"New"}>Add New</option>
// 										{subjectOptions.map((option) => (
// 											<option key={option} value={option}>
// 												{option}
// 											</option>
// 										))}
// 									</select>
// 								</div>

// 								{subject === "New" && (
// 									<div className="mb-3">
// 										<label htmlFor="new-subject" className="form-label text-info">
// 											Add New Subject
// 										</label>
// 										<input
// 											type="text"
// 											id="new-subject"
// 											value={newSubject}
// 											onChange={(event) => setNewSubject(event.target.value)}
// 											className="form-control"
// 										/>
// 										<button
// 											type="button"
// 											onClick={handleAddSubject}
// 											className="btn btn-outline-primary mt-2">
// 											Add Subject
// 										</button>
// 									</div>
// 								)}
// 								<div className="mb-3">
// 									<label htmlFor="question-text" className="form-label text-info">
// 										Question
// 									</label>
// 									<textarea
// 										className="form-control"
// 										rows={4}
// 										value={question}
// 										onChange={(e) => setQuestionText(e.target.value)}></textarea>
// 								</div>
// 								<div className="mb-3">
// 									<label htmlFor="question-type" className="form-label text-info">
// 										Question type
// 									</label>
// 									<select
// 										id="question-type"
// 										value={questionType}
// 										onChange={(event) => setQuestionType(event.target.value)}
// 										className="form-control">
// 										<option value="single">Single Answer</option>
// 										<option value="multiple">Multiple Answer</option>
// 									</select>
// 								</div>
// 								<div className="mb-3">
// 									<label htmlFor="choices" className="form-label text-primary">
// 										Choices
// 									</label>
// 									{choices.map((choice, index) => (
// 										<div key={index} className="input-group mb-3">
// 											<input
// 												type="text"
// 												value={choice}
// 												onChange={(e) => handleChoiceChange(index, e.target.value)}
// 												className="form-control"
// 											/>
// 											<button
// 												type="button"
// 												onClick={() => handleRemoveChoice(index)}
// 												className="btn btn-outline-danger">
// 												Remove
// 											</button>
// 										</div>
// 									))}
// 									<button
// 										type="button"
// 										onClick={handleAddChoice}
// 										className="btn btn-outline-primary">
// 										Add Choice
// 									</button>
// 								</div>
// 								{questionType === "single" && (
// 									<div className="mb-3">
// 										<label htmlFor="answer" className="form-label text-success">
// 											Correct Answer
// 										</label>
// 										<input
// 											type="text"
// 											className="form-control"
// 											id="answer"
// 											value={correctAnswers[0]}
// 											onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
// 										/>
// 									</div>
// 								)}
// 								{questionType === "multiple" && (
// 									<div className="mb-3">
// 										<label htmlFor="answer" className="form-label text-success">
// 											Correct Answer(s)
// 										</label>
// 										{correctAnswers.map((answer, index) => (
// 											<div key={index} className="d-flex mb-2">
// 												<input
// 													type="text"
// 													className="form-control me-2"
// 													value={answer}
// 													onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
// 												/>
// 												{index > 0 && (
// 													<button
// 														type="button"
// 														className="btn btn-danger"
// 														onClick={() => handleRemoveCorrectAnswer(index)}>
// 														Remove
// 													</button>
// 												)}
// 											</div>
// 										))}
// 										<button
// 											type="button"
// 											className="btn btn-outline-info"
// 											onClick={handleAddCorrectAnswer}>
// 											Add Correct Answer
// 										</button>
// 									</div>
// 								)}

// 								{!correctAnswers.length && <p>Please enter at least one correct answer.</p>}

// 								<div className="btn-group">
// 									<button type="submit" className="btn btn-outline-success mr-2">
// 										Save Question
// 									</button>
// 									<Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
// 										Back to existing questions
// 									</Link>
// 								</div>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default AddQuestion;