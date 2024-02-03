import React from "react";
import styles from "./QuestionToggleBar.module.css";
import AddOption from "../../assets/AddOption.svg";

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
              &#215; {}
            </div>
          )}
        </div>
      ))}
      {questions.length < maxQuestions && (
        <div className={styles.addQuestionButton} onClick={handleAddQuestion}>
          <img src={AddOption} alt="" />
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
      <div className={styles.questionIndicatorText}>Max 5 questions</div>
    </div>
  );
};

export default QuestionIndicatorsRow;
