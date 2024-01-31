import React, { useState } from "react";
import ChoiceInput from "../AnswerChociceEditor/AnswerChoiceEditor";
import styles from "./editQuiz.module.css";
import QuestionIndicatorsRow from "../QuestionToggle/QuestionToggleBar";
import QuestionInput from "../QuestionTitleandType/QuestionTitleAndType";

const EditQuiz = ({ initialFormData, onCloseEdit }) => {
  const [formData, setFormData] = useState(initialFormData);

  console.log("formData:", formData); // Log formData for debugging

  const onSave = () => {
    // Additional logic if needed

    // Call a function to handle updating the quiz with the modified formData
    // (You need to implement this function)
    updateQuiz(formData);

    // Close the modal
    onCloseEdit();
  };

  // Implement the updateQuiz function
  const updateQuiz = (formData) => {
    // Add logic to send updated quiz data to the server or perform other actions
    console.log("Updated quiz data:", formData);
  };

  // Other functions for handling form interactions go here

  const handleQuestionTextChange = (newText) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      qna: {
        ...prevFormData.qna,
        questions: prevFormData.qna.questions.map((question, index) =>
          index === prevFormData.qna.currentQuestion
            ? { ...question, questionText: newText }
            : question
        ),
      },
    }));
  };

  const handleChoiceChange = (newOptions) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      qna: {
        ...prevFormData.qna,
        questions: prevFormData.qna.questions.map((question, index) =>
          index === prevFormData.qna.currentQuestion
            ? { ...question, options: newOptions }
            : question
        ),
      },
    }));
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Quiz</h2>

        {/* Question Indicators and Navigation */}
        {formData.qna && (
          <QuestionIndicatorsRow
            setFormData={setFormData}
            formData={formData}
            questions={formData.qna.questions}
            maxQuestions={formData.qna.maxQuestions}
            currentQuestion={formData.qna.currentQuestion}
            handleToggleQuestion={(index) => handleToggleQuestion(index)}
            handleRemoveQuestion={() => handleRemoveQuestion()}
            handleAddQuestion={() => handleAddQuestion()}
          />
        )}

        {/* Question Input */}
        {formData.qna && (
          <QuestionInput
            setFormData={setFormData}
            formData={formData}
            onQuestionTextChange={handleQuestionTextChange}
          />
        )}

        <div className={styles.ChoiceAndTimerContainer}>
          {formData.qna &&
            formData.qna.questions &&
            formData.qna.questions[formData.qna.currentQuestion] &&
            formData.qna.questions[formData.qna.currentQuestion]
              .selectedQuestionType && (
              <ChoiceInput
                onChoiceChange={handleChoiceChange}
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
