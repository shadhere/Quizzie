// TimerInputComponent.js

import React from "react";
import styles from "../modules/TimerInput.module.css"; // Adjust the path based on your file structure

const TimerInputComponent = ({ onTimerChange }) => {
  const timerOptions = [
    { value: "OFF", label: "Off" },
    { value: "5 sec", label: "5 sec" },
    { value: "10 sec", label: "10 sec" },
  ];

  return (
    <div className={styles.timerSelectionContainer}>
      {timerOptions.map((option) => (
        <button
          key={option.value}
          className={`${styles.timerButton} ${
            onTimerChange() === option.value ? styles.selected : ""
          }`}
          onClick={() => onTimerChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimerInputComponent;
