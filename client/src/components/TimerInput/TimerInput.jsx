import React from "react";
import styles from "./TimerInput.module.css";

const TimerInputComponent = ({ formData, onTimerChange }) => {
  const timerOptions = [
    { value: "0", label: "OFF" },
    { value: "5", label: "5 sec" },
    { value: "10", label: "10 sec" },
  ];

  return (
    <div className={styles.timerSelectionContainer}>
      <div className={styles.headingTimer}>Timer</div>
      {timerOptions.map((option) => (
        <button
          key={option.value}
          className={`${styles.timerButton} ${
            formData.timer == option.value && styles.selected
          }`}
          onClick={() => {
            console.log("Clicked Timer Option: optionvalue", option.value);

            onTimerChange(option.value);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimerInputComponent;
