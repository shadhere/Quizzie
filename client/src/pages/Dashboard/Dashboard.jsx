import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card";
import styles from "./Dashboard.module.css";
import QuizCard from "../../components/QuizCard/QuizCard";
import Modal from "../../components/Modal/Modal";
import axios from "axios";

const Dashboard = () => {
  const [isModal, setModal] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    quizCount: 0,
    totalQuestions: 0,
    totalImpressions: 0,
    quizzes: [],
  });

  const openTheModal = () => {
    setModal(true);
    console.log("Modal opened");
  };

  const closeTheModal = () => {
    setModal(false);
    console.log("Modal closed");
  };

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setDashboardStats(data || {});
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <Sidebar onNavLinkClick={openTheModal} />

        <Modal isTheModalOpen={isModal} onTheModalClose={closeTheModal} />

        <div className={styles.cardContainer}>
          <Card
            title={`${dashboardStats.quizCount} `}
            content="Quiz Created"
            className={styles.card1}
          />
          <Card
            title={`${dashboardStats.totalQuestions}`}
            content="Questions Created"
          />
          <Card
            title={`${dashboardStats.totalImpressions}`}
            content="Total impressions"
          />
        </div>

        <div>
          <div className={styles.quizcardContainer}>
            {dashboardStats.quizzes.slice(0, 4).map((quiz) => (
              <QuizCard
                key={quiz._id}
                title={quiz.title}
                views={quiz.impressions}
              />
            ))}
          </div>
        </div>

        <div className={styles.quizcardContainer}>
          {dashboardStats.quizzes.slice(4, 8).map((quiz) => (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              views={quiz.impressions}
            />
          ))}
        </div>

        <div className={styles.quizcardContainer}>
          {dashboardStats.quizzes.slice(8, 12).map((quiz) => (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              views={quiz.impressions}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
