import React from "react";
import styles from "./deleteQuiz.module.css";

const DeleteConfirmationPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <p>Are you sure you want to delete this quiz?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
