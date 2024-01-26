// Import necessary dependencies and styles
import React, { useState } from "react";
import styles from "../modules/AnswerChoiceEditor.module.css";
import { FaTrash } from "react-icons/fa";

const ChoiceInput = ({ options, addOption, removeOption, selectedOption }) => {
  const [inputFields, setInputFields] = useState([""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  const handleAddOption = () => {
    if (inputFields.length < 4) {
      setInputFields([...inputFields, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    const newFields = [...inputFields];
    newFields.splice(index, 1);
    setInputFields(newFields);

    // If the removed option was the correct answer, reset the correct answer index
    if (index === correctAnswerIndex) {
      setCorrectAnswerIndex(null);
    }
    removeOption(index);
  };

  const handleInputChange = (index, value) => {
    const newFields = [...inputFields];
    newFields[index] = value;
    setInputFields(newFields);

    // If the input field corresponds to the correct answer, reset the correct answer index
    if (index === correctAnswerIndex) {
      setCorrectAnswerIndex(null);
    }
  };

  const handleSelectCorrectAnswer = (index) => {
    setCorrectAnswerIndex(index);
  };

  const getPlaceholder = () => {
    switch (selectedOption) {
      case "text":
        return "Text";
      case "image":
        return "Image URL";
      case "textAndImage":
        return "Text";
      default:
        return "";
    }
  };

  return (
    <div className={styles.answerColumnContainer}>
      {inputFields.map((field, index) => (
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
            <span>
              <input
                className={`${styles.answerInputEditor} ${
                  selectedOption == "textAndImage"
                    ? styles.answerInputEditorShort
                    : ""
                }`}
                type="text"
                placeholder={getPlaceholder()}
                value={field}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </span>

            {selectedOption === "textAndImage" && (
              <span>
                <input
                  className={styles.answerInputEditor}
                  type="text"
                  placeholder="Image URL"
                  value={field}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </span>
            )}

            <button
              className={styles.removeChoiceBtn}
              onClick={() => handleRemoveOption(index)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      <button className={styles.addOptionBtn} onClick={handleAddOption}>
        Add Option
      </button>
    </div>
  );
};

export default ChoiceInput;
