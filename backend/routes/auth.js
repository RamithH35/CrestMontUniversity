const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ClubHead = require("../models/ClubHead");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const clubHead = await ClubHead.findOne({ username });
    if (!clubHead) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, clubHead.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const secret = process.env.JWT_SECRET || "default_jwt_secret";
    const token = jwt.sign(
      {
        id: clubHead._id,
        username: clubHead.username,
        isDemo: clubHead.isDemo || false,
      },
      secret,
      { expiresIn: "1d" }
    );

    return res.json({ token, clubHead: { username: clubHead.username, isDemo: clubHead.isDemo || false } });
  } catch (error) {
    return res.status(500).json({ message: "Login failed." });
  }
});

module.exports = router;
