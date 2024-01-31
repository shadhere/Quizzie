import React from "react";
import styles from "./QuestionTitleAndType.module.css";

const QuestionInput = ({ setFormData, formData }) => {
  const currentQuestion = formData.qna.questions[formData.qna.currentQuestion];

  const handleQuestionTextChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      qna: {
        ...prevData.qna,
        questions: prevData.qna.questions.map((q, index) =>
          index === prevData.qna.currentQuestion
            ? { ...q, text: e.target.value }
            : q
        ),
      },
    }));
  };

  const handleQuestionType = (option) => {
    setFormData((prevData) => {
      const newSelectedQuestionType =
        option === prevData.qna.selectedQuestionType ? null : option;
      console.log("newSelectedQuestionType:", newSelectedQuestionType); // Add this line

      const updatedQuestions = prevData.qna.questions.map((q, index) => {
        if (index === prevData.qna.currentQuestion) {
          return {
            ...q,
            selectedQuestionType: newSelectedQuestionType,
          };
        }
        return q;
      });

      return {
        ...prevData,
        qna: {
          ...prevData.qna,
          questions: updatedQuestions,
        },
      };
    });
  };

  return (
    <div key={currentQuestion.index} className={styles.inputQuestionContainer}>
      <input
        className={styles.inputQuestionTitle}
        type="text"
        placeholder={`Poll Question ${formData.qna.currentQuestion + 1}`}
        value={currentQuestion.text || ""}
        onChange={handleQuestionTextChange}
      />
      <div className={styles.CheckboxContainer}>
        <label className={styles.checkboxLabel}>
          <span className={styles.inputQuestionType}>Option Type</span>
          <div
            className={`${styles.radioCheckbox} ${
              currentQuestion.selectedQuestionType === "text" && styles.checked
            }`}
            onClick={() => handleQuestionType("text")}
          >
            <div className={`${styles.innerCheckbox}`} />
          </div>
          <span className={styles.inputQuestionTypeLabel}>Text</span>
        </label>
        <label className={styles.checkboxLabel}>
          <div
            className={`${styles.radioCheckbox} ${
              currentQuestion.selectedQuestionType === "image" && styles.checked
            }`}
            onClick={() => handleQuestionType("image")}
          >
            <div className={`${styles.innerCheckbox}`} />
          </div>
          <span className={styles.inputQuestionTypeLabel}>Image URL</span>
        </label>
        <label className={styles.checkboxLabel}>
          <div
            className={`${styles.radioCheckbox} ${
              currentQuestion.selectedQuestionType === "textAndImage" &&
              styles.checked
            }`}
            onClick={() => handleQuestionType("textAndImage")}
          >
            <div className={`${styles.innerCheckbox}`} />
          </div>
          <span className={styles.inputQuestionTypeLabel}>
            Text and Image URL
          </span>
        </label>
      </div>
    </div>
  );
};

export default QuestionInput;
