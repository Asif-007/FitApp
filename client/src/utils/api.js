import axios from "axios";
export const getWorkoutStats = () => API.get("/workout/stats");
export const getDietStats    = () => API.get("/diet/stats");
const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser    = (data) => API.post("/auth/login", data);
export const logWorkout   = (data) => API.post("/workout", data);
export const getWorkouts  = ()     => API.get("/workout");
export const logDiet      = (data) => API.post("/diet", data);
export const getDiet      = ()     => API.get("/diet");