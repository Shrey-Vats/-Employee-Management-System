import React, { useState } from "react";

const CreateTask = () => {
  // State for all form fields
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium"); // Added priority with default
  const [description, setDescription] = useState("");

  // Sample data for dropdowns (in a real app, these would come from an API)
  const employees = [
    "Shrey Vats",
    "Priya Sharma",
    "Rahul Singh",
    "Anjali Kumari",
  ];
  const categories = [
    "Development",
    "Design",
    "Marketing",
    "Content",
    "Support",
    "HR",
  ];
  const priorities = ["High", "Medium", "Low"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this data to your backend API
    console.log("New Task Details:");
    console.log({
      taskTitle,
      dueDate,
      assignedTo,
      category,
      priority,
      description,
    });
    // Reset form fields after submission
    setTaskTitle("");
    setDueDate("");
    setAssignedTo("");
    setCategory("");
    setPriority("Medium");
    setDescription("");
  };

  return (
    <div
      id="createtask"
      className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 text-white"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        Create New Task
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
      >
        {/* Left Column for Inputs */}
        <div className="md:col-span-1">
          {/* Task Title */}
          <div>
            <label
              htmlFor="taskTitle"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Task Title
            </label>
            <input
              id="taskTitle"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g., Develop new API endpoint"
              className="w-full bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 py-2.5 px-4 rounded-lg outline-none text-base transition-all duration-200 placeholder-gray-500"
              required
            />
          </div>

          {/* Due Date */}
          <div className="mt-5">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 py-2.5 px-4 rounded-lg outline-none text-base transition-all duration-200 appearance-none date-input-icon" // Added appearance-none and custom class for date icon
              required
            />
          </div>

          {/* Assign To (Dropdown) */}
          <div className="mt-5">
            <label
              htmlFor="assignedTo"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Assign To
            </label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 py-2.5 px-4 rounded-lg outline-none text-base transition-all duration-200 custom-select" // Added custom-select for dropdown icon
              required
            >
              <option value="" disabled>
                Select an employee
              </option>
              {employees.map((employee) => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </div>

          {/* Category (Dropdown) */}
          <div className="mt-5">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 py-2.5 px-4 rounded-lg outline-none text-base transition-all duration-200 custom-select"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Priority (Dropdown) */}
          <div className="mt-5">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 py-2.5 px-4 rounded-lg outline-none text-base transition-all duration-200 custom-select"
              required
            >
              {priorities.map((prio) => (
                <option key={prio} value={prio}>
                  {prio}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column for Description and Button */}
        <div className="md:col-span-1">
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="8" // Adjusted rows for better initial height
              placeholder="Provide a detailed description of the task..."
              className="w-full h-full min-h-[160px] bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 py-2.5 px-4 rounded-lg outline-none text-base transition-all duration-200 placeholder-gray-500 resize-y" // Added resize-y
              required
            ></textarea>
          </div>

          {/* Create Task Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-lg text-lg mt-8
                       shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
