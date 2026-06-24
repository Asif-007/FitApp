const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const authMiddleware = require("../middleware/auth");

// Log a workout
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, category, sets, reps, weight } = req.body;
    const workout = new Workout({ user: req.user, name, category, sets, reps, weight });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all workouts for logged in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a workout
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    if (workout.user.toString() !== req.user)
      return res.status(401).json({ message: "Not authorized" });

    await workout.deleteOne();
    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// Get workout stats
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user });
    
    const total = workouts.length;
    
    // Most trained category
    const categoryCounts = {};
    workouts.forEach((w) => {
      categoryCounts[w.category] = (categoryCounts[w.category] || 0) + 1;
    });
    const topCategory = Object.keys(categoryCounts).sort(
      (a, b) => categoryCounts[b] - categoryCounts[a]
    )[0] || "N/A";

    // This week's workouts
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeek = workouts.filter((w) => new Date(w.date) > oneWeekAgo).length;

    res.json({ total, topCategory, thisWeek, categoryCounts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;