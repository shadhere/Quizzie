// QuizTable.js
import React from "react";
import styles from "../modules/QuizTable.module.css";
import Sidebar from "./Sidebar";

const QuizTable = ({ quizzes }) => {
  // Hardcoded functions for handling actions (edit, delete, share, analysis)
  const handleEdit = (quizId) => {
    console.log(`Edit quiz with ID: ${quizId}`);
    // Add your edit logic here
  };

  const handleDelete = (quizId) => {
    console.log(`Delete quiz with ID: ${quizId}`);
    // Add your delete logic here
  };

  const handleShare = (quizId) => {
    console.log(`Share quiz with ID: ${quizId}`);
    // Add your share logic here
  };

  const handleAnalysis = (quizId) => {
    console.log(`View analysis for quiz with ID: ${quizId}`);
    // Add your analysis logic here
  };

  return (
    <>
      <div>
        <Sidebar />
        <div className={styles.tableContainer}>
          <table className={styles.quizTable}>
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impression</th>
                <th>Actions</th>
                <th>Analysis</th>
              </tr>
            </thead>
            <tbody>
              {quizzes?.map((quiz) => (
                <tr key={quiz.id}>
                  <td>{quiz.title}</td>{" "}
                  {/* Update to use 'title' instead of 'name' */}
                  <td>{quiz.createdOn}</td>
                  <td>{quiz.views}</td>{" "}
                  {/* Update to use 'views' instead of 'impression' */}
                  <td>
                    <span
                      className={styles.iconButton}
                      onClick={() => handleEdit(quiz.id)}
                    >
                      Edit
                    </span>
                    <span
                      className={styles.iconButton}
                      onClick={() => handleDelete(quiz.id)}
                    >
                      Delete
                    </span>
                    <span
                      className={styles.iconButton}
                      onClick={() => handleShare(quiz.id)}
                    >
                      Share
                    </span>
                  </td>
                  <td>
                    <span
                      className={styles.linkButton}
                      onClick={() => handleAnalysis(quiz.id)}
                    >
                      Question Wise Analysis
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default QuizTable;
