import React from "react";
import styles from "./QuestionTitleAndType.module.css";

const QuestionInput = ({ setFormData, formData }) => {
  const currentQuestion = formData.questions[formData.currentQuestion];

  const handleQuestionTextChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,

      questions: prevData.questions.map((q, index) =>
        index === prevData.currentQuestion ? { ...q, text: e.target.value } : q
      ),
    }));
  };

  const handleQuestionType = (option) => {
    setFormData((prevData) => {
      const newSelectedQuestionType =
        option === prevData.selectedQuestionType ? null : option;
      console.log("newSelectedQuestionType:", newSelectedQuestionType);
      const updatedQuestions = prevData.questions.map((q, index) => {
        if (index === prevData.currentQuestion) {
          return {
            ...q,
            selectedQuestionType: newSelectedQuestionType,
          };
        }
        return q;
      });

      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  return (
    <div key={currentQuestion.index} className={styles.inputQuestionContainer}>
      <input
        className={styles.inputQuestionTitle}
        type="text"
        placeholder={`Poll Question ${formData.currentQuestion + 1}`}
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
