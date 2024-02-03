const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateUser = require("./middleware/authenticateUser");
const quizRoutes = require("./routes/quizRoutes"); // Import quiz routes
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const attemptRoute = require("./routes/attemptRoute");

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://quizzie-4fc5.vercel.app"); // Update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
  console.log("register");
  try {
    const { name, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("Logged in");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  console.log("all");
});

app.use(dashboardRoutes);
app.use(quizRoutes);
app.use(analyticsRoutes);
app.use(attemptRoute);
app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Server running"))
    .catch((err) => console.log("error found"));
});
