// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
// Assuming api.js will be created in src/utils/
import api from "../utils/api";

// Create the Auth Context
export const AuthContext = createContext();

// Create the Auth Provider Component
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores authenticated user data (e.g., id, name, role, token)
  const [isLoading, setIsLoading] = useState(true); // Tracks if authentication is in progress (e.g., during initial load)
  const [error, setError] = useState(null); // Stores authentication-related errors

  // Effect to check for stored token/user data on initial load
  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      const token = localStorage.getItem("authToken");
      const storedUserData = localStorage.getItem("userData");

      if (token && storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          // In a real app, you might want to call a backend endpoint to verify the token's validity
          // and get the latest user data to prevent stale information.
          // For now, we'll assume the stored data is valid.
          setUser({ ...parsedUserData, token });
        } catch (err) {
          console.error("Failed to parse user data from localStorage:", err);
          // Clear invalid data if parsing fails
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          setUser(null);
          setError("Failed to restore session. Please log in again.");
        }
      }
      setIsLoading(false); // Authentication check is complete
    };

    loadUserFromLocalStorage();
  }, []); // Empty dependency array means this runs only once on mount

  // Login function
  const login = async (credentials) => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      // Replace with your actual login API call
      // Example: Your backend might be at http://localhost:5000/api/auth/login
      const response = await api.post("/auth/login", credentials);
      const { token, user: userData } = response.data; // Assuming your API returns { token, user: {id, name, role} }

      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userData)); // Store user data for persistence
      setUser({ ...userData, token }); // Update context state
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      setUser(null); // Clear user on failure
      localStorage.removeItem("authToken"); // Ensure no stale token remains
      localStorage.removeItem("userData");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null); // Clear user state
    setError(null); // Clear any existing errors
    // Optional: Call backend logout API to invalidate token on server-side if applicable
    // api.post('/auth/logout');
  };

  // The value that will be provided to consumers of this context
  const authContextValue = {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user, // Convenience flag: true if user object exists
    // Determine user role (e.g., 'admin', 'employee') for conditional rendering
    isAdmin: user && user.role === "admin",
    isEmployee: user && user.role === "employee",
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext easily
export const useAuth = () => {
  return useContext(AuthContext);
};
