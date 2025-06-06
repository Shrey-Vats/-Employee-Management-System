import React from "react";

const CompleteTask = () => {
  const completedTasks = [
    {
      id: "completed-task-1",
      employee: "Rahul Singh",
      title: "Review Backend API Documentation",
      status: "Completed",
      priority: "Medium",
      dueDate: "2025-06-01",
    },
    {
      id: "completed-task-2",
      employee: "Shrey Vats",
      title: "Deploy User Authentication Service",
      status: "Completed",
      priority: "High",
      dueDate: "2025-05-28",
    },
    {
      id: "completed-task-3",
      employee: "Anjali Kumari",
      title: "Finalize Marketing Campaign Copy",
      status: "Completed",
      priority: "Low",
      dueDate: "2025-06-05",
    },
  ];

  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
      case "new":
        return "bg-blue-600";
      case "in progress":
        return "bg-purple-600";
      case "completed":
        return "bg-lime-600"; // Lime for completed
      case "failed":
        return "bg-red-600";
      case "accepted":
        return "bg-indigo-600";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityClasses = (priority) => {
    switch (priority.toLowerCase()) {
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

  const handleAction = (action, taskId) => {
    console.log(`${action} action triggered for task: ${taskId}`);
    // Implement specific logic for actions like 'Archive', 'View Details'
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 text-white h-[500px] flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Completed Tasks
      </h2>

      <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_1.5fr] gap-4 py-3 px-4 mb-2 bg-gray-700 rounded-lg font-semibold text-gray-300 border-b border-gray-600">
        <h4 className="text-left">Task Title</h4>
        <h4 className="text-left">Assigned To</h4>
        <h4 className="text-center">Priority</h4>
        <h4 className="text-center">Actions</h4>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr_1.5fr] gap-4 items-center py-4 px-4 mb-3 bg-gray-700 rounded-lg
                         hover:bg-gray-600 transition-colors duration-200 ease-in-out cursor-pointer
                         border-b border-gray-600 last:border-b-0"
            >
              <div className="col-span-full md:col-auto text-base font-semibold truncate text-left">
                <span className="md:hidden font-semibold text-gray-400">
                  Task:{" "}
                </span>
                {task.title}
              </div>

              <div className="col-span-full md:col-auto font-medium truncate text-left">
                <span className="md:hidden font-semibold text-gray-400">
                  Assigned To:{" "}
                </span>
                {task.employee}
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
                  onClick={() => handleAction("Archive", task.id)}
                  className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors duration-200"
                  title="Archive Task"
                >
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
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.5l3 3m0 0l3-3m-3 3V4.5m7.5 3h-3.375c-.621 0-1.125-.504-1.125-1.125V4.5c0-.621.504-1.125 1.125-1.125h3.375c.621 0 1.125.504 1.125 1.125v1.875c0 .621-.504 1.125-1.125 1.125z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-8">
            No completed tasks to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default CompleteTask;
