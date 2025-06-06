// src/context/TaskContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getAllTasks,
  getTasksByUserId,
  createTask,
  updateTaskStatus,
  deleteTask,
  getAllUsers, // NEW: Import getAllUsers API function
} from "../utils/api";
import { AuthContext } from "./AuthContext";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW: State for active employees (users)
  const [employees, setEmployees] = useState([]); // Renamed from 'users' for clarity
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employeesError, setEmployeesError] = useState(null);

  const { user: currentUser, isAuthenticated } = useContext(AuthContext);

  // --- Functions to interact with the backend API ---

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let fetchedData = [];
      if (isAuthenticated && currentUser) {
        if (currentUser.role === "admin") {
          fetchedData = await getAllTasks();
        } else if (currentUser.role === "employee" && currentUser.id) {
          fetchedData = await getTasksByUserId(currentUser.id);
        }
      }
      setAllTasks(fetchedData);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(err.message || "Failed to load tasks.");
      setAllTasks([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, currentUser]);

  // NEW: Function to fetch active employees for the dropdown
  const fetchEmployees = useCallback(async () => {
    // Only fetch employees if the current user is an admin and authenticated
    if (!isAuthenticated || currentUser?.role !== "admin") {
      setEmployees([]); // Clear employees if not admin
      return;
    }

    setLoadingEmployees(true);
    setEmployeesError(null);
    try {
      const data = await getAllUsers(); // Call your API function to get all users
      // Filter for employees on the frontend if your API doesn't do it
      const activeEmployees = data.filter(
        (user) => user.role === "employee" && user.isActive === true // Assuming 'isActive' property exists
      );
      setEmployees(activeEmployees);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setEmployeesError(err.message || "Failed to load employees.");
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  }, [isAuthenticated, currentUser]); // Depend on auth status and current user for re-fetch

  // Trigger fetchTasks and fetchEmployees when component mounts or dependencies change
  useEffect(() => {
    fetchTasks();
    fetchEmployees(); // Call new fetchEmployees function
  }, [fetchTasks, fetchEmployees]); // Add fetchEmployees to dependencies

  const addTask = async (newTaskData) => {
    try {
      const response = await createTask(newTaskData);
      // setAllTasks((prevTasks) => [...prevTasks, response.task]); // Removed, fetchTasks will re-populate
      fetchTasks(); // Re-fetch all tasks to ensure correct state and filtering
      return response.task;
    } catch (err) {
      console.error("Error adding task:", err);
      throw err;
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      // Your updateTaskStatus API function expects `newStatus` as the second arg.
      // So, if `updates` contains `{ status: "completed" }`, extract it.
      // If `updates` could contain other fields, your `updateTaskStatus` in api.js
      // would need to be updated to accept an `updates` object, not just `newStatus`.
      const response = await updateTaskStatus(taskId, updates.status); // Assuming updates.status is present
      // setAllTasks((prevTasks) =>
      //   prevTasks.map(
      //     (task) => (task._id === taskId ? { ...task, ...response.task } : task)
      //   )
      // );
      fetchTasks(); // Re-fetch all tasks
      return response.task;
    } catch (err) {
      console.error("Error updating task:", err);
      throw err;
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setAllTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
  };

  // --- Filtering logic within context for various components ---
  const newTasks = allTasks.filter(
    (task) => task.status === "new" || task.status === "pending"
  );
  const acceptedTasks = allTasks.filter(
    (task) => task.status === "accepted" || task.status === "in progress"
  );
  const completedTasks = allTasks.filter((task) => task.status === "completed");
  const failedTasks = allTasks.filter((task) => task.status === "failed");
  const rejectedTasks = allTasks.filter((task) => task.status === "rejected");
  const inProgressTasks = allTasks.filter(
    (task) => task.status === "in progress"
  );

  const value = {
    tasks: allTasks,
    isLoadingTasks: loading,
    taskError: error,

    newTasks,
    acceptedTasks,
    completedTasks,
    failedTasks,
    rejectedTasks,
    inProgressTasks,

    fetchTasks,
    addTask,
    updateTask,
    deleteTask: removeTask,

    // NEW: Expose employees data and loading/error states
    users: employees, // Provide the filtered employee list
    isLoadingUsers: loadingEmployees,
    usersError: employeesError,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
