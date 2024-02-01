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
      const { questions, currentQuestion } = prevData.qna;

      // Check if the provided index is valid
      if (
        typeof index !== "undefined" &&
        questions &&
        index >= 0 &&
        index < questions.length
      ) {
        const selectedQuestion = questions[index];
        const selectedQuestionType = selectedQuestion
          ? selectedQuestion.correctOption
          : null;

        return {
          ...prevData,
          qna: {
            ...prevData.qna,
            currentQuestion: index,
            selectedQuestionType,
            options: [],
          },
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
      const { questions, currentQuestion } = prevData.qna;

      // Check if the currentQuestion index is valid
      if (
        typeof currentQuestion !== "undefined" &&
        questions &&
        currentQuestion >= 0 &&
        currentQuestion < questions.length
      ) {
        const newFormData = { ...prevData };

        newFormData.qna.questions[currentQuestion].options[optionIndex][
          property
        ] = value;

        // If the input field corresponds to the correct answer, reset the correct answer index
        if (
          optionIndex ===
          newFormData.qna.questions[currentQuestion].correctOption
        ) {
          newFormData.qna.questions[currentQuestion].correctOption = null;
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
        {formData.qna && (
          <QuestionIndicatorsRow
            setFormData={setFormData}
            formData={formData}
            questions={formData.qna.questions}
            maxQuestions={formData.qna.maxQuestions}
            currentQuestion={formData.qna.currentQuestion}
            handleToggleQuestion={(index) => handleToggleQuestion(index)}
          />
        )}

        {/* Question Input */}
        {formData.qna && (
          <QuestionInput setFormData={setFormData} formData={formData} />
        )}

        <div className={styles.ChoiceAndTimerContainer}>
          {formData.qna &&
            formData.qna.questions &&
            formData.qna.questions[formData.qna.currentQuestion] &&
            formData.qna.questions[formData.qna.currentQuestion]
              .selectedQuestionType && (
              <ChoiceInput
                // onChoiceChange={handleChoiceChange}
                options={
                  formData.qna.questions[formData.qna.currentQuestion].options
                }
                selectedOption={
                  formData.qna.questions[formData.qna.currentQuestion]
                    .selectedQuestionType
                }
                correctAnswerIndex={
                  formData.qna.questions[formData.qna.currentQuestion]
                    .correctOption
                }
                handleInputChange={(optionIndex, property, value) =>
                  handleInputChange(optionIndex, property, value)
                }
                handleSelectCorrectAnswer={(optionIndex) =>
                  handleSelectCorrectAnswer(optionIndex)
                }
                addOption={() => addOption(formData.qna.currentQuestion)}
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
