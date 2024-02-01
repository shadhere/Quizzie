import React from "react";
import ChoiceInput from "../AnswerChociceEditor/AnswerChoiceEditor";
import styles from "../Modal/Modal.module.css";
import QuestionIndicatorsRow from "../QuestionToggle/QuestionToggleBar";
import QuestionInput from "../QuestionTitleandType/QuestionTitleAndType";
import TimerInputComponent from "../TimerInput/TimerInput";

const QnAModal = ({
  formData,
  setFormData,
  isQnaOpen,
  onCloseQna,
  submitQuiz,
  currentModal,
}) => {
  const onSave = () => {
    // Additional logic if needed

    // Call submitQuiz to submit the quiz data
    submitQuiz();
  };

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

  const handleAddQuestion = () => {
    if (formData.questions.length < formData.maxQuestions) {
      const newQuestion = {
        text: "", // or provide some default text
        correctOption: null,
        options: [],
        selectedQuestionType: null,
        // other properties...
      };

      setFormData((prevData) => ({
        ...prevData,
        questions: [...prevData.questions, newQuestion],
        currentQuestion: prevData.questions.length,
        selectedQuestionType: null,
        options: [],
      }));
    }
  };

  const handleRemoveQuestion = () => {
    if (formData.questions.length > 1) {
      // Ensure there is more than one question
      const updatedQuestions = formData.questions.filter(
        (_, index) => index !== formData.currentQuestion
      );

      const updatedCurrentQuestion =
        formData.currentQuestion >= updatedQuestions.length
          ? updatedQuestions.length - 1
          : formData.currentQuestion;

      setFormData((prevData) => ({
        ...prevData,
        questions: updatedQuestions,
        currentQuestion: updatedCurrentQuestion,
        selectedQuestionType:
          updatedQuestions.length > 0
            ? updatedQuestions[updatedQuestions.length - 1]
                .selectedQuestionType || null
            : null,
      }));
    }
  };

  const handleTimerChange = (selectedTimer) => {
    let timerValue = 0;

    // Convert the selected timer value to seconds
    if (selectedTimer !== "OFF") {
      const seconds = parseInt(selectedTimer, 10);
      timerValue = isNaN(seconds) ? 0 : seconds;
    }

    setFormData((prevData) => ({
      ...prevData,
      quiz: {
        ...prevData,
        timer: timerValue,
      },
    }));
  };

  const addOption = (questionIndex) => {
    setFormData((prevData) => {
      const { questions, currentQuestion } = prevData;

      if (questions && questionIndex >= 0 && questionIndex < questions.length) {
        const updatedQuestions = [...questions];
        const currentQuestionObj = { ...updatedQuestions[questionIndex] };

        // Check if the number of options is less than 4 before adding a new option
        if (currentQuestionObj.options.length < 4) {
          currentQuestionObj.options.push({ text: "" });
          updatedQuestions[questionIndex] = currentQuestionObj;

          return {
            ...prevData,
            qna: {
              ...prevData,
              questions: updatedQuestions,
            },
          };
        } else {
          console.warn("Cannot add more than 4 options.");
          // Optionally, you can show a message or handle this situation accordingly.
          return prevData;
        }
      } else {
        console.error("Invalid question index:", questionIndex);
        return prevData;
      }
    });
  };

  const removeOption = (optionIndex) => {
    setFormData((prevData) => {
      const { questions, currentQuestion } = prevData;

      // Check if the currentQuestion index is valid
      if (
        typeof currentQuestion !== "undefined" &&
        questions &&
        currentQuestion >= 0 &&
        currentQuestion < questions.length
      ) {
        const options = questions[currentQuestion].options;

        // Check if there are more than 1 options before removing an option
        if (options.length > 1) {
          const newFormData = { ...prevData };

          // If the removed option was the correct answer, reset the correct answer index
          if (
            optionIndex === newFormData.questions[currentQuestion].correctOption
          ) {
            newFormData.questions[currentQuestion].correctOption = null;
          }

          options.splice(optionIndex, 1);
          return newFormData;
        } else {
          console.warn("Cannot remove the last option.");
          // Optionally, you can show a message or handle this situation accordingly.
          return prevData;
        }
      } else {
        // Handle the case where the currentQuestion index is undefined or out of range
        console.error("Invalid question index:", currentQuestion);
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

  const handleSelectCorrectAnswer = (optionIndex) => {
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

        newFormData.questions[currentQuestion].correctOption = optionIndex;
        return newFormData;
      } else {
        // Handle the case where the currentQuestion index is undefined or out of range
        console.error("Invalid question index:", currentQuestion);
        return prevData;
      }
    });
  };

  const currentQuestionIndex = formData.currentQuestion;

  return (
    <>
      <QuestionIndicatorsRow
        setFormData={setFormData}
        formData={formData}
        questions={formData.questions}
        maxQuestions={formData.maxQuestions}
        currentQuestion={formData.currentQuestion}
        handleToggleQuestion={handleToggleQuestion}
        handleRemoveQuestion={handleRemoveQuestion}
        handleAddQuestion={handleAddQuestion}
      />
      <QuestionInput setFormData={setFormData} formData={formData} />
      <div className={styles.ChoiceAndTimerContainer}>
        {formData.questions[formData.currentQuestion].selectedQuestionType && (
          <ChoiceInput
            currentModal={currentModal}
            options={formData.questions[currentQuestionIndex].options}
            selectedOption={
              formData.questions[currentQuestionIndex].selectedQuestionType
            }
            correctAnswerIndex={
              formData.questions[currentQuestionIndex].correctOption
            }
            handleInputChange={(optionIndex, property, value) =>
              handleInputChange(optionIndex, property, value)
            }
            handleSelectCorrectAnswer={(optionIndex) =>
              handleSelectCorrectAnswer(optionIndex)
            }
            addOption={() => addOption(currentQuestionIndex)}
            removeOption={(optionIndex) => removeOption(optionIndex)}
          />
        )}
        {currentModal === "qna" && (
          <TimerInputComponent
            formData={formData} // or whatever is the correct path to the timer value in your formData
            onTimerChange={handleTimerChange}
            setFormData={setFormData}
          />
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.cancelButton} ${styles.quizButton}`}
          type="button"
          onClick={onCloseQna}
        >
          Cancel
        </button>
        <button
          className={`${styles.continueButton} ${styles.quizButton}`}
          type="button"
          onClick={onSave}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default QnAModal;
