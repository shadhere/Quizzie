import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [view, setView] = useState("register");
  const [errors, setErrors] = useState({});

  const showForm = (view) => {
    setView(view);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const vaildationErrors = {};

    if (view === "register") {
      if (!formData.name.trim()) {
        vaildationErrors.name = "Name is required";
      } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
        vaildationErrors.name = "Invalid characters in the name";
      }
    }

    if (!formData.email.trim()) {
      vaildationErrors.email = "  Email is required";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    ) {
      vaildationErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      vaildationErrors.password = "Password is required";
    } else if (view === "register" && !isStrongPassword(formData.password)) {
      vaildationErrors.password = "Weak password";
    }

    if (view === "register" && formData.password !== formData.confirmPassword) {
      vaildationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(vaildationErrors);

    return Object.keys(vaildationErrors).length === 0;
  };
  const isStrongPassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*()_+]/.test(password)
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://quizzie-ten.vercel.app/register",
        formData
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://quizzie-ten.vercel.app/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const accessToken = response.data.accessToken;

      if (response.status === 200) {
        localStorage.setItem("token", accessToken);
        navigate("/dashboard");
        console.log("Login successful");
        console.log("Access Token:", accessToken);
      } else {
        console.error("Login failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <h2 className={styles.formHeading}>QUIZZIE</h2>
      <div className={styles.toggleButtons}>
        <button
          className={`${styles.toggleButton} ${
            view === "register" ? styles.active : ""
          }`}
          onClick={() => showForm("register")}
        >
          Sign Up
        </button>
        <button
          className={`${styles.toggleButton} ${
            view === "login" ? styles.active : ""
          }`}
          onClick={() => showForm("login")}
        >
          Log In
        </button>
      </div>

      <form className={styles.form}>
        {view === "login" && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.formInput}
                placeholder={errors.email}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.formInput}
                placeholder={errors.password}
              />
            </div>
          </>
        )}

        {view === "register" && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Name</label>
              <input
                type="text"
                name="name"
                value={errors.name ? "" : formData.name}
                onChange={handleChange}
                className={`${styles.formInput} ${
                  errors.name ? styles.formInputError : ""
                }`}
                placeholder={errors.name}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                type="email"
                name="email"
                value={errors.email ? "" : formData.email}
                onChange={handleChange}
                className={`${styles.formInput} ${
                  errors.email ? styles.formInputError : ""
                }`}
                placeholder={errors.email}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                type="password"
                name="password"
                value={errors.password ? "" : formData.password}
                onChange={handleChange}
                className={`${styles.formInput} ${
                  errors.password ? styles.formInputError : ""
                }`}
                placeholder={errors.password}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={errors.confirmPassword ? "" : formData.confirmPassword}
                onChange={handleChange}
                className={`${styles.formInput} ${
                  errors.confirmPassword ? styles.formInputError : ""
                }`}
                placeholder={errors.confirmPassword}
              />
            </div>
          </>
        )}

        <button
          type="button"
          onClick={view === "register" ? handleSubmit : handleLogin}
          className={styles.formButton}
        >
          {view === "register" ? "Sign-Up" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
