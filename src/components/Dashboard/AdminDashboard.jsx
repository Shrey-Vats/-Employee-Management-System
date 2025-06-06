// src/components/Dashboard/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import Header from "../other/Header"; // Path unchanged
import CreateTask from "../other/CreateTask"; // Path unchanged
import AllTask from "../other/AllTask"; // Path unchanged

// Corrected paths for admin-specific task views from src/components/Task/
import NewTask from "../Task/NewTask";
import AcceptTask from "../Task/AcceptTask";
import CompleteTask from "../Task/CompleteTask";
import FailedTask from "../Task/FailedTask";

// Import useAuth and useTasks hooks
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";

const AdminDashboard = () => {
  // Use Auth context for role checking and user info
  const { user, isAdmin, isAuthenticated } = useAuth();

  // Use Task context to get tasks data and functions
  const {
    tasks, // All tasks fetched by admin role
    isLoadingTasks,
    taskError,
    fetchTasks, // Function to re-fetch tasks if needed
    newTasks,
    acceptedTasks,
    completedTasks,
    failedTasks,
    addTask, // Admin-specific action: creating tasks
    updateTask, // Admin/Employee action: updating tasks
    deleteTask, // Admin-specific action: deleting tasks
  } = useTasks();

  const [activeTab, setActiveTab] = useState("allTasks");

  // Fetch tasks when the component mounts or user/auth state changes
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchTasks(); // Trigger fetching all tasks for the admin
    }
  }, [isAuthenticated, isAdmin, fetchTasks]); // fetchTasks is stable due to useCallback in TaskContext

  if (isLoadingTasks && !tasks.length) {
    // Show loading only if no tasks are present yet
    return (
      <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-white">
        Loading admin tasks...
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

  if (!isAuthenticated || !isAdmin) {
    // Handle unauthorized access: redirect to login or show an error
    return (
      <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-red-500">
        Access Denied: You must be an admin to view this page.
        {/* You might also use navigate('/login') here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-950 p-6 sm:p-10 text-white font-sans">
      <Header />
      <h1 className="text-4xl font-bold mb-10 text-center">
        Admin Task Management ({user.name})
      </h1>

      <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-4">
        {/* ... (your existing tab buttons) ... */}
        <button
          onClick={() => setActiveTab("createTask")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "createTask"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          Create Task
        </button>
        <button
          onClick={() => setActiveTab("allTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "allTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setActiveTab("newTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "newTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          New Tasks
        </button>
        <button
          onClick={() => setActiveTab("acceptedTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "acceptedTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          Accepted Tasks
        </button>
        <button
          onClick={() => setActiveTab("completedTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "completedTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          Completed Tasks
        </button>
        <button
          onClick={() => setActiveTab("failedTasks")}
          className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-lg transition-colors duration-200
            ${
              activeTab === "failedTasks"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
        >
          Failed Tasks
        </button>
      </div>

      <div className="content-area">
        {/* Pass tasks and functions as props */}
        {activeTab === "createTask" && <CreateTask addTask={addTask} />}
        {activeTab === "allTasks" && (
          <AllTask
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        )}
        {activeTab === "newTasks" && (
          <NewTask tasks={newTasks} updateTask={updateTask} />
        )}
        {activeTab === "acceptedTasks" && (
          <AcceptTask tasks={acceptedTasks} updateTask={updateTask} />
        )}
        {activeTab === "completedTasks" && (
          <CompleteTask tasks={completedTasks} updateTask={updateTask} />
        )}
        {activeTab === "failedTasks" && (
          <FailedTask tasks={failedTasks} updateTask={updateTask} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
