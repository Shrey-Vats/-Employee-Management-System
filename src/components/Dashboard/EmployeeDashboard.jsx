// src/components/Dashboard/EmployeeDashboard.jsx
import React, { useState, useEffect } from "react";
import Header from "../other/Header"; // Path unchanged

// Corrected paths to employee-specific task components from src/components/TaskUser/
import MyTasks from "../TaskUser/MyTasks";
import MyPendingTasks from "../TaskUser/MyPendingTasks";
import MyInProgressTasks from "../TaskUser/MyInProgressTasks";
import MyCompletedTasks from "../TaskUser/MyCompletedTasks";
import MyFailedTasks from "../TaskUser/MyFailedTasks"; // If you want to keep this as well

// Import useAuth and useTasks hooks
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";

const EmployeeDashboard = () => {
  // Use Auth context for user info and authentication status
  const { user, isEmployee, isAuthenticated } = useAuth();

  // Use Task context to get tasks data and functions
  // FIX: Destructuring matches the fixed TaskContext.jsx value
  const {
    tasks, // This now correctly maps to `allTasks` from TaskContext
    isLoadingTasks, // This now correctly maps to `loading` from TaskContext
    taskError, // This now correctly maps to `error` from TaskContext
    fetchTasks,
    newTasks,
    inProgressTasks,
    completedTasks,
    failedTasks,
    rejectedTasks,
    updateTask,
  } = useTasks();

  const [activeTab, setActiveTab] = useState("myTasks"); // Default to 'My All Tasks' view

  // Fetch tasks when the component mounts or user/auth state changes
  useEffect(() => {
    if (isAuthenticated && isEmployee) {
      // This is line 40 where the error was! Now `fetchTasks` is properly provided.
      fetchTasks(); // Trigger fetching tasks relevant to this employee
    }
  }, [isAuthenticated, isEmployee, fetchTasks]); // Dependencies are correct

  if (isLoadingTasks && !tasks.length) {
    return (
      <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-white">
        Loading your tasks...
      </div>
    );
  }

  if (taskError) {
    return (
      <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-red-500">
        Error loading tasks: {taskError}
      </div>
    );
  }

  if (!isAuthenticated || !isEmployee) {
    return (
      <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-red-500">
        Access Denied: You must be an employee to view this page.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-950 p-6 sm:p-10 text-white font-sans">
      <Header />
      <h1 className="text-4xl font-bold mb-10 text-center">
        Hello, {user?.name || user?.email}! Welcome to Your Tasks{" "}
        {/* user.name might be undefined, fallback to email */}
      </h1>

      <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-4">
        {/* ... (your existing tab buttons) ... */}
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
          onClick={() => setActiveTab("MyFailedTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "MyFailedTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          Rejected/Failed
        </button>
      </div>

      <div className="content-area">
        {/* Pass filtered tasks and update function to employee task components */}
        {activeTab === "myTasks" && (
          <MyTasks tasks={tasks} updateTask={updateTask} />
        )}
        {activeTab === "myPendingTasks" && (
          <MyPendingTasks tasks={newTasks} updateTask={updateTask} />
        )}
        {activeTab === "myInProgressTasks" && (
          <MyInProgressTasks tasks={inProgressTasks} updateTask={updateTask} />
        )}
        {activeTab === "myCompletedTasks" && (
          <MyCompletedTasks tasks={completedTasks} updateTask={updateTask} />
        )}
        {activeTab === "MyFailedTasks" && (
          <MyFailedTasks
            tasks={failedTasks || rejectedTasks} // Ensure both are considered if needed
            updateTask={updateTask}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
