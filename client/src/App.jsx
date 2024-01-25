import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import styles from "./app.module.css";
import Dashboard from "./components/Dashboard";
import QuizTable from "./components/QuizTable";

function App() {
  // const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("/")
      .then((response) => {
        console.log("fuck yeah");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //   return (
  //     <>
  //       <div className={styles.app}>
  //         {" "}
  //         <RegistrationForm />{" "}
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      {" "}
      <div className={styles.app}>
        <Router>
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<QuizTable />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
