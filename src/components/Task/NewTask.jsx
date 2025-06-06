// src/Task/NewTask.jsx
import React from "react";

const NewTask = ({ task, onAcceptTask }) => {
  // Determine color based on priority for visual cue, similar to your TaskCard
  const getPriorityClasses = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-500 text-black"; // Text black for better contrast on yellow
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className="flex-shrink-0 w-[320px] p-6 rounded-2xl shadow-xl hover:shadow-2xl
                 transform hover:scale-[1.02] transition-all duration-300 ease-in-out
                 bg-gradient-to-br from-blue-700 to-blue-800 text-white border border-blue-700"
    >
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-xs font-semibold py-1 px-3 rounded-full ${getPriorityClasses(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <span className="text-xs font-semibold py-1 px-3 rounded-full bg-blue-500">
          New
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-3 leading-tight">{task.title}</h2>
      <p className="text-sm text-blue-100 mb-4 line-clamp-3">
        {task.description}
      </p>

      <div className="flex justify-between items-center text-sm text-blue-200 mb-6">
        <span>Due: {task.dueDate}</span>
        {task.assignedBy && ( // Assuming tasks now have an 'assignedBy' field
          <span className="bg-blue-600 px-3 py-1 rounded-full text-xs">
            Assigned by: {task.assignedBy}
          </span>
        )}
      </div>

      <button
        onClick={() => onAcceptTask(task.id)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-base
                   shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Accept Task
      </button>
    </div>
  );
};

export default NewTask;
