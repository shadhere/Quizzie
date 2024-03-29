import React from "react";
import styles from "./AnswerChoiceEditor.module.css";
import deleteOption from "../../assets/deleteOption.svg";

const ChoiceInput = ({
  options,
  selectedOption,
  correctAnswerIndex,
  handleInputChange,
  handleSelectCorrectAnswer,
  addOption,
  removeOption,
  currentModal,
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

  if (selectedOption) {
    if (options.length === 0) {
      addOption();
    }
  }

  const isAddOptionButtonVisible = options.length < 4;

  return (
    <div className={styles.answerColumnContainer}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`${styles.choiceItem} ${
            currentModal === "poll" ? styles.choiceItemPoll : ""
          }`}
        >
          <div
            className={`${styles.answerEditor} ${
              correctAnswerIndex === index ? styles : ""
            }`}
          >
            {currentModal === "qna" && (
              <div
                className={styles.correctAnswerRadio}
                onClick={() => handleSelectCorrectAnswer(index)}
              >
                {correctAnswerIndex === index && (
                  <div className={styles.radioDot}>&#x2022;</div>
                )}
              </div>
            )}
            {(selectedOption === "text" ||
              selectedOption === "textAndImage") && (
              <span>
                <input
                  className={`${styles.answerInputEditor} ${
                    selectedOption === "textAndImage"
                      ? styles.answerInputEditorShort
                      : ""
                  }  ${
                    correctAnswerIndex === index ? styles.correctAnswer : ""
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
                  className={`${styles.answerInputEditor} ${
                    selectedOption === "textAndImage"
                      ? styles.answerInputEditorShortImage
                      : ""
                  }   ${
                    correctAnswerIndex === index ? styles.correctAnswer : ""
                  }`}
                  placeholder="Image URL"
                  value={option.image}
                  onChange={(e) =>
                    handleInputChange(index, "image", e.target.value)
                  }
                />
              </span>
            )}
            {index >= 2 && (
              <button
                className={styles.removeChoiceBtn}
                onClick={() => removeOption(index)}
              >
                <img src={deleteOption} alt="" />
              </button>
            )}
          </div>
        </div>
      ))}
      {isAddOptionButtonVisible && (
        <button className={styles.addOptionBtn} onClick={addOption}>
          Add Option
        </button>
      )}
    </div>
  );
};

export default ChoiceInput;
