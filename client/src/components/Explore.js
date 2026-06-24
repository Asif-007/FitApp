import { useState, useEffect } from "react";
import { getWorkoutStats, getDietStats } from "../utils/api";
import { useNavigate } from "react-router";

export default function Explore() {
  const [workoutStats, setWorkoutStats] = useState(null);
  const [dietStats, setDietStats]       = useState(null);
  const [loading, setLoading]           = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const [w, d] = await Promise.all([getWorkoutStats(), getDietStats()]);
      setWorkoutStats(w.data);
      setDietStats(d.data);
    } catch (err) {
      console.log("Error fetching stats");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="p-10 text-xl">Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name} 👋</h1>
      <p className="text-gray-500 mb-8">Here's your fitness summary</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Workouts"     value={workoutStats?.total}        color="blue" />
        <StatCard label="This Week"          value={workoutStats?.thisWeek}     color="purple" />
        <StatCard label="Top Muscle Group"   value={workoutStats?.topCategory}  color="green" />
        <StatCard label="Calories Today"     value={`${dietStats?.totalCalories} kcal`} color="orange" />
      </div>

      {/* Macros Today */}
      <div className="bg-gray-800 p-6 rounded-2xl max-w-lg mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Today's Macros</h2>
        <div className="grid grid-cols-3 gap-4 text-center text-white">
          <div>
            <p className="text-2xl font-bold text-blue-400">{dietStats?.totalProtein}g</p>
            <p className="text-gray-400">Protein</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-400">{dietStats?.totalCarbs}g</p>
            <p className="text-gray-400">Carbs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">{dietStats?.totalFats}g</p>
            <p className="text-gray-400">Fats</p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {workoutStats?.categoryCounts && (
        <div className="bg-gray-800 p-6 rounded-2xl max-w-lg">
          <h2 className="text-xl font-bold text-white mb-4">Workouts by Muscle Group</h2>
          {Object.entries(workoutStats.categoryCounts).map(([cat, count]) => (
            <div key={cat} className="flex justify-between items-center mb-3">
              <p className="text-white capitalize">{cat}</p>
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${count * 20}px` }}></div>
                <p className="text-gray-400">{count}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    blue:   "bg-blue-900 border-blue-500",
    purple: "bg-purple-900 border-purple-500",
    green:  "bg-green-900 border-green-500",
    orange: "bg-orange-900 border-orange-500",
  };
  return (
    <div className={`${colors[color]} border p-4 rounded-2xl text-white text-center`}>
      <p className="text-3xl font-bold">{value ?? "—"}</p>
      <p className="text-gray-300 text-sm mt-1">{label}</p>
    </div>
  );
}