const express = require("express");
const Department = require("../models/Department");

const router = express.Router();

// GET /departments
router.get("/", async (req, res) => {
  try {
    const depts = await Department.find({}).sort({ createdAt: 1 });
    return res.json(depts);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch departments." });
  }
});

// GET /departments/:id
router.get("/:id", async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);
    if (!dept) {
      return res.status(404).json({ message: "Department not found." });
    }
    return res.json(dept);
  } catch (error) {
    // If it's a cast error or other invalid id, return 400 or 404
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid department ID format." });
    }
    return res.status(500).json({ message: "Failed to fetch department." });
  }
});

module.exports = router;
