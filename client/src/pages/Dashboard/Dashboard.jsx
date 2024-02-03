import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card";
import styles from "./Dashboard.module.css";
import QuizCard from "../../components/QuizCard/QuizCard";
import axios from "axios";

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    quizCount: 0,
    totalQuestions: 0,
    totalImpressions: 0,
    quizzes: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://quizzie-ten.vercel.app/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
      <div className={styles.layout}>
        <Sidebar />

        <div className={styles.cardContainer}>
          <Card
            title={`${dashboardStats.quizCount} `}
            heading="Quiz"
            content="Created"
          />
          <Card
            title={`${dashboardStats.totalQuestions}`}
            heading="Questions"
            content="Created"
          />
          <Card
            title={`${dashboardStats.totalImpressions}`}
            heading="Total"
            content="Impressions"
          />
        </div>

        <div className={styles.heading}>Trending Quizs</div>
        <div className={styles.quizsContainer}>
          <div className={styles.quizcardContainer}>
            {dashboardStats.quizzes.slice(0, 4).map((quiz) => (
              <QuizCard
                key={quiz._id}
                title={quiz.title}
                views={quiz.impressions}
                createdAt={new Date(quiz.createdAt).toLocaleDateString(
                  "en-UK",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              />
            ))}
          </div>

          <div className={styles.quizcardContainer}>
            {dashboardStats.quizzes.slice(4, 8).map((quiz) => (
              <QuizCard
                key={quiz._id}
                title={quiz.title}
                views={quiz.impressions}
                createdAt={new Date(quiz.createdAt).toLocaleDateString(
                  "en-UK",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              />
            ))}
          </div>

          <div className={styles.quizcardContainer}>
            {dashboardStats.quizzes.slice(8, 12).map((quiz) => (
              <QuizCard
                key={quiz._id}
                title={quiz.title}
                views={quiz.impressions}
                createdAt={new Date(quiz.createdAt).toLocaleDateString(
                  "en-UK",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
