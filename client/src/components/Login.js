import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser, registerUser } from "../utils/api";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = isRegister ? await registerUser(form) : await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegister && (
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-700 text-white outline-none"
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}