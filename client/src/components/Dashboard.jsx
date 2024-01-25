// Dashboard.js
import React from "react";
import Sidebar from "./Sidebar";
import Card from "./Card";
import styles from "../modules/Dashboard.module.css";
import QuizCard from "./QuizCard";
import CreateQuizModal from "./CreateQuizModal";
import { useState } from "react";
import QnAModal from "./QnAModal";
import PollTypeModal from "./PollTypeModal";

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isQnaModelOpen, setQnaModelOpen] = useState(false);
  const [isPollModelOpen, setPollModelOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openQnaModal = () => {
    setQnaModelOpen(true);
  };

  const closeQnaModal = () => {
    setQnaModelOpen(false);
  };

  const openPollModal = () => {
    setPollModelOpen(true);
  };

  const closePollModal = () => {
    setPollModelOpen(false);
  };

  const onContinueQuizQna = (title, selectedOption) => {
    console.log("Continue clicked for Q&A");
    console.log("Title:", title);
    console.log("Selected Option:", selectedOption);

    // Handle additional logic as needed

    closeModal();
    openQnaModal();
  };

  const onContinuePollType = (title, selectedOption) => {
    console.log("Continue clicked for Poll Type");
    console.log("Title:", title);
    console.log("Selected Option:", selectedOption);

    // Handle additional logic as needed

    closeModal();
    openPollModal();
  };
  // const onContinueQuizPoll = () => {
  //   closeQnaModal();
  //   openPollModal();
  // };

  const quizData = [
    { id: 1, title: "Quiz 1", views: 150 },
    { id: 2, title: "Quiz 2", views: 120 },
    { id: 3, title: "Quiz 3", views: 90 },
    { id: 4, title: "Quiz 4", views: 80 },
    { id: 5, title: "Quiz 5", views: 200 },
    { id: 6, title: "Quiz 6", views: 180 },
    { id: 7, title: "Quiz 7", views: 120 },
    { id: 8, title: "Quiz 8", views: 90 },
    { id: 5, title: "Quiz 5", views: 200 },
    { id: 6, title: "Quiz 6", views: 180 },
    { id: 7, title: "Quiz 7", views: 120 },
    { id: 8, title: "Quiz 8", views: 90 },
    { id: 9, title: "Quiz 9", views: 200 },
    { id: 10, title: "Quiz 10", views: 180 },
    { id: 11, title: "Quiz 11", views: 120 },
    { id: 12, title: "Quiz 12", views: 90 },
  ];

  return (
    <>
      <div>
        <Sidebar onNavLinkClick={openModal} />

        <CreateQuizModal
          isOpen={isModalOpen}
          onClose={closeModal}
          // onContinue={onContinueQuizQna}
          onContinueQuizQna={onContinueQuizQna}
          onContinuePollType={onContinuePollType}
        >
          {/* Your modal content goes here */}
          <h2>Create Quiz Modal</h2>
          <p>This is the content of the modal.</p>
        </CreateQuizModal>

        <QnAModal isQnaOpen={isQnaModelOpen} onCloseQna={closeQnaModal}>
          {/* Your modal content goes here */}
          <h2>Create Quiz Modal</h2>
          <p>This is the content of the modal.</p>
        </QnAModal>

        <PollTypeModal
          isPollOpen={isPollModelOpen}
          onClosePoll={closePollModal}
        >
          {/* Your modal content goes here */}
          <h2>Create Quiz Modal</h2>
          <p>This is the content of the modal.</p>
        </PollTypeModal>

        <div className={styles.cardContainer}>
          <Card title="Card 1" content="Content for Card 1" />
          <Card title="Card 2" content="Content for Card 2" />
          <Card title="Card 3" content="Content for Card 3" />
        </div>
        <div className={styles.quizcardContainer}>
          {quizData.slice(0, 4).map((quiz) => (
            <QuizCard key={quiz.id} title={quiz.title} views={quiz.views} />
          ))}
        </div>
        <div className={styles.quizcardContainer}>
          {quizData.slice(4, 8).map((quiz) => (
            <QuizCard key={quiz.id} title={quiz.title} views={quiz.views} />
          ))}
        </div>
        <div className={styles.quizcardContainer}>
          {quizData.slice(8, 12).map((quiz) => (
            <QuizCard key={quiz.id} title={quiz.title} views={quiz.views} />
          ))}
        </div>
        {/* Add more rows as needed */}
      </div>
    </>
  );
};

export default Dashboard;
