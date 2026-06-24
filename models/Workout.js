const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name:     { type: String, required: true },
  category: { type: String, required: true }, // chest, legs, etc.
  sets:     { type: Number, required: true },
  reps:     { type: Number, required: true },
  weight:   { type: Number, default: 0 },     // in kg
  date:     { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Workout", workoutSchema);