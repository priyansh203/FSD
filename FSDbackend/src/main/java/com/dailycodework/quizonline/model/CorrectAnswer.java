package com.dailycodework.quizonline.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CorrectAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String correctAnswerValue;

    // Constructor with String argument
    public CorrectAnswer(String correctAnswerValue) {
        this.correctAnswerValue = correctAnswerValue;
    }

    // Default constructor
    public CorrectAnswer() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCorrectAnswerValue() {
        return correctAnswerValue;
    }

    public void setCorrectAnswerValue(String correctAnswerValue) {
        this.correctAnswerValue = correctAnswerValue;
    }

    // Getters and setters
}
