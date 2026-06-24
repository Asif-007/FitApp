import { Link, useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="bg-gray-700 flex justify-between items-center h-20 px-10">
      <img
        onClick={() => navigate("/")}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5BYp_KyvCbJMmMIVc5N9Ft8PoPN5Sn0TyLg&s"
        className="w-16 h-16 cursor-pointer rounded-full"
        alt="Logo"
      />
      <div className="flex gap-10 items-center text-white text-xl">
        <Link to="Explore">Explore</Link>
        <Link to="NearGym">Nearest Gym</Link>
        <Link to="Workout">Workout</Link>
        <Link to="Diet">Diet</Link>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-green-400">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="login" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}