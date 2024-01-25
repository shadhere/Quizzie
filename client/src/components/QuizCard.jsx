// QuizCard.js
import React from "react";
import styles from "../modules/QuizCard.module.css";

const QuizCard = ({ title, views }) => {
  return (
    <div className={styles.quizCard}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.views}>{`${views} views`}</p>
    </div>
  );
};

export default QuizCard;
