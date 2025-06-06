import React from "react";

const AllTask = () => {
  // Sample dynamic task data for the admin view
  const adminTasks = [
    {
      id: "admin-task-1",
      employee: "Shrey Vats",
      title: "Complete MERN Stack Project",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "admin-task-2",
      employee: "Priya Sharma",
      title: "Prepare Q3 Marketing Strategy",
      status: "Pending",
      priority: "High",
    },
    {
      id: "admin-task-3",
      employee: "Rahul Singh",
      title: "Review Backend API Documentation",
      status: "Completed",
      priority: "Medium",
    },
    {
      id: "admin-task-4",
      employee: "Anjali Kumari",
      title: "Draft Company Newsletter",
      status: "Accepted",
      priority: "Low",
    },
    {
      id: "admin-task-5",
      employee: "Shrey Vats",
      title: "Fix Login Bug",
      status: "Failed",
      priority: "High",
    },
    {
      id: "admin-task-6",
      employee: "Priya Sharma",
      title: "Social Media Campaign Launch",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "admin-task-7",
      employee: "Rahul Singh",
      title: "Database Migration Planning",
      status: "Pending",
      priority: "High",
    },
  ];

  // Helper functions for status and priority classes (re-using logic from TaskCard)
  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-600";
      case "in progress":
        return "bg-purple-600";
      case "completed":
        return "bg-lime-600";
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
    // In a real app, you'd implement specific logic for each action
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 text-white h-[500px] flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        All Tasks
      </h2>

      {/* Table Header - Adjusted grid-cols and alignment */}
      <div className="hidden md:grid grid-cols-[1.5fr_2.5fr_1fr_1fr_1.5fr] gap-4 py-3 px-4 mb-2 bg-gray-700 rounded-lg font-semibold text-gray-300 border-b border-gray-600">
        <h4 className="text-left">Employee</h4>
        <h4 className="text-left">Task Title</h4>
        <h4 className="text-center">Status</h4>
        <h4 className="text-center">Priority</h4>
        <h4 className="text-center">Actions</h4> {/* No wrapping now */}
      </div>

      {/* Task List - Scrollable Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {adminTasks.length > 0 ? (
          adminTasks.map((task) => (
            <div
              key={task.id}
              // Adjusted grid-cols to match header and content alignment
              className="grid grid-cols-1 md:grid-cols-[1.5fr_2.5fr_1fr_1fr_1.5fr] gap-4 items-center py-4 px-4 mb-3 bg-gray-700 rounded-lg
                         hover:bg-gray-600 transition-colors duration-200 ease-in-out cursor-pointer
                         border-b border-gray-600 last:border-b-0"
            >
              {/* Employee Name */}
              <div className="col-span-full md:col-auto font-medium truncate text-left">
                {" "}
                {/* col-span-full for mobile */}
                <span className="md:hidden font-semibold text-gray-400">
                  Employee:{" "}
                </span>
                {task.employee}
              </div>

              {/* Task Title */}
              <div className="col-span-full md:col-auto text-base font-semibold text-left">
                {" "}
                {/* col-span-full for mobile */}
                <span className="md:hidden font-semibold text-gray-400">
                  Task:{" "}
                </span>
                {task.title}
              </div>

              {/* Status Badge */}
              <div className="col-span-full md:col-auto flex justify-center md:justify-start">
                {" "}
                {/* Align left on mobile, center on desktop */}
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${getStatusClasses(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              {/* Priority Badge */}
              <div className="col-span-full md:col-auto flex justify-center md:justify-start">
                {" "}
                {/* Align left on mobile, center on desktop */}
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${getPriorityClasses(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              {/* Actions */}
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
                  onClick={() => handleAction("Edit", task.id)}
                  className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 text-black"
                  title="Edit Task"
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25v4.75a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h4.75"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleAction("Delete", task.id)}
                  className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
                  title="Delete Task"
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.927a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.006-2.147m-6.494 0V3.5c0-1.18.91-2.14 2.006-2.147h2.488c1.1.007 2.006 1.02 2.006 2.147v.916m-1.5 1.5l.525-1.05a.75.75 0 00-.67-1.125h-.64l-.525 1.05ZM10.5 5.25v.75m3-3v-.75m-6-4.5h-.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-8">
            No tasks found. Create one!
          </p>
        )}
      </div>
    </div>
  );
};

export default AllTask;
