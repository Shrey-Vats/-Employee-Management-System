// src/context/TaskContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
// Assuming api.js will be created in src/utils/
import api from "../utils/api";
// Import useAuth to get user data/role
import { useAuth } from "./AuthContext";

// Create the Task Context
export const TaskContext = createContext();

// Create the Task Provider Component
export const TaskContextProvider = ({ children }) => {
  const { user, isAuthenticated, isAdmin } = useAuth(); // Get user and authentication state from AuthContext

  const [tasks, setTasks] = useState([]); // Stores all tasks fetched
  const [isLoadingTasks, setIsLoadingTasks] = useState(false); // Tracks if task fetching is in progress
  const [taskError, setTaskError] = useState(null); // Stores task-related errors

  // Memoize fetchTasks to prevent unnecessary re-renders in useEffect
  const fetchTasks = useCallback(async () => {
    setIsLoadingTasks(true);
    setTaskError(null);
    try {
      let response;
      if (isAdmin) {
        // Admin fetches all tasks
        // This endpoint should return all tasks from your backend
        response = await api.get("/tasks/admin/all");
      } else if (user) {
        // Employee fetches tasks assigned to them
        // This endpoint should return tasks assigned to user.id
        response = await api.get(`/tasks/employee/${user.id}`);
      } else {
        // No authenticated user, clear tasks and stop loading
        setTasks([]);
        setIsLoadingTasks(false);
        return;
      }
      setTasks(response.data); // Assuming response.data is an array of tasks
    } catch (err) {
      console.error(
        "Failed to fetch tasks:",
        err.response?.data || err.message
      );
      setTaskError(err.response?.data?.message || "Failed to load tasks.");
      setTasks([]); // Clear tasks on error
    } finally {
      setIsLoadingTasks(false);
    }
  }, [user, isAdmin]); // Recreate fetchTasks if user or isAdmin changes

  // Effect to call fetchTasks when the user's authentication status or role changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]); // Clear tasks if no longer authenticated
    }
  }, [isAuthenticated, fetchTasks]); // fetchTasks is now stable due to useCallback

  // Task operation functions: These interact with your backend API
  // and then update the local state to reflect the changes.

  const addTask = async (newTaskData) => {
    setIsLoadingTasks(true); // Can also use a separate loading state for each action if granular control is needed
    setTaskError(null);
    try {
      const response = await api.post("/tasks", newTaskData); // Endpoint for creating a task
      // Option 1: Add the new task to the existing state
      setTasks((prevTasks) => [...prevTasks, response.data]);
      // Option 2 (Alternative): Re-fetch all tasks to ensure data consistency
      // await fetchTasks();
      return response.data; // Return the created task for the caller
    } catch (err) {
      console.error("Failed to add task:", err.response?.data || err.message);
      setTaskError(err.response?.data?.message || "Failed to add task.");
      throw err; // Re-throw to allow components to handle specific errors
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    setIsLoadingTasks(true);
    setTaskError(null);
    try {
      const response = await api.put(`/tasks/${taskId}`, updatedData); // Endpoint for updating a task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? response.data : task))
      );
      return response.data;
    } catch (err) {
      console.error(
        "Failed to update task:",
        err.response?.data || err.message
      );
      setTaskError(err.response?.data?.message || "Failed to update task.");
      throw err;
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const deleteTask = async (taskId) => {
    setIsLoadingTasks(true);
    setTaskError(null);
    try {
      await api.delete(`/tasks/${taskId}`); // Endpoint for deleting a task
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error(
        "Failed to delete task:",
        err.response?.data || err.message
      );
      setTaskError(err.response?.data?.message || "Failed to delete task.");
      throw err;
    } finally {
      setIsLoadingTasks(false);
    }
  };

  // You can add more specific action functions here, e.g.,
  const acceptTask = (taskId) => updateTask(taskId, { status: "accepted" });
  const completeTask = (taskId) => updateTask(taskId, { status: "completed" });
  const failTask = (taskId) => updateTask(taskId, { status: "failed" });
  const startTask = (taskId) => updateTask(taskId, { status: "in progress" });
  // ... and so on for other status changes

  // Filtered task lists for convenience (memoized for performance)
  // These will be used by your dashboard components (AdminDashboard, EmployeeDashboard)
  const allTasks = useMemo(() => tasks, [tasks]); // Simple memoization for the full list

  const newTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.status?.toLowerCase() === "new" ||
          task.status?.toLowerCase() === "pending"
      ),
    [tasks]
  );
  const acceptedTasks = useMemo(
    () => tasks.filter((task) => task.status?.toLowerCase() === "accepted"),
    [tasks]
  );
  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.status?.toLowerCase() === "in progress"),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status?.toLowerCase() === "completed"),
    [tasks]
  );
  const failedTasks = useMemo(
    () => tasks.filter((task) => task.status?.toLowerCase() === "failed"),
    [tasks]
  );
  const rejectedTasks = useMemo(
    () => tasks.filter((task) => task.status?.toLowerCase() === "rejected"), // If you have a 'rejected' status
    [tasks]
  );

  const taskContextValue = {
    tasks: allTasks, // Expose the full list
    isLoadingTasks,
    taskError,
    fetchTasks, // Allow components to trigger a refresh
    addTask,
    updateTask,
    deleteTask,
    // Expose specific action functions
    acceptTask,
    completeTask,
    failTask,
    startTask,
    // Expose filtered task lists for specific views
    newTasks,
    acceptedTasks,
    inProgressTasks, // Added this for employee view
    completedTasks,
    failedTasks,
    rejectedTasks,
  };

  return (
    <TaskContext.Provider value={taskContextValue}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to consume the TaskContext easily
export const useTasks = () => {
  return useContext(TaskContext);
};
