// ChoiceInput.jsx
import React from "react";
import styles from "./AnswerChoiceEditor.module.css";
import { FaTrash } from "react-icons/fa";

const ChoiceInput = ({
  options,
  selectedOption,
  correctAnswerIndex,
  handleInputChange,
  handleSelectCorrectAnswer,
  addOption,
  removeOption,
}) => {
  const getPlaceholder = () => {
    switch (selectedOption) {
      case "text":
        return "Text";
      case "image":
        return "Image URL";
      default:
        return "text";
    }
  };

  return (
    <div className={styles.answerColumnContainer}>
      {options.map((option, index) => (
        <div key={index} className={styles.choiceItem}>
          <div
            className={`${styles.answerEditor} ${
              correctAnswerIndex === index ? styles.correctAnswer : ""
            }`}
          >
            <div
              className={styles.correctAnswerRadio}
              onClick={() => handleSelectCorrectAnswer(index)}
            >
              {correctAnswerIndex === index && (
                <div className={styles.radioDot}>&#x2022;</div>
              )}
            </div>
            {(selectedOption === "text" ||
              selectedOption === "textAndImage") && (
              <span>
                <input
                  className={`${styles.answerInputEditor} ${
                    selectedOption === "textAndImage"
                      ? styles.answerInputEditorShort
                      : ""
                  }`}
                  placeholder={getPlaceholder()}
                  value={option.text || option.image || ""}
                  onChange={(e) =>
                    handleInputChange(index, "text", e.target.value)
                  }
                />
              </span>
            )}
            {(selectedOption === "image" ||
              selectedOption === "textAndImage") && (
              <span>
                <input
                  className={styles.answerInputEditor}
                  placeholder="Image URL"
                  value={option.image}
                  onChange={(e) =>
                    handleInputChange(index, "image", e.target.value)
                  }
                />
              </span>
            )}

            <button
              className={styles.removeChoiceBtn}
              onClick={() => removeOption(index)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      <button className={styles.addOptionBtn} onClick={addOption}>
        Add Option
      </button>
    </div>
  );
};

export default ChoiceInput;
