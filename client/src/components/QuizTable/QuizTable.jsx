import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./QuizTable.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DeleteQuiz from "../DeleteQuiz/deleteQuiz";
import EditQuiz from "../EditQuiz/editQuiz";
import editIcon from "../../assets/editIcon.svg";
import shareIcon from "../../assets/shareIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const QuizTable = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [quizToEdit, setQuizToEdit] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://quizzie-ten.vercel.app/analytics", {
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

  const handleEdit = (quizId) => {
    console.log(`Edit quiz with ID: ${quizId}`);

    const token = localStorage.getItem("token");

    axios
      .get(`https://quizzie-ten.vercel.app/quizzes/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Fetched additional details:", response.data);

        setQuizToEdit(response.data.quiz);

        setShowEditModal(true);
      })
      .catch((error) => {
        console.error("Error fetching additional details:", error.message);
      });
  };

  const handleDelete = (quizId) => {
    console.log("Clicked Delete for quiz ID:", quizId);
    setQuizToDelete(quizId);
    setShowDeletePopup(true);
  };

  const handleCancelDelete = () => {
    setQuizToDelete(null);
    setShowDeletePopup(false);
  };

  const handleUpdateQuiz = async (updatedFormData) => {
    console.log("handleUpdateQuiz function called");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://quizzie-ten.vercel.app/quizzes/${updatedFormData.quizId}`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server Response:", response.data);

      console.log("Updated Quiz Data:", updatedFormData);

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

  const handleShare = (quizId) => {
    console.log(`Share quiz with ID: ${quizId}`);
    const generatedQuizLink = `http://localhost:5173/quiz/${quizId}`;
    console.log(generatedQuizLink);

    navigator.clipboard
      .writeText(generatedQuizLink)
      .then(() => {
        toast.success("Link copied to clipboard!", { autoClose: 2000 });
      })
      .catch((error) => {
        toast.error("Failed to copy link to clipboard!");
        console.error("Copy to clipboard failed:", error);
      });
  };
  const handleConfirmDelete = async () => {
    console.log("Confirmed delete for quiz ID:", quizToDelete);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://quizzie-ten.vercel.app/quizzes/${quizToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server Response:", response.data);

      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.quizId !== quizToDelete)
      );

      console.log("Quiz deleted successfully.");
    } catch (error) {
      console.error("Error deleting quiz:", error.message);
    }

    setQuizToDelete(null);
    setShowDeletePopup(false);
  };

  return (
    <>
      <ToastContainer />

      <div>
        <Sidebar />

        <div className={styles.tableContainer}>
          <h1>Quiz Analysis</h1>
          <table className={styles.quizTable}>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impression</th>
                <th></th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {quizzes.slice(0, 10).map((quiz, index) => (
                <tr key={quiz.quizId}>
                  <td>{index + 1}</td>
                  <td>{quiz.title}</td>
                  <td>
                    {new Date(quiz.createdAt).toLocaleDateString("en-UK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{quiz.impressions}</td>
                  <td>
                    <span
                      className={styles.iconButton}
                      onClick={() => handleEdit(quiz.quizId)}
                    >
                      <img src={editIcon} alt="Edit" />
                    </span>

                    <span
                      className={styles.iconButton}
                      onClick={() => handleDelete(quiz.quizId)}
                    >
                      <img src={deleteIcon} alt="Delete" />
                    </span>

                    <span
                      className={styles.iconButton}
                      onClick={() => handleShare(quiz.quizId)}
                    >
                      <img src={shareIcon} alt="Share" />
                    </span>
                  </td>

                  <td>
                    <Link to={`/questionwiseanalysis/${quiz.quizId}`}>
                      Question Wise Analysis
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDeletePopup && (
        <DeleteQuiz
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
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
