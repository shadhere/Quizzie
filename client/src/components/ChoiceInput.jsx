// ChoiceInput.js
import React, { useState } from "react";
import styles from "../modules/Modal.module.css";
import { FaTrash } from "react-icons/fa";
// import styles from "../modules/ChoiceInput.module.css";

const ChoiceInput = ({ options, addOption, removeOption }) => {
  const [inputFields, setInputFields] = useState([""]);

  const handleAddOption = () => {
    if (inputFields.length < 4) {
      setInputFields([...inputFields, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    const newFields = [...inputFields];
    newFields.splice(index, 1);
    setInputFields(newFields);
    removeOption(index);
  };

  const handleInputChange = (index, value) => {
    const newFields = [...inputFields];
    newFields[index] = value;
    setInputFields(newFields);
  };

  return (
    <div className={styles.columnContainer}>
      {inputFields.map((field, index) => (
        <div key={index} className={styles.choiceItem}>
          <div
            className={`${styles.checkbox} ${
              options.includes(field) && styles.selectedCheckbox
            }`}
            onClick={() => handleRemoveOption(index)}
          >
            {options.includes(field) && (
              <div className={styles.selectedIcon}>&#10003;</div>
            )}
          </div>
          <div className={styles.PollOptionContainer}>
            <span>
              <input
                className={styles.PollcheckboxOption}
                type="text"
                placeholder="Text"
                value={field}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </span>
            <button
              className={styles.removeChoiceBtn}
              onClick={() => handleRemoveOption(index)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      <button className={styles.checkboxOption} onClick={handleAddOption}>
        Add Option
      </button>
    </div>
  );
};

export default ChoiceInput;
