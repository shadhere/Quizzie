import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./QuizTable.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DeleteQuiz from "../DeleteQuiz/deleteQuiz";
import EditQuiz from "../EditQuiz/editQuiz";

const QuizTable = () => {
  // State variables
  const [quizzes, setQuizzes] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [quizToEdit, setQuizToEdit] = useState(null);

  // Fetch quiz data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Fetched data:", response.data);
        setQuizzes(response.data.quizzes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  // Handle Edit action
  // Handle Edit action
  const handleEdit = (quizId) => {
    console.log(`Edit quiz with ID: ${quizId}`);

    // Fetch additional details or log the server response when editing
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:4000/quizzes/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Fetched additional details:", response.data);

        // Set the response.data as the initial data for EditQuiz
        setQuizToEdit(response.data);

        // Show the EditQuiz modal
        setShowEditModal(true);
      })
      .catch((error) => {
        console.error("Error fetching additional details:", error.message);
      });
  };

  // Handle Delete action
  const handleDelete = (quizId) => {
    console.log("Clicked Delete for quiz ID:", quizId);
    setQuizToDelete(quizId);
    setShowDeletePopup(true);
  };

  // Handle Cancel Delete action
  const handleCancelDelete = () => {
    setQuizToDelete(null);
    setShowDeletePopup(false);
  };

  // Handle Update Quiz action
  const handleUpdateQuiz = async (updatedFormData) => {
    console.log("handleUpdateQuiz function called");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:4000/quizzes/${updatedFormData.quizId}`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log the server response data
      console.log("Server Response:", response.data);

      // Log the updated quiz data
      console.log("Updated Quiz Data:", updatedFormData);

      // Update the quizzes state with the updated data
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.quizId === updatedFormData.quizId ? updatedFormData : quiz
        )
      );

      console.log("Quiz updated successfully.");
    } catch (error) {
      console.error("Error updating quiz:", error.message);
    }
  };

  // Render the component
  return (
    <>
      <div>
        <Sidebar />
        <div className={styles.tableContainer}>
          <table className={styles.quizTable}>
            {/* Table header */}
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impression</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Share</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={quiz.quizId}>
                  <td>{index + 1}</td>
                  <td>{quiz.title}</td>
                  <td>{quiz.createdOn}</td>
                  <td>{quiz.impressions}</td>
                  {/* Edit button */}
                  <td>
                    <span
                      className={styles.iconButton}
                      onClick={() => handleEdit(quiz.quizId)}
                    >
                      Edit
                    </span>
                  </td>
                  {/* Delete button */}
                  <td>
                    <span
                      className={styles.iconButton}
                      onClick={() => handleDelete(quiz.quizId)}
                    >
                      Delete
                    </span>
                  </td>
                  {/* Share button */}
                  <td>
                    <span
                      className={styles.iconButton}
                      onClick={() => handleShare(quiz.quizId)}
                    >
                      Share
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* DeleteQuiz component */}
      {showDeletePopup && (
        <DeleteQuiz
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      {/* EditQuiz component */}
      {showEditModal && (
        <EditQuiz
          initialFormData={quizToEdit}
          onCloseEdit={() => setShowEditModal(false)}
          onUpdateQuiz={handleUpdateQuiz}
        />
      )}
    </>
  );
};

export default QuizTable;
