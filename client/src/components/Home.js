import { Route, Routes, Link, useNavigate } from "react-router";
import NearGym from "./NearGym";
import Diet from "./Diet";
import Workout from "./Workout";
import Explore from "./Explore";
export default function Home() {
  const navigate = useNavigate();
  function navi() {
    navigate('/');
  }
  return (
    <>
      <div className="bg-gray-700 flex gap-180 h-50">
        <div>
          <a>
            <img
              onClick={navi}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5BYp_KyvCbJMmMIVc5N9Ft8PoPN5Sn0TyLg&s"
              className="w-50 cursor-pointer h-50 p-10 rounded-full ml-10"
              alt="Logo"
            ></img>
          </a>
        </div>
        <div className="flex gap-20 items-center text-white text-2xl mr-15">
          <Link to='Explore'>Explore</Link>
          <Link to="NearGym">Nearest Gym</Link>
          <Link to='Workout'>Workout</Link>
          <Link to='Diet'>Diet</Link>
        </div>
      </div>
    </>
  );
}
