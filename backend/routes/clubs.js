const express = require("express");
const Club = require("../models/Club");

const router = express.Router();

// GET /clubs
router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find({});
    return res.json(clubs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch clubs." });
  }
});

// GET /clubs/:name
router.get("/:name", async (req, res) => {
  try {
    const club = await Club.findOne({ name: req.params.name });
    if (!club) {
      return res.status(404).json({ message: "Club not found." });
    }
    return res.json(club);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch club." });
  }
});

module.exports = router;
