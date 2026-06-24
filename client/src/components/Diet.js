import { useState, useEffect } from "react";
import { logDiet, getDiet } from "../utils/api";

export default function Diet() {
  const [form, setForm] = useState({ meal: "", calories: "", protein: "", carbs: "", fats: "" });
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDiet();
  }, []);

  async function fetchDiet() {
    try {
      const res = await getDiet();
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
      await logDiet(form);
      setMessage("Meal logged successfully!");
      setForm({ meal: "", calories: "", protein: "", carbs: "", fats: "" });
      fetchDiet();
    } catch (err) {
      setMessage("Please login to log meals");
    }
  }

  const totalCalories = logs.reduce((sum, log) => sum + log.calories, 0);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold bg-gray-200 p-2 mt-4 mb-6">Diet Tracker</h1>

      {/* Log Meal Form */}
      <div className="bg-gray-800 p-8 rounded-2xl max-w-lg mb-10">
        <h2 className="text-2xl font-bold text-white mb-6">Log a Meal</h2>
        {message && <p className="text-green-400 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="meal"
            value={form.meal}
            placeholder="Meal name (e.g. Chicken Rice)"
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
            required
          />
          <input
            name="calories"
            value={form.calories}
            type="number"
            placeholder="Calories"
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
            required
          />
          <div className="flex gap-4">
            <input
              name="protein"
              value={form.protein}
              type="number"
              placeholder="Protein (g)"
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white outline-none w-full"
            />
            <input
              name="carbs"
              value={form.carbs}
              type="number"
              placeholder="Carbs (g)"
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white outline-none w-full"
            />
            <input
              name="fats"
              value={form.fats}
              type="number"
              placeholder="Fats (g)"
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white outline-none w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
          >
            Log Meal
          </button>
        </form>
      </div>

      {/* Diet History */}
      {logs.length > 0 && (
        <div>
          <div className="bg-blue-900 p-4 rounded-xl inline-block mb-6">
            <p className="text-white text-xl font-bold">
              Total Calories Today: <span className="text-yellow-400">{totalCalories} kcal</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {logs.map((log) => (
              <div key={log._id} className="bg-gray-800 p-4 rounded-xl text-white">
                <h3 className="text-xl font-bold text-green-400">{log.meal}</h3>
                <p className="text-yellow-400 font-bold">{log.calories} kcal</p>
                <p>Protein: {log.protein}g | Carbs: {log.carbs}g | Fats: {log.fats}g</p>
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