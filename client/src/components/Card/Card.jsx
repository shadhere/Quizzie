// Card.js
import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, content }) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.cardTitle}>{title}</h1>
      <h2 className={styles.cardContent}>{content}</h2>
    </div>
  );
};

export default Card;
