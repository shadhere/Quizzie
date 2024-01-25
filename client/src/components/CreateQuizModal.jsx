// CreateQuizModal.js
import React, { useState } from "react";
import Modal from "./Modal";
import styles from "../modules/Modal.module.css";

const CreateQuizModal = ({
  isOpen,
  onClose,
  onContinuePollType,
  onContinueQuizQna,
}) => {
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: "qna", label: "Q & A" },
    { id: "poll", label: "Poll Type" },
  ];

  const handleOptionClick = (id) => {
    setSelectedOption(id === selectedOption ? null : id);
  };

  const handleContinue = () => {
    // Pass both the title and selected option to the onContinue callback
    if (selectedOption === "qna") {
      onContinueQuizQna(title, selectedOption);
    } else if (selectedOption === "poll") {
      onContinuePollType(title, selectedOption);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Quiz Name"
          className={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={styles.checkboxContainer}>
          <div className={styles.quizTypeText}>Quiz Type</div>{" "}
          <div
            className={`${styles.checkboxOptionQuiz} ${
              selectedOption === "qna" && styles.selected
            }`}
            onClick={() => handleOptionClick("qna")}
          >
            Q & A
          </div>
          <div
            className={`${styles.checkboxOptionQuiz} ${
              selectedOption === "poll" && styles.selected
            }`}
            onClick={() => handleOptionClick("poll")}
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
    </Modal>
  );
};

export default CreateQuizModal;
