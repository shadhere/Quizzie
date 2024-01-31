import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./shareQuiz.module.css";
import { ToastContainer } from "react-toastify";

const ShareQuizModal = ({ generatedLink }) => {
  const handleCopyLink = () => {
    const cleanedURL = generatedLink.replace(/^["\\]+|["\\]+$/g, "");

    // Copy to clipboard
    navigator.clipboard
      .writeText(cleanedURL)
      .then(() => {
        // Show toast notification on successful copy
        toast.success("Link copied to clipboard!", { autoClose: 2000 });
      })
      .catch((error) => {
        // Handle the error if copying fails
        toast.error("Failed to copy link to clipboard!");
        console.error("Copy to clipboard failed:", error);
      });
  };

  return (
    <div>
      {/* Text with specified style */}
      <ToastContainer />

      <div className={styles.text}>Congrats your Quiz is Published!</div>

      {/* Modal content with specified style */}
      <div className={styles.quizLinkContainer}>
        {generatedLink.generatedLink}
      </div>

      {/* Button to copy link to clipboard */}
      <button className={styles.button} onClick={handleCopyLink}>
        Copy Link
      </button>
    </div>
  );
};

export default ShareQuizModal;
