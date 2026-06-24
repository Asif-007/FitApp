import { useState, useEffect } from "react";
import { logWorkout, getWorkouts } from "../utils/api";
import chestDay from "../utils/Chest";
import Display from "./Display";

export default function Workout() {
  const [form, setForm] = useState({ name: "", category: "chest", sets: "", reps: "", weight: "" });
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function fetchWorkouts() {
    try {
      const res = await getWorkouts();
      setLogs(res.data);
    } catch (err) {
      console.log("Not logged in or error fetching");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await logWorkout(form);
      setMessage("Workout logged successfully!");
      setForm({ name: "", category: "chest", sets: "", reps: "", weight: "" });
      fetchWorkouts();
    } catch (err) {
      setMessage("Please login to log workouts");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold bg-gray-200 p-2 mt-4 mb-6">Workouts</h1>

      {/* Exercise Library */}
      <div className="mb-10">
        <h2 className="text-3xl p-2 font-bold mb-4">Chest Workouts</h2>
        <div className="flex flex-row flex-wrap">
          {chestDay.map((values) => (
            <Display key={values.id} value={values} />
          ))}
        </div>
      </div>

      {/* Log Workout Form */}
      <div className="bg-gray-800 p-8 rounded-2xl max-w-lg mb-10">
        <h2 className="text-2xl font-bold text-white mb-6">Log a Workout</h2>
        {message && <p className="text-green-400 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={form.name}
            placeholder="Exercise name (e.g. Bench Press)"
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
          >
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="arms">Arms</option>
            <option value="core">Core</option>
          </select>
          <div className="flex gap-4">
            <input
              name="sets"
              value={form.sets}
              type="number"
              placeholder="Sets"
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white outline-none w-full"
              required
            />
            <input
              name="reps"
              value={form.reps}
              type="number"
              placeholder="Reps"
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white outline-none w-full"
              required
            />
            <input
              name="weight"
              value={form.weight}
              type="number"
              placeholder="Weight (kg)"
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white outline-none w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            Log Workout
          </button>
        </form>
      </div>

      {/* Workout History */}
      {logs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Workout History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {logs.map((log) => (
              <div key={log._id} className="bg-gray-800 p-4 rounded-xl text-white">
                <h3 className="text-xl font-bold text-blue-400">{log.name}</h3>
                <p className="text-gray-300 capitalize">Category: {log.category}</p>
                <p>Sets: {log.sets} | Reps: {log.reps} | Weight: {log.weight}kg</p>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(log.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}