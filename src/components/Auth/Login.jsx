import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for displaying login errors

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // In a real app, you'd send this data to your backend
    console.log(
      `Attempting login with: Email - ${email}, Password - ${password}`
    );

    // Simulate an API call
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        console.log("Login successful!");
        // Redirect or set user session here
        setEmail("");
        setPassword("");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    }, 1000); // Simulate network delay
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 sm:p-14 rounded-3xl shadow-2xl border border-gray-700 w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Sign in to access your employee dashboard.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 py-3 px-5 rounded-lg outline-none text-base transition duration-200"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 py-3 px-5 rounded-lg outline-none text-base transition duration-200"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center -mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg text-lg mt-3
                       shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75"
          >
            Log In
          </button>

          {/* Optional: Add links for forgot password or sign up */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Forgot your password?{" "}
            <a
              href="#"
              className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors duration-200"
            >
              Reset here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
