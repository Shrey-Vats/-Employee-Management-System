// src/components/Dashboard/AdminDashboard.jsx
import React, { useState } from "react";
// Corrected paths for common components from src/components/other/
import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";

// Corrected paths for admin-specific task views from src/components/Task/
// Note: These files (AcceptTask, CompleteTask, FailedTask, NewTask) should exist directly in Task/
import NewTask from "../Task/NewTask";
import AcceptTask from "../Task/AcceptTask";
import CompleteTask from "../Task/CompleteTask";
import FailedTask from "../Task/FailedTask";

const AdminDashboard = () => {
  // State to manage which tab/view is currently active for the admin
  const [activeTab, setActiveTab] = useState("allTasks"); // Default view

  return (
    <div className="min-h-screen w-full bg-gray-950 p-6 sm:p-10 text-white font-sans">
      {/* Header component */}
      <Header />

      <h1 className="text-4xl font-bold mb-10 text-center">
        Admin Task Management
      </h1>

      {/* Navigation/Tab Buttons for Admin Views */}
      <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-4">
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

      {/* Conditionally Rendered Admin Content Area */}
      <div className="content-area">
        {activeTab === "createTask" && <CreateTask />}
        {activeTab === "allTasks" && <AllTask />}
        {activeTab === "newTasks" && <NewTask />}
        {activeTab === "acceptedTasks" && <AcceptTask />}
        {activeTab === "completedTasks" && <CompleteTask />}
        {activeTab === "failedTasks" && <FailedTask />}
      </div>
    </div>
  );
};

export default AdminDashboard;
