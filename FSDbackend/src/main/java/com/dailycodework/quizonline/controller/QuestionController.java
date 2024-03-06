package com.dailycodework.quizonline.controller;

import com.dailycodework.quizonline.model.Choice;
import com.dailycodework.quizonline.model.CorrectAnswer;
import com.dailycodework.quizonline.model.Question;
import com.dailycodework.quizonline.service.IQuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;

/**
 * Controller class to handle endpoints related to questions.
 */
@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuestionController {
    private final IQuestionService questionService;

    /**
     * Endpoint to create a new question.
     * @param question The question object to be created.
     * @return ResponseEntity containing the created question.
     */
    @PostMapping("/create-new-question")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question){
        Question createdQuestion = questionService.createQuestion(question);
        return ResponseEntity.status(CREATED).body(createdQuestion);
    }

    /**
     * Endpoint to get all questions.
     * @return ResponseEntity containing a list of all questions.
     */
    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    /**
     * Endpoint to get a question by its ID.
     * @param id The ID of the question to retrieve.
     * @return ResponseEntity containing the question.
     * @throws ChangeSetPersister.NotFoundException if the question is not found.
     */
    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion = questionService.getQuestionById(id);
        if (theQuestion.isPresent()){
            return ResponseEntity.ok(theQuestion.get());
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    /**
     * Endpoint to update a question.
     * @param id The ID of the question to update.
     * @param question The updated question object.
     * @return ResponseEntity containing the updated question.
     * @throws ChangeSetPersister.NotFoundException if the question is not found.
     */
    @PutMapping("/question/{id}/update")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id, @RequestBody Question question) throws ChangeSetPersister.NotFoundException {
        Question updatedQuestion = questionService.updateQuestion(id, question);
        return ResponseEntity.ok(updatedQuestion);
    }

    /**
     * Endpoint to delete a question.
     * @param id The ID of the question to delete.
     * @return ResponseEntity indicating the success of the operation.
     */
    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Endpoint to get all subjects.
     * @return ResponseEntity containing a list of all subjects.
     */
    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects(){
        List<String> subjects = questionService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    /**
     * Endpoint to fetch random questions for a user.
     * @param numOfQuestions The number of questions to fetch.
     * @param subject The subject of the questions.
     * @return ResponseEntity containing a list of random questions.
     */
    @GetMapping("/quiz/fetch-questions-for-user")
    public ResponseEntity<List<Question>> getQuestionsForUser(
            @RequestParam Integer numOfQuestions, @RequestParam String subject) {
        List<Question> allQuestions = new ArrayList<>(questionService.getQuestionsForUser(numOfQuestions, subject));
        Collections.shuffle(allQuestions);


        // Return a sublist of randomized questions limited by the requested number
        int availableQuestions = Math.min(numOfQuestions, allQuestions.size());
        List<Question> randomQuestions = allQuestions.subList(0, availableQuestions);
        return ResponseEntity.ok(randomQuestions);
    }




}
