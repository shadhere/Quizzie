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
}) => {
  const onSave = () => {
    // Additional logic if needed

    // Call submitQuiz to submit the quiz data
    submitQuiz();
  };

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

  const handleAddQuestion = () => {
    if (formData.qna.questions.length < formData.qna.maxQuestions) {
      const newQuestion = {
        text: "", // or provide some default text
        correctOption: null,
        options: [],
        selectedQuestionType: null,
        // other properties...
      };

      setFormData((prevData) => ({
        ...prevData,
        qna: {
          ...prevData.qna,
          questions: [...prevData.qna.questions, newQuestion],
          currentQuestion: prevData.qna.questions.length,
          selectedQuestionType: null,
          options: [],
        },
      }));
    }
  };

  const handleRemoveQuestion = () => {
    if (formData.qna.questions.length > 1) {
      // Ensure there is more than one question
      const updatedQuestions = formData.qna.questions.filter(
        (_, index) => index !== formData.qna.currentQuestion
      );

      const updatedCurrentQuestion =
        formData.qna.currentQuestion >= updatedQuestions.length
          ? updatedQuestions.length - 1
          : formData.qna.currentQuestion;

      setFormData((prevData) => ({
        ...prevData,
        qna: {
          ...prevData.qna,
          questions: updatedQuestions,
          currentQuestion: updatedCurrentQuestion,
          options: [],
          timer: prevData.qna.timer,
          selectedQuestionType:
            updatedQuestions.length > 0
              ? updatedQuestions[updatedQuestions.length - 1].correctOption ||
                null
              : null,
        },
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
      qna: {
        ...prevData.qna,
        timer: timerValue,
      },
    }));
  };
  const addOption = (questionIndex) => {
    setFormData((prevData) => {
      const { questions, currentQuestion } = prevData.qna;

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
              ...prevData.qna,
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
      const { questions, currentQuestion } = prevData.qna;

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
            optionIndex ===
            newFormData.qna.questions[currentQuestion].correctOption
          ) {
            newFormData.qna.questions[currentQuestion].correctOption = null;
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

  const handleSelectCorrectAnswer = (optionIndex) => {
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

        newFormData.qna.questions[currentQuestion].correctOption = optionIndex;
        return newFormData;
      } else {
        // Handle the case where the currentQuestion index is undefined or out of range
        console.error("Invalid question index:", currentQuestion);
        return prevData;
      }
    });
  };

  const currentQuestionIndex = formData.qna.currentQuestion;

  return (
    <>
      <QuestionIndicatorsRow
        setFormData={setFormData}
        formData={formData}
        questions={formData.qna.questions}
        maxQuestions={formData.qna.maxQuestions}
        currentQuestion={formData.qna.currentQuestion}
        // questions={formData.qna.questions}
        // currentQuestion={formData.qna.currentQuestion}
        handleToggleQuestion={handleToggleQuestion}
        handleRemoveQuestion={handleRemoveQuestion}
        handleAddQuestion={handleAddQuestion}
        // maxQuestions={formData.qna.maxQuestions}
      />
      <QuestionInput setFormData={setFormData} formData={formData} />
      <div className={styles.ChoiceAndTimerContainer}>
        {formData.qna.questions[formData.qna.currentQuestion]
          .selectedQuestionType && (
          <ChoiceInput
            options={formData.qna.questions[currentQuestionIndex].options}
            selectedOption={
              formData.qna.questions[currentQuestionIndex].selectedQuestionType
            }
            correctAnswerIndex={
              formData.qna.questions[currentQuestionIndex].correctOption
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
        <TimerInputComponent
          formData={formData} // or whatever is the correct path to the timer value in your formData
          onTimerChange={handleTimerChange}
          setFormData={setFormData}
        />
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
    </>
  );
};

export default QnAModal;
