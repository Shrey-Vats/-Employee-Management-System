// src/components/Dashboard/EmployeeDashboard.jsx
import React, { useState, useEffect } from "react";
// Corrected path to Header from src/components/other/
import Header from "../other/Header";

// Corrected paths to employee-specific task components from src/components/TaskUser/
import MyTasks from "../TaskUser/MyTasks";
import MyPendingTasks from "../TaskUser/MyPendingTasks";
import MyInProgressTasks from "../TaskUser/MyInProgressTasks";
import MyCompletedTasks from "../TaskUser/MyCompletedTasks";
import MyRejectedTasks from "../TaskUser/MyFailedTasks"; // Or MyFailedTasks, as per your preference

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("myTasks"); // Default to 'My All Tasks' view
  const [loggedInUser, setLoggedInUser] = useState(null); // State to hold logged-in user info

  // Simulate fetching logged-in user data
  // In a real application, you'd fetch this from an authentication context, API, or global state
  useEffect(() => {
    // This `id` must match the `assignedToId` in your task data for filtering to work.
    const user = {
      id: "employee123",
      name: "Alice Smith",
      email: "alice@example.com",
    };
    setLoggedInUser(user);
  }, []);

  if (!loggedInUser) {
    // Show a loading state or redirect if user is not logged in yet
    return (
      <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-white">
        Loading employee data...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-950 p-6 sm:p-10 text-white font-sans">
      {/* Your common header component */}
      <Header />

      <h1 className="text-4xl font-bold mb-10 text-center">
        Hello, {loggedInUser.name}! Welcome to Your Tasks
      </h1>

      {/* Employee-specific Navigation Tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-4">
        <button
          onClick={() => setActiveTab("myTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "myTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          My All Tasks
        </button>
        <button
          onClick={() => setActiveTab("myPendingTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "myPendingTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("myInProgressTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "myInProgressTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTab("myCompletedTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "myCompletedTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab("myRejectedTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "myRejectedTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          Rejected/Failed
        </button>
      </div>

      {/* Conditionally Rendered Employee Task Views */}
      <div className="content-area">
        {/* Pass the loggedInUser object to each task component for filtering */}
        {activeTab === "myTasks" && <MyTasks loggedInUser={loggedInUser} />}
        {activeTab === "myPendingTasks" && (
          <MyPendingTasks loggedInUser={loggedInUser} />
        )}
        {activeTab === "myInProgressTasks" && (
          <MyInProgressTasks loggedInUser={loggedInUser} />
        )}
        {activeTab === "myCompletedTasks" && (
          <MyCompletedTasks loggedInUser={loggedInUser} />
        )}
        {activeTab === "myRejectedTasks" && (
          <MyRejectedTasks loggedInUser={loggedInUser} />
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
