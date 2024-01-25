// Modal.js
import React from "react";
import styles from "../modules/Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <span className={styles.closebutton} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
