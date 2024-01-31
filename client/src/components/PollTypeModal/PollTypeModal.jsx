// PollTypeModal.js
import React from "react";
// import Modal from "./Modal";
// import styles from "../modules/Modal.module.css";

const PollTypeModal = ({ isPollOpen, onClosePoll }) => {
  const onSave = () => {
    // Handle any logic needed to save additional info
    // For now, just close the modal
  };

  return (
    <div></div>
    // <Modal isOpen={isPollOpen} onClose={onClosePoll}>
    //   <h2>Poll Type</h2>
    //   {/* Add content for the Q&A modal here */}
    //   <button
    //     className={styles.cancelButton}
    //     type="button"
    //     onClick={onClosePoll}
    //   >
    //     Cancel
    //   </button>
    //   <button className={styles.continueButton} type="button" onClick={onSave}>
    //     Continue
    //   </button>
    // </Modal>
  );
};

export default PollTypeModal;
