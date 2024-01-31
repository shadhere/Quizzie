import React from "react";
import styles from "./QuestionToggleBar.module.css";

const QuestionIndicatorsRow = ({
  questions,
  currentQuestion,
  handleToggleQuestion,
  handleRemoveQuestion,
  handleAddQuestion,
  maxQuestions,
}) => {
  return (
    <div className={styles.questionRow}>
      {questions.map((question, index) => (
        <div
          key={index}
          className={`${styles.questionIndicator} ${
            index === currentQuestion ? styles.active : ""
          }`}
          onClick={() => handleToggleQuestion(index)}
        >
          {index + 1}
          {index !== 0 && (
            <div
              className={styles.removeQuestionButton}
              onClick={() => handleRemoveQuestion(index)}
            >
              &#215; {/* Unicode for "×" */}
            </div>
          )}
        </div>
      ))}
      {questions.length < maxQuestions && (
        <div className={styles.addQuestionButton} onClick={handleAddQuestion}>
          +
        </div>
      )}
      {questions.length === maxQuestions && (
        <div
          className={styles.removeQuestionButton}
          onClick={() => handleRemoveQuestion(questions.length - 1)}
        >
          X
        </div>
      )}
    </div>
  );
};

export default QuestionIndicatorsRow;
