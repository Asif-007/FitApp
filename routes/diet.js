const express = require("express");
const router = express.Router();
const Diet = require("../models/Diet");
const authMiddleware = require("../middleware/auth");

// Log a meal
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { meal, calories, protein, carbs, fats } = req.body;
    const entry = new Diet({ user: req.user, meal, calories, protein, carbs, fats });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all diet entries for logged in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const entries = await Diet.find({ user: req.user }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a diet entry
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const entry = await Diet.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    if (entry.user.toString() !== req.user)
      return res.status(401).json({ message: "Not authorized" });

    await entry.deleteOne();
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;