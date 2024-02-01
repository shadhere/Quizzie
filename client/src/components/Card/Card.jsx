// Card.js
import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, content, heading }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1 className={styles.cardTitle}>{title}</h1>
        <h2 className={styles.cardHeader}>{heading}</h2>
      </div>
      <h2 className={styles.cardContent}>{content}</h2>
    </div>
  );
};

export default Card;
