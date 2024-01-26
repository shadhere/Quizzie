// QuestionInput.js
import React from "react";
import styles from "../modules/QuestionTitleAndType.module.css";

const QuestionInput = ({
  question,
  currentOption,
  handleInputChange,
  handleOptionChange,
}) => {
  return (
    <>
      <div className={styles.inputQuestionContainer}>
        <input
          className={styles.inputQuestionTitle}
          type="text"
          placeholder={`Poll Question ${question.id}`}
          value={question.text}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className={styles.CheckboxContainer}>
          <label className={styles.checkboxLabel}>
            <span className={styles.inputQuestionType}>Option Type</span>
            <div
              className={`${styles.radioCheckbox} ${
                currentOption === "text" && styles.checked
              }`}
              onClick={() => handleOptionChange("text")}
            >
              <div className={`${styles.innerCheckbox}`} />
            </div>
            <span className={styles.inputQuestionTypeLabel}>Text</span>
          </label>
          <label className={styles.checkboxLabel}>
            <div
              className={`${styles.radioCheckbox} ${
                currentOption === "image" && styles.checked
              }`}
              onClick={() => handleOptionChange("image")}
            >
              <div className={`${styles.innerCheckbox}`} />
            </div>
            <span className={styles.inputQuestionTypeLabel}>Image URL</span>
          </label>
          <label className={styles.checkboxLabel}>
            <div
              className={`${styles.radioCheckbox} ${
                currentOption === "textAndImage" && styles.checked
              }`}
              onClick={() => handleOptionChange("textAndImage")}
            >
              <div className={`${styles.innerCheckbox}`} />
            </div>
            <span className={styles.inputQuestionTypeLabel}>
              Text and Image URL
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default QuestionInput;
