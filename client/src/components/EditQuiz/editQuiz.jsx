import React, { useState } from "react";
import ChoiceInput from "../AnswerChociceEditor/AnswerChoiceEditor";
import styles from "./editQuiz.module.css";
import QuestionIndicatorsRow from "../QuestionToggle/QuestionToggleBar";
import QuestionInput from "../QuestionTitleandType/QuestionTitleAndType";

const EditQuiz = ({ initialFormData, onCloseEdit }) => {
  const [formData, setFormData] = useState(initialFormData);

  console.log("formData:", formData);

  const handleToggleQuestion = (index) => {
    setFormData((prevData) => {
      // Check if the provided index is valid
      if (
        typeof index !== "undefined" &&
        index >= 0 &&
        index < prevData.questions.length
      ) {
        const selectedQuestion = prevData.questions[index];
        const selectedQuestionType = selectedQuestion
          ? selectedQuestion.selectedQuestionType
          : null;

        return {
          ...prevData,
          currentQuestion: index,
          selectedQuestionType,
          options: [],
        };
      } else {
        // Handle the case where the index is undefined or out of range
        console.error("Invalid question index:", index);
        return prevData;
      }
    });
  };

  const handleInputChange = (optionIndex, property, value) => {
    setFormData((prevData) => {
      const { questions, currentQuestion } = prevData;

      // Check if the currentQuestion index is valid
      if (
        typeof currentQuestion !== "undefined" &&
        questions &&
        currentQuestion >= 0 &&
        currentQuestion < questions.length
      ) {
        const newFormData = { ...prevData };

        newFormData.questions[currentQuestion].options[optionIndex][property] =
          value;

        // If the input field corresponds to the correct answer, reset the correct answer index
        if (
          optionIndex === newFormData.questions[currentQuestion].correctOption
        ) {
          newFormData.questions[currentQuestion].correctOption = null;
        }

        return newFormData;
      } else {
        // Handle the case where the currentQuestion index is undefined or out of range
        console.error("Invalid question index:", currentQuestion);
        return prevData;
      }
    });
  };
  const onSave = () => {
    updateQuiz(formData);
    onCloseEdit();
  };

  const updateQuiz = (formData) => {
    console.log("Updated quiz data:", formData);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {/* Question Indicators and Navigation */}
        {formData && (
          <QuestionIndicatorsRow
            setFormData={setFormData}
            formData={formData}
            questions={formData.questions}
            maxQuestions={formData.maxQuestions}
            currentQuestion={formData.currentQuestion}
            handleToggleQuestion={(index) => handleToggleQuestion(index)}
          />
        )}

        {/* Question Input */}
        {formData && (
          <QuestionInput setFormData={setFormData} formData={formData} />
        )}

        <div className={styles.ChoiceAndTimerContainer}>
          {formData &&
            formData.questions &&
            formData.questions[formData.currentQuestion] &&
            formData.questions[formData.currentQuestion]
              .selectedQuestionType && (
              <ChoiceInput
                // onChoiceChange={handleChoiceChange}
                options={formData.questions[formData.currentQuestion].options}
                selectedOption={
                  formData.questions[formData.currentQuestion]
                    .selectedQuestionType
                }
                correctAnswerIndex={
                  formData.questions[formData.currentQuestion].correctOption
                }
                handleInputChange={(optionIndex, property, value) =>
                  handleInputChange(optionIndex, property, value)
                }
                handleSelectCorrectAnswer={(optionIndex) =>
                  handleSelectCorrectAnswer(optionIndex)
                }
                addOption={() => addOption(formData.currentQuestion)}
                removeOption={(optionIndex) => removeOption(optionIndex)}
              />
            )}
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.cancelButton} ${styles.qnaButton}`}
            type="button"
            onClick={onCloseEdit}
          >
            Cancel
          </button>
          <button
            className={`${styles.continueButton} ${styles.qnaButton}`}
            type="button"
            onClick={onSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
