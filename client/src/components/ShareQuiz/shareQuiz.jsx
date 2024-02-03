import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./shareQuiz.module.css";
import { ToastContainer } from "react-toastify";

const ShareQuizModal = ({ generatedLink }) => {
  const handleCopyLink = () => {
    const cleanedURL = generatedLink.replace(/^["\\]+|["\\]+$/g, "");

    navigator.clipboard
      .writeText(cleanedURL)
      .then(() => {
        toast.success("Link copied to clipboard!", { autoClose: 2000 });
      })
      .catch((error) => {
        toast.error("Failed to copy link to clipboard!");
        console.error("Copy to clipboard failed:", error);
      });
  };

  return (
    <div className={styles.shareLinkContainer}>
      <ToastContainer />

      <div className={styles.text}>Congrats your Quiz is Published!</div>

      <div className={styles.quizLinkContainer}>
        <h9>Your link is here</h9>
      </div>

      <button className={styles.button} onClick={handleCopyLink}>
        Share
      </button>
    </div>
  );
};

export default ShareQuizModal;
