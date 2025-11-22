const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middlwares/Auth");
const jwt = require("jsonwebtoken");

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.generateAuthToken();
    user.lastLoginAt = new Date();
    await user.save();
    // return token along with basic user info (no password)
    const userSafe = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      company: user.company,
    };
    res.json({ token, user: userSafe });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/signup", async (req, res) => {
  const { username, email, password, fullName } = req.body;
  try {
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    user = new User({ username, email, fullName });
    await user.setPassword(password);
    await user.save();
    const token = user.generateAuthToken();
    const userSafe = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      company: user.company,
    };
    res.status(201).json({ token, user: userSafe });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
