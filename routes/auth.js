const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//SignUp
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    //check if the username already exits
    const existingUsername = User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ code: 400, message: "Username already exists" });
    }
    const data = await user.save();
    res
      .status(201)
      .json({ data: data, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credential" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "youre-secret-key", {
      expiresIn: "1h",
    });
    res.json({ token, message: "Login Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
