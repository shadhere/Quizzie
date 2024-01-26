// QnAModal.js
import React, { useState } from "react";
import Modal from "./Modal";
import ChoiceInput from "./AnswerChoiceEditor";
import styles from "../modules/Modal.module.css";
import QuestionIndicatorsRow from "./QuestionToggleBar";
import QuestionInput from "./QuestionTitleAndType";
import TimerInputComponent from "./TimerInput";

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

  const handleTimerChange = (value) => {
    // Handle timer change logic here
    console.log("Timer changed:", value);
  };

  return (
    <Modal
      isOpen={isQnaOpen}
      onClose={onCloseQna}
      questions={questions}
      currentQuestion={currentQuestion}
      selectedOption={selectedOption}
      handleInputChange={(value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestion - 1].text = value;
        setQuestions(updatedQuestions);
      }}
      handleOptionChange={handleOptionChange}
    >
      {" "}
      <QuestionIndicatorsRow
        questions={questions}
        currentQuestion={currentQuestion}
        handleToggleQuestion={handleToggleQuestion}
        handleRemoveQuestion={handleRemoveQuestion}
        handleAddQuestion={handleAddQuestion}
        maxQuestions={maxQuestions}
      />
      <QuestionInput
        question={questions[currentQuestion - 1]}
        currentOption={selectedOption}
        handleInputChange={(value) => {
          const updatedQuestions = [...questions];
          updatedQuestions[currentQuestion - 1].text = value;
          setQuestions(updatedQuestions);
        }}
        handleOptionChange={handleOptionChange}
      />
      <div className={styles.ChoiceAndTimerContainer}>
        {selectedOption && (
          <ChoiceInput
            options={options}
            addOption={addOption}
            removeOption={removeOption}
            selectedOption={selectedOption}
          />
        )}
        <TimerInputComponent onTimerChange={handleTimerChange} />
      </div>
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
