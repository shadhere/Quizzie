// Card.js
import React from "react";
import styles from "../modules/Card.module.css";

const Card = ({ title, content }) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardTitle}>{title}</h4>
      <p className={styles.cardContent}>{content}</p>
    </div>
  );
};

export default Card;
