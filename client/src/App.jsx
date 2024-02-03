import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./pages/Auth/RegistrationForm";
import styles from "./App.module.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import QuizPage from "./pages/quizPage/quizPage";
import QuizTable from "./components/QuizTable/QuizTable";
import QuestionWiseAnalysis from "./components/QuestionWiseAnalysis/QuestionWiseAnalysis";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  console.log("Is Logged In:", isLoggedIn);
  return (
    <>
      <div className={styles.app}>
        <Router>
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<QuizTable />} />
            <Route
              path="/questionwiseanalysis/:quizId"
              element={<QuestionWiseAnalysis />}
            />
            <Route path="/quiz/:id" element={<QuizPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
