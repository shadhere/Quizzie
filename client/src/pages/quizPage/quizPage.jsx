import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./quizPage.module.css";
import Congrats from "../../assets/Congrats.png";
import Countdown from "react-countdown";

const QuizPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [countdownKey, setCountdownKey] = useState(Date.now());

  useEffect(() => {
    let interval;
    const fetchQuizAndStartTimer = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/quizzes/${id}`);
        setQuizData(data);
        console.log("Timer from DB:", data.quiz.timer);
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
      .padStart(2, "0")}/${quizData.quiz.questions.length
      .toString()
      .padStart(2, "0")}`;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Automatically move to the next question when the timer runs out
      handleNextQuestion();
      return null;
    } else {
      // Display the countdown timer
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const handleAnswerSelection = (selectedOption) => {
    setQuizData((prevData) => {
      const updatedData = { ...prevData };
      const currentQuestionData = updatedData.quiz.questions[currentQuestion];

      setTotalAnswers((prevTotalAnswers) => prevTotalAnswers + 1);

      // Find the index of the selected option
      const selectedIndex = currentQuestionData.options.findIndex(
        (option) => option.text.trim() === selectedOption.trim()
      );

      // Update isSelected for each option
      const updatedOptions = currentQuestionData.options.map(
        (option, index) => ({
          ...option,
          isSelected: index === selectedIndex,
        })
      );
      currentQuestionData.options = updatedOptions;

      // Determine the correct option index dynamically
      const correctOptionIndex = currentQuestionData.correctOption;

      console.log("Selected Option (Text):", selectedOption);
      console.log("Selected Index:", selectedIndex);
      console.log("Correct Option Index:", correctOptionIndex);

      // Check if the selected option is correct
      if (selectedIndex == correctOptionIndex) {
        setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      }

      // Set both selected option text and index in the state
      currentQuestionData.selectedOptionText = selectedOption; // Ensure selected option text is set
      currentQuestionData.selectedOptionIndex = selectedIndex; // Ensure selected option index is set

      return updatedData;
    });
  };

  const submitQuizAttempt = async () => {
    const quizAttemptData = {
      quizId: id,
      answers: quizData.quiz.questions.map((question) => {
        const selectedOptionText = question.selectedOptionText || null;
        const selectedOptionIndex =
          question.selectedOptionIndex !== undefined
            ? question.selectedOptionIndex
            : -1;

        return {
          questionId: question._id,
          selectedOption: {
            text: selectedOptionText,
            index: selectedOptionIndex,
          },
        };
      }),
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

  const handleNextQuestion = () => {
    if (!quizCompleted) {
      setQuizData((prevData) => {
        const updatedData = { ...prevData };
        const currentQuestionData = updatedData.quiz.questions[currentQuestion];

        // Increment the current question index
        if (updatedData.timer > 0) {
          setTimer(updatedData.timer);
        }
        const nextQuestionIndex = currentQuestion + 1;

        setCountdownKey(Date.now());

        // Update the timer directly in the quizData
        // Check if it's the last question
        if (nextQuestionIndex === updatedData.quiz.questions.length) {
          setQuizCompleted(true);
        }

        // Return the updated data
        return updatedData;
      });

      // Move to the next question using the updated state
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  if (!quizData) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.quizContainer}>
        {!quizCompleted ? (
          <>
            <div className={styles.header}>
              <div className={styles.pageIndex}>{formatPageIndex()}</div>
              <div className={styles.timer}>
                <Countdown
                  key={countdownKey} // Add key prop
                  date={Date.now() + quizData.quiz.timer * 1000}
                  renderer={renderer}
                />
              </div>
            </div>
            <h1 className={styles.questionText}>
              {quizData.quiz.questions[currentQuestion].text}
            </h1>
            <div className={styles.optionsGrid}>
              {quizData.quiz.questions[currentQuestion].options.map(
                (option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelection(option.text)}
                    className={`${styles.option} ${
                      option.isSelected ? styles.selectedOption : ""
                    }`}
                  >
                    {option.image && option.text && (
                      <div className={styles.optionContentboth}>
                        <div className={styles.optionContenddiv}>
                          <img
                            src={option.image}
                            alt={`Option ${index + 1}`}
                            className={styles.optionContentimg}
                          />
                        </div>
                        <div className={styles.optionContenddiv}>
                          {" "}
                          {option.text}
                        </div>
                      </div>
                    )}
                    {!option.image && option.text && (
                      <div className={styles.optionText}>{option.text}</div>
                    )}
                    {option.image && !option.text && (
                      <img
                        src={option.image}
                        alt={`Option ${index + 1}`}
                        className={styles.optionimg}
                      />
                    )}
                  </div>
                )
              )}
            </div>
            {currentQuestion < quizData.quiz.questions.length - 1 && (
              <button
                className={styles.nextButton}
                onClick={handleNextQuestion}
              >
                Next
              </button>
            )}
            {currentQuestion === quizData.quiz.questions.length - 1 && (
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
            {quizData.quiz.selectedQuizType == "poll" ? (
              <div className={styles.quizCompleted}>
                <h2>Thank you for participating in the Poll</h2>
              </div>
            ) : (
              <div>
                <h2>Congratulations! Quiz Completed</h2>
                <img src={Congrats} className={styles.quizCompletedimg} />
                <p className={styles.quizCompletedScore}>
                  Your Score is {correctAnswers} / {totalAnswers}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
