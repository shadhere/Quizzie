import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./QuestionWiseAnalysis.module.css";

const QuestionWiseAnalysis = () => {
  const { quizId } = useParams();

  const [questionWiseAnalysis, setQuestionWiseAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionWiseAnalysis = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/questionwiseanalysis/${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched question-wise analysis data:", response.data);
        setQuestionWiseAnalysis(response.data);
      } catch (error) {
        console.error(
          "Error fetching question-wise analysis data:",
          error.message
        );
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionWiseAnalysis();
  }, [quizId]);

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <h1 className={styles.title}>Question Wise Analysis</h1>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {questionWiseAnalysis && (
          <div>
            {questionWiseAnalysis.questions.map((question, index) => (
              <div key={index} className={styles.questionContainer}>
                <h2 className={styles.question}>{`Q.${index + 1}: ${
                  question.text
                }`}</h2>
                <div className={styles.totalContainer}>
                  <div className={styles.totalCard}>
                    <h3 className={styles.totalCountValue}>
                      {question.totalAttempts}
                    </h3>
                    <h3 className={styles.totalCountTitle}>
                      people Attempted the question
                    </h3>
                  </div>
                  <div className={styles.totalCard}>
                    <h3 className={styles.totalCountValue}>
                      {question.totalCorrectQuestions}
                    </h3>
                    <h3 className={styles.totalCountTitle}>
                      people Answered Correctly
                    </h3>
                  </div>
                  <div className={styles.totalCard}>
                    <h3 className={styles.totalCountValue}>
                      {question.totalIncorrectQuestions}
                    </h3>
                    <h3 className={styles.totalCountTitle}>
                      people Answered Incorrectly
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionWiseAnalysis;
