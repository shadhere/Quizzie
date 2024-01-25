import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../modules/RegistrationForm.module.css";

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
    // Clear the validation error when the user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const vaildationErrors = {};

    // Check for name
    if (view === "register") {
      if (!formData.name.trim()) {
        vaildationErrors.name = "Name is required";
      } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
        vaildationErrors.name = "Invalid characters in the name";
      }
    }

    // Check for email
    if (!formData.email.trim()) {
      vaildationErrors.email = "  Email is required";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    ) {
      vaildationErrors.email = "Invalid email format";
    }

    // Check for password
    if (!formData.password.trim()) {
      vaildationErrors.password = "Password is required";
    } else if (view === "register" && !isStrongPassword(formData.password)) {
      vaildationErrors.password = "Weak password";
    }

    // Check for confirmPassword
    if (view === "register" && formData.password !== formData.confirmPassword) {
      vaildationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(vaildationErrors);

    // Return true if there are no validation errors
    return Object.keys(vaildationErrors).length === 0;
  };

  // Function to check if the password is strong
  const isStrongPassword = (password) => {
    // Implement your password strength criteria here
    // For example, check for minimum length, presence of uppercase, lowercase, and special characters
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
      // Validation failed
      return;
    }

    try {
      // Send registration details to the server
      const response = await axios.post(
        "http://localhost:4000/register",
        formData
      );
      console.log("Registration successful:", response.data);
      // You may want to redirect the user to a login page or display a success message
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      // You may want to display an error message to the user
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: formData.email,
        password: formData.password,
      });

      // Assuming your server returns the token in the 'accessToken' property
      const accessToken = response.data.accessToken;

      // Check the response status
      if (response.status === 200) {
        // Successful login
        navigate("/dashboard");
        console.log("Login successful");
        console.log("Access Token:", accessToken);
        // You may want to save the token in a secure way (e.g., localStorage) for future requests.
      } else {
        // Failed login
        console.error("Login failed:", response.data.error);
        // You can display an error message to the user.
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
                placeholder={errors.email || "Email"}
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
                placeholder={errors.password || "Password"}
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
