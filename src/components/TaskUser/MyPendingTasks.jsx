// src/components/TaskUser/MyPendingTasks.jsx
import React from "react";

// This component now accepts 'tasks' and 'updateTask' as props
const MyPendingTasks = ({ tasks, updateTask }) => {
  // --- IMPORTANT: REMOVE ALL MOCK DATA FROM HERE ---
  // The 'tasks' prop already contains the filtered data.
  // --- END REMOVAL ---

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-blue-600";
      case "new":
        return "bg-blue-600";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityClasses = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-700";
      case "medium":
        return "bg-yellow-500 text-black";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const handleAction = async (action, taskId) => {
    try {
      if (action === "Start Task") {
        await updateTask(taskId, { status: "in progress" });
        alert("Task started!");
      } else if (action === "View") {
        alert(`Viewing details for pending task: ${taskId}`);
      }
    } catch (error) {
      alert(`Action failed: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 text-white h-[500px] flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        My Pending Tasks
      </h2>

      <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1.5fr] gap-4 py-3 px-4 mb-2 bg-gray-700 rounded-lg font-semibold text-gray-300 border-b border-gray-600">
        <h4 className="text-left">Task Title</h4>
        <h4 className="text-center">Status</h4>
        <h4 className="text-center">Priority</h4>
        <h4 className="text-center">Actions</h4>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-1 md:grid-cols-[2.5fr_1fr_1fr_1.5fr] gap-4 items-center py-4 px-4 mb-3 bg-gray-700 rounded-lg
                         hover:bg-gray-600 transition-colors duration-200 ease-in-out
                         border-b border-gray-600 last:border-b-0"
            >
              <div className="col-span-full md:col-auto text-base font-semibold truncate text-left">
                <span className="md:hidden font-semibold text-gray-400">
                  Task:{" "}
                </span>
                {task.title}
              </div>

              <div className="col-span-full md:col-auto flex justify-center md:justify-start">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${getStatusClasses(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              <div className="col-span-full md:col-auto flex justify-center md:justify-start">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${getPriorityClasses(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              <div className="col-span-full md:col-auto flex justify-center gap-2 mt-3 md:mt-0">
                <button
                  onClick={() => handleAction("View", task.id)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                  title="View Details"
                >
                  {/* Eye icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleAction("Start Task", task.id)}
                  className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors duration-200"
                  title="Start Task"
                >
                  {/* Play icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.359 1.636-.936l10.05 5.654a1.5 1.5 0 010 2.672l-10.05 5.654c-.719.423-1.636-.08-1.636-.936V5.653z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-8">
            No pending tasks to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPendingTasks;
