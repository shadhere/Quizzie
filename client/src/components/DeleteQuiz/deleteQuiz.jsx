import React from "react";
import styles from "./deleteQuiz.module.css";

const DeleteConfirmationPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <div className={styles.deleteHeading}>
          Are you sure you want to delete this quiz?
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirm Delete
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
