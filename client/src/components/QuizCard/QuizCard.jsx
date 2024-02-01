import React from "react";
import styles from "./QuizCard.module.css";

const QuizCard = ({ title, views, createdAt }) => {
  return (
    <div className={styles.quizCard}>
      <div className={styles.rowContainer}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.rowContainer}>
          <p className={styles.views}>{`${views}`}</p>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 15.375C12.7279 15.375 15.75 12.2542 15.75 10.125C15.75 7.99575 12.7279 4.875 9 4.875C5.27213 4.875 2.25 7.998 2.25 10.125C2.25 12.252 5.27213 15.375 9 15.375Z"
              stroke="#FF5D01"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M9 12.375C9.59674 12.375 10.169 12.1379 10.591 11.716C11.0129 11.294 11.25 10.7217 11.25 10.125C11.25 9.52826 11.0129 8.95597 10.591 8.53401C10.169 8.11205 9.59674 7.875 9 7.875C8.40326 7.875 7.83097 8.11205 7.40901 8.53401C6.98705 8.95597 6.75 9.52826 6.75 10.125C6.75 10.7217 6.98705 11.294 7.40901 11.716C7.83097 12.1379 8.40326 12.375 9 12.375Z"
              stroke="#FF5D01"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M4.974 4.22475L5.94675 5.58225M13.3594 4.39125L12.3862 5.74875M9.00337 2.625V4.875"
              stroke="#FF5D01"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <h3 className={styles.createdAt}>Created on :{createdAt}</h3>
    </div>
  );
};

export default QuizCard;
