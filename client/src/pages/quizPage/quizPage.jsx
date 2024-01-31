import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./quizPage.module.css";

const QuizPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);

  useEffect(() => {
    let interval;

    const fetchQuizAndStartTimer = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/quizzes/${id}`);
        setQuizData(data);
        setTimer(data.timer || 0);

        interval = setInterval(
          () => setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 0.1 : 0)),
          100
        );
      } catch (error) {
        console.error("Error fetching quiz:", error.message);
      }
    };

    if (id) fetchQuizAndStartTimer();

    return () => clearInterval(interval);
  }, [id, currentQuestion]);

  const formatPageIndex = () =>
    `${(currentQuestion + 1)
      .toString()
      .padStart(2, "0")}/${quizData.qna.questions.length
      .toString()
      .padStart(2, "0")}`;
  const formatTimer = () =>
    `${Math.floor(timer).toString().padStart(2, "0")}.${Math.floor(
      (timer - Math.floor(timer)) * 10
    )}`;
  const handleAnswerSelection = (selectedOption) => {
    setQuizData((prevData) => {
      const updatedData = { ...prevData };
      const currentQuestionData = updatedData.qna.questions[currentQuestion];
      const selectedIndex = currentQuestionData.options.findIndex(
        (option) => option.text.trim() === selectedOption.trim()
      );

      setTotalAnswers((prevTotalAnswers) => prevTotalAnswers + 1);

      const correctOptionIndex = currentQuestionData.correctOption;

      console.log("selectedIndex:", selectedIndex);
      console.log("correctOptionIndex:", correctOptionIndex);

      if (selectedIndex == correctOptionIndex) {
        setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
        console.log(`Your Answer: ${selectedOption.trim()} is Correct!`);
      } else {
        console.log(
          `Your Answer: ${selectedOption.trim()} is Incorrect. The correct answer is: ${currentQuestionData.options[
            correctOptionIndex
          ].text.trim()}`
        );
        console.log(
          `Explanation: https://example.com/explanation?question=${currentQuestionData._id}&answer=${correctOptionIndex}`
        );
      }

      return updatedData;
    });
  };

  const handleNextQuestion = () =>
    setCurrentQuestion((prevQuestion) =>
      prevQuestion === quizData.qna.questions.length - 1
        ? setQuizCompleted(true)
        : prevQuestion + 1
    );

  const submitQuizAttempt = async () => {
    const quizAttemptData = {
      quizId: id,
      answers: quizData.qna.questions.map((question) => ({
        questionId: question._id,
        selectedOption:
          question.options.find((option) => option.isSelected)?.text || null,
      })),
    };

    try {
      await axios.post("http://localhost:4000/attempts", quizAttemptData);
      setQuizCompleted(true);
    } catch (error) {
      console.error("Error submitting quiz attempt:", error);
    }
  };

  const handleSubmitQuiz = () => {
    console.log(`Score: ${correctAnswers} / ${totalAnswers}`);
    submitQuizAttempt();
  };

  if (!quizData) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.quizContainer}>
        {!quizCompleted ? (
          <>
            <div className={styles.header}>
              <div className={styles.pageIndex}>{formatPageIndex()}</div>
              <div className={styles.timer}>{formatTimer()}</div>
            </div>
            <h1 className={styles.questionText}>
              {quizData.qna.questions[currentQuestion].text}
            </h1>
            <div className={styles.optionsGrid}>
              {quizData.qna.questions[currentQuestion].options.map(
                (option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelection(option.text)}
                    className={`${styles.option} ${
                      option.isSelected ? styles.selectedOption : ""
                    }`}
                  >
                    {option.image && (
                      <img src={option.image} alt={`Option ${index + 1}`} />
                    )}
                    {option.text && (
                      <div className={styles.optionText}>{option.text}</div>
                    )}
                  </div>
                )
              )}
            </div>
            {currentQuestion < quizData.qna.questions.length - 1 && (
              <button
                className={styles.nextButton}
                onClick={handleNextQuestion}
              >
                Next
              </button>
            )}
            {currentQuestion === quizData.qna.questions.length - 1 && (
              <button
                className={styles.submitButton}
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            )}
          </>
        ) : (
          <div className={styles.quizCompleted}>
            <h2>Congratulations! Quiz Completed</h2>
            <img src="../assets/new.png" />
            <p>
              Your Score is {correctAnswers} / {totalAnswers}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
