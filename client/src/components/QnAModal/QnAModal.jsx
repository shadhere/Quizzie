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
    submitQuiz();
  };

  const handleToggleQuestion = (index) => {
    setFormData((prevData) => {
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
        console.error("Invalid question index:", index);
        return prevData;
      }
    });
  };

  const handleAddQuestion = () => {
    if (formData.questions.length < formData.maxQuestions) {
      const newQuestion = {
        text: "",
        correctOption: null,
        options: [],
        selectedQuestionType: null,
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

    if (selectedTimer !== "OFF") {
      const seconds = parseInt(selectedTimer, 10);
      timerValue = isNaN(seconds) ? 0 : seconds;
    }

    setFormData((prevData) => ({
      ...prevData,
      timer: timerValue,
    }));
  };

  const addOption = (questionIndex) => {
    setFormData((prevData) => {
      const { questions, currentQuestion } = prevData;

      if (questions && questionIndex >= 0 && questionIndex < questions.length) {
        const updatedQuestions = [...questions];
        const currentQuestionObj = { ...updatedQuestions[questionIndex] };

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

      if (
        typeof currentQuestion !== "undefined" &&
        questions &&
        currentQuestion >= 0 &&
        currentQuestion < questions.length
      ) {
        const options = questions[currentQuestion].options;

        if (options.length > 1) {
          const newFormData = { ...prevData };

          if (
            optionIndex === newFormData.questions[currentQuestion].correctOption
          ) {
            newFormData.questions[currentQuestion].correctOption = null;
          }

          options.splice(optionIndex, 1);
          return newFormData;
        } else {
          console.warn("Cannot remove the last option.");
          return prevData;
        }
      } else {
        console.error("Invalid question index:", currentQuestion);
        return prevData;
      }
    });
  };

  const handleInputChange = (optionIndex, property, value) => {
    setFormData((prevData) => {
      const { questions, currentQuestion } = prevData;

      if (
        typeof currentQuestion !== "undefined" &&
        questions &&
        currentQuestion >= 0 &&
        currentQuestion < questions.length
      ) {
        const newFormData = { ...prevData };

        newFormData.questions[currentQuestion].options[optionIndex][property] =
          value;

        if (
          optionIndex === newFormData.questions[currentQuestion].correctOption
        ) {
          newFormData.questions[currentQuestion].correctOption = null;
        }

        return newFormData;
      } else {
        console.error("Invalid question index:", currentQuestion);
        return prevData;
      }
    });
  };

  const handleSelectCorrectAnswer = (optionIndex) => {
    setFormData((prevData) => {
      const { questions, currentQuestion } = prevData;

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
            formData={formData}
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
