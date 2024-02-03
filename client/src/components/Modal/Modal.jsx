import React, { useState } from "react";
import styles from "./Modal.module.css";
import CreateQuizModal from "../CreateQuizModal/CreateQuizModal";
import QnAModal from "../QnAModal/QnAModal";
import axios from "axios";
import ShareQuizModal from "../ShareQuiz/shareQuiz";

const Modal = ({ isTheModalOpen, onTheModalClose }) => {
  const [currentModal, setCurrentModal] = useState("createQuiz");
  const [generatedLink, setGeneratedLink] = useState("");

  const [formData, setFormData] = useState({
    quiz: {
      title: "",
      selectedQuizType: null,
    },
    questions: [
      {
        text: "",
        selectedQuestionType: null,
        options: [
          {
            text: "",
            image: "",
          },
        ],
        correctOption: null,
      },
    ],
    currentQuestion: 0,
    maxQuestions: 5,
    timer: 0,
  });

  const submitQuiz = async () => {
    console.log("before submit", formData);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("User not authenticated");
        return;
      }

      const formDataJSON = JSON.stringify(formData);
      console.log(formDataJSON);

      const response = await axios.post(
        "https://quizzie-psi.vercel.app/quizzes",
        formDataJSON,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("this is", response.data.quiz._id);
      const quizId = response.data.quiz._id;
      const generatedQuizLink = `http://localhost:5173/quiz/${quizId}`;

      openShareModal();

      setGeneratedLink(generatedQuizLink);
      console.log(generatedQuizLink);

      console.log("Quiz submitted successfully!", response.data);
    } catch (error) {
      console.error("Error submitting quiz:", error.message);
    }
    console.log("kast submit", formData);
  };

  const handleInputChange = (section, name, value) => {
    setFormData((prevData) => {
      if (section === "quiz") {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [name]: value,
          },
        };
      } else if (section === "questions") {
        const updatedQuestions = [...prevData.questions];
        updatedQuestions[name] = value;

        return {
          ...prevData,
          questions: updatedQuestions,
        };
      }

      return prevData;
    });
  };

  const handleQuizInputChange = (name, value) => {
    handleInputChange("quiz", name, value);
  };

  const handleQnaChange = (newQnaData) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: newQnaData.questions,
      currentQuestion: newQnaData.currentQuestion,
      maxQuestions: newQnaData.maxQuestions,
      timer: newQnaData.timer,
    }));
  };

  const handlePollChange = (newPollData) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: newPollData.questions,
      currentQuestion: newPollData.currentQuestion,
      maxQuestions: newPollData.maxQuestions,
      timer: newPollData.timer,
    }));
  };

  const handleTimerChange = (newTimerValue) => {
    setFormData((prevData) => ({
      ...prevData,
      timer: newTimerValue,
    }));
  };

  const openQnaModal = () => {
    setCurrentModal("qna");
  };

  const openPollModal = () => {
    setCurrentModal("poll");
  };

  const closeQnaModal = () => {
    setCurrentModal("createQuiz");
  };

  const openShareModal = () => {
    setCurrentModal("shareQuiz");
  };

  return (
    <>
      {isTheModalOpen && (
        <div className={styles.modaloverlay}>
          <div className={styles.modalcontent}>
            <span className={styles.closebutton}>&times;</span>

            {currentModal === "createQuiz" && (
              <CreateQuizModal
                setFormData={setFormData}
                formData={formData}
                handleInputChange={handleQuizInputChange}
                onContinueQuizQna={openQnaModal}
                onContinuePollQna={openPollModal}
                onClose={onTheModalClose}
              >
                <h2>Create Quiz Modal</h2>
                <p>This is the content of the modal.</p>
              </CreateQuizModal>
            )}

            {currentModal === "qna" && (
              <QnAModal
                currentModal={currentModal}
                setFormData={setFormData}
                formData={formData}
                onChange={handleQnaChange}
                onTimerChange={handleTimerChange}
                submitQuiz={submitQuiz}
                onCloseQna={onTheModalClose}
              />
            )}

            {currentModal === "poll" && (
              <QnAModal
                currentModal={currentModal}
                setFormData={setFormData}
                formData={formData}
                onChange={handleQnaChange}
                submitQuiz={submitQuiz}
                onCloseQna={onTheModalClose}
              />
            )}

            {currentModal === "shareQuiz" && (
              <ShareQuizModal generatedLink={JSON.stringify(generatedLink)} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
