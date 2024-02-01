import React, { useState } from "react";
import styles from "./Modal.module.css";
import CreateQuizModal from "../CreateQuizModal/CreateQuizModal";
import QnAModal from "../QnAModal/QnAModal";
import PollTypeModal from "../PollTypeModal/PollTypeModal";
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
        text: "", // The text of the question
        selectedQuestionType: null, // The selected question type (e.g., multiple-choice, true/false)
        options: [
          {
            text: "", // Text for the option
            image: "", // Image URL for the option
          },
        ], // An array to store possible answer options
        correctOption: null, // The correct answer option for the question
      },
    ],
    currentQuestion: 0,
    maxQuestions: 5,
    timer: 0,
  });

  const submitQuiz = async () => {
    console.log("before submit", formData);
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Check if the token exists
      if (!token) {
        console.error("User not authenticated");
        // Handle the case where the user is not authenticated
        return;
      }

      const formDataJSON = JSON.stringify(formData);
      console.log(formDataJSON);

      const response = await axios.post(
        "http://localhost:4000/quizzes",
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
      // Optionally, you can reset the form data or close the modal here

      // Pass the link as a prop to the child component
      setGeneratedLink(generatedQuizLink);
      console.log(generatedQuizLink);

      console.log("Quiz submitted successfully!", response.data);
      // Optionally, you can reset the form data or close the modal here
    } catch (error) {
      console.error("Error submitting quiz:", error.message);
      // Handle the error as needed
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
        // Assuming name is the index of the question in the array
        const updatedQuestions = [...prevData.questions];
        updatedQuestions[name] = value;

        return {
          ...prevData,
          questions: updatedQuestions,
        };
      }

      // Handle other sections if needed
      return prevData;
    });
  };

  const handleQuizInputChange = (name, value) => {
    handleInputChange("quiz", name, value);
  };

  // const handleFormChange = (section, newFormData) => {
  //   console.log(`Updating ${section} with data:`, newFormData);

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [section]: newFormData,
  //   }));
  // };

  const handleQnaChange = (newQnaData) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: newQnaData.questions, // Update questions array
      currentQuestion: newQnaData.currentQuestion,
      maxQuestions: newQnaData.maxQuestions,
      timer: newQnaData.timer,
    }));
  };

  const handlePollChange = (newPollData) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: newPollData.questions, // Update questions array
      currentQuestion: newPollData.currentQuestion,
      maxQuestions: newPollData.maxQuestions,
      timer: newPollData.timer,
    }));
  };

  const handleTimerChange = (newTimerValue) => {
    setFormData((prevData) => ({
      ...prevData,
      qna: {
        ...prevData.qna,
        timer: newTimerValue,
      },
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
            <span className={styles.closebutton} /*onClick={onClose}*/>
              &times;
            </span>

            {currentModal === "createQuiz" && (
              <CreateQuizModal
                setFormData={setFormData}
                formData={formData}
                handleInputChange={handleQuizInputChange}
                // title={formData.quiz.title}
                // selectedQuizType={formData.quiz.selectedQuizType}
                // onChange={(newData) => handleFormChange("quiz", newData)}
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

            {currentModal === "polkl" && (
              <PollTypeModal>
                setFormData={setFormData}
                formData={formData}
                onChange={handlePollChange}
                onTimerChange={handleTimerChange}
                submitQuiz={submitQuiz}
                onCloseQna={onTheModalClose}
              </PollTypeModal>
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
