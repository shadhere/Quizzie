import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Modal from "../Modal/Modal";

const Sidebar = () => {
  const navigate = useNavigate(); // Move useNavigate to the component level
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/");
      }, 0);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [isModal, setModal] = useState(false);

  const openTheModal = () => {
    setModal(true);
    console.log("Modal opened");
  };

  const closeTheModal = () => {
    setModal(false);
    console.log("Modal closed");
  };

  return (
    <>
      {isModal && (
        <Modal isTheModalOpen={isModal} onTheModalClose={closeTheModal} />
      )}
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
            onClick={openTheModal}
            className={styles.sidebarLink}
          >
            Create Quiz
          </NavLink>
        </div>

        <div className={styles.sidebarDivider}></div>

        <NavLink onClick={handleLogout} className={styles.sidebarLink}>
          Logout
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
