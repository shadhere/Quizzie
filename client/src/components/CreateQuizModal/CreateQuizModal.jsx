import React from "react";
import styles from "../Modal/Modal.module.css";
import { useEffect } from "react";

const CreateQuizModal = ({
  formData,
  handleInputChange,
  onClose,
  onContinuePollQna,
  onContinueQuizQna,
}) => {
  const options = [
    { id: "qna", label: "Q & A" },
    { id: "poll", label: "Poll Type" },
  ];

  const handleContinue = () => {
    // Pass both the title and selected option to the onContinue callback
    if (formData.quiz.selectedQuizType === "qna") {
      onContinueQuizQna(formData.quiz.title, formData.quiz.selectedQuizType);
    } else if (formData.quiz.selectedQuizType === "poll") {
      onContinuePollQna(formData.quiz.title, formData.quiz.selectedQuizType);
    }
  };

  return (
    <>
      <form>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Quiz Name"
          className={styles.inputField}
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />

        <div className={styles.checkboxContainer}>
          <div className={styles.quizTypeText}>Quiz Type</div>
          <div
            className={`${styles.checkboxOptionQuiz} ${
              formData.quiz.selectedQuizType === "qna" && styles.selected
            }`}
            onClick={() => handleInputChange("selectedQuizType", "qna")}
          >
            Q & A
          </div>
          <div
            className={`${styles.checkboxOptionQuiz} ${
              formData.quiz.selectedQuizType === "poll" && styles.selected
            }`}
            onClick={() => handleInputChange("selectedQuizType", "poll")}
          >
            Poll Type
          </div>
        </div>
      </form>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} type="button" onClick={onClose}>
          Cancel
        </button>

        <button
          className={styles.continueButton}
          type="button"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default CreateQuizModal;
