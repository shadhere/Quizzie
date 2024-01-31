// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ onNavLinkClick }) => {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarHeader}>QUIZZIE</div>

      <div className={styles.sidebarLinks}>
        <NavLink to="/dashboard" className={styles.sidebarLink}>
          Dashboard
        </NavLink>

        <NavLink to="/analytics" className={styles.sidebarLink}>
          Analytics
        </NavLink>

        <NavLink
          // to="/create-quiz"
          onClick={onNavLinkClick}
          className={styles.sidebarLink}
        >
          Create Quiz
        </NavLink>
      </div>

      <div className={styles.sidebarDivider}></div>

      <NavLink to="/logout" className={styles.sidebarLink}>
        Logout
      </NavLink>
    </div>
  );
};

export default Sidebar;
