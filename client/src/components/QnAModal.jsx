// QnAModal.js
import React, { useState } from "react";
import Modal from "./Modal";
import ChoiceInput from "./ChoiceInput";
import styles from "../modules/Modal.module.css";

const QnAModal = ({ isQnaOpen, onCloseQna }) => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "", selectedOption: null, options: [] },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const maxQuestions = 5;

  const handleOptionChange = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
    setOptions([]); // Reset options when the option changes
  };

  const addOption = (option) => {
    setOptions([...options, option]);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const onSave = () => {
    // Handle any logic needed to save additional info
    // For now, just close the modal
    onCloseQna();
  };

  const handleToggleQuestion = (questionId) => {
    setCurrentQuestion(questionId);
    setSelectedOption(questions[questionId - 1]?.selectedOption || null);
    setOptions([]);
  };

  const handleAddQuestion = () => {
    if (questions.length < maxQuestions) {
      const newQuestion = {
        id: questions.length + 1,
        text: "",
        selectedOption: null,
        options: [],
      };

      setQuestions([...questions, newQuestion]);
      setCurrentQuestion(newQuestion.id);
      setSelectedOption(null);
      setOptions([]);
    }
  };

  const handleRemoveQuestion = () => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter(
        (question) => question.id !== currentQuestion
      );
      setQuestions(updatedQuestions);
      setCurrentQuestion(updatedQuestions[updatedQuestions.length - 1].id);
      setSelectedOption(
        updatedQuestions[updatedQuestions.length - 1].selectedOption
      );
      setOptions([]);
    }
  };

  return (
    <Modal isOpen={isQnaOpen} onClose={onCloseQna}>
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
            onClick={handleRemoveQuestion}
          >
            X
          </div>
        )}
      </div>

      <input
        className={styles.inputQuestion}
        type="text"
        placeholder={`Poll Question ${currentQuestion}`}
        value={questions[currentQuestion - 1]?.text}
        onChange={(e) => {
          const updatedQuestions = [...questions];
          updatedQuestions[currentQuestion - 1].text = e.target.value;
          setQuestions(updatedQuestions);
        }}
      />
      <div className={styles.circularCheckboxContainer}>
        <label className={styles.checkboxLabel}>
          <span className={styles.pollOptionTypeLabel}>Option Type</span>
          <div
            className={`${styles.circularCheckbox} ${
              selectedOption === "text" && styles.checked
            }`}
            onClick={() => handleOptionChange("text")}
          >
            <div className={`${styles.innerCheckbox}`} />
          </div>
          <span className={styles.pollOptionTypeText}>Text</span>
        </label>
        <label className={styles.checkboxLabel}>
          <div
            className={`${styles.circularCheckbox} ${
              selectedOption === "image" && styles.checked
            }`}
            onClick={() => handleOptionChange("image")}
          >
            <div className={`${styles.innerCheckbox}`} />
          </div>
          <span className={styles.pollOptionTypeText}>Image URL</span>
        </label>
        <label className={styles.checkboxLabel}>
          <div
            className={`${styles.circularCheckbox} ${
              selectedOption === "textAndImage" && styles.checked
            }`}
            onClick={() => handleOptionChange("textAndImage")}
          >
            <div className={`${styles.innerCheckbox}`} />
          </div>
          <span className={styles.pollOptionTypeText}>Text and Image URL</span>
        </label>
      </div>
      {selectedOption && (
        <ChoiceInput
          options={options}
          addOption={addOption}
          removeOption={removeOption}
        />
      )}
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.cancelButton} ${styles.qnaButton}`}
          type="button"
          onClick={onCloseQna}
        >
          Cancel
        </button>
        <button
          className={`${styles.continueButton} ${styles.qnaButton}`}
          type="button"
          onClick={onSave}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default QnAModal;
