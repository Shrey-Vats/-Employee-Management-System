// src/components/Auth/Login.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Corrected path to AuthContext
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, user } = useAuth(); // Destructure login function and state
  const navigate = useNavigate();

  // Redirect after successful login based on user role
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard"); // Your admin dashboard route
      } else if (user.role === "employee") {
        navigate("/employee-dashboard"); // Your employee dashboard route
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password }); // Call the login function from context
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-400">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="bg-red-800 text-red-100 p-3 rounded mb-4 text-sm text-center">
              {error}
            </p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
