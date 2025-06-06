// src/utils/api.js
import axios from "axios"; // First, install axios: npm install axios

const api = axios.create({
  // IMPORTANT: Set your backend API base URL here.
  // You can use environment variables for this (e.g., in a .env file: VITE_API_BASE_URL=http://localhost:5000/api)
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api", // Default to localhost if env var not set
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Add the JWT token to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle common API errors like 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the response is 401 Unauthorized (e.g., token expired or invalid)
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized: Token expired or invalid. Logging out...");
      // Clear local storage and potentially redirect to login
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      // Using window.location.href to force a full page reload for complete state reset
      // In a more complex app, you might use a React Router history push and a context action.
      window.location.href = "/login"; // Or your specific login route
    }
    return Promise.reject(error);
  }
);

export default api;
