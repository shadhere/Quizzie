import React from "react";
import styles from "../modules/QuestionToggleBar.module.css";

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
      {questions.map((question) => (
        <div
          key={question.id}
          className={`${styles.questionIndicator} ${
            question.id === currentQuestion ? styles.active : ""
          }`}
          onClick={() => handleToggleQuestion(question.id)}
        >
          {question.id}
          {question.id !== 1 && (
            <div
              className={styles.removeQuestionButton}
              onClick={() => handleRemoveQuestion(question.id)}
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
          onClick={() => handleRemoveQuestion(questions.length)}
        >
          X
        </div>
      )}
    </div>
  );
};

export default QuestionIndicatorsRow;
