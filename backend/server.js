// backend/server.js (Example using Express.js)
import express from "express";
import cors from "cors"; // For enabling cross-origin requests
import { connectDB, User, Task } from "./db.js"; // Import from your db.js
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000 for backend

// Middleware
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // For parsing JSON request bodies

// Connect to MongoDB
connectDB();

// --- API Endpoints ---

// User Registration (Example: Register a new employee)
app.post("/api/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // In a real app, hash password before saving!
    const newUser = new User({ email, password, role: role || "employee" });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
});

// User Login (Example)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      // In real app, compare hashed passwords
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // In a real app, generate and send a JWT token
    res
      .status(200)
      .json({
        message: "Login successful!",
        user: { id: user._id, email: user.email, role: user.role },
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
});

// Create a new task (Admin only)
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, assignedTo, priority } = req.body;
    // You would typically add authentication/authorization here to check if user is admin
    const newTask = new Task({
      title,
      description,
      assignedTo, // This should be a valid User ObjectId
      status: "new", // Default status for new tasks
      priority: priority || "medium",
    });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully!", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(400)
      .json({ message: "Error creating task", error: error.message });
  }
});

// Get all tasks (Admin only, or based on user roles)
app.get("/api/tasks", async (req, res) => {
  try {
    // Populate assignedTo field to get user details
    const tasks = await Task.find().populate("assignedTo", "email role");
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
});

// Get tasks for a specific user (Employee specific)
app.get("/api/tasks/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ assignedTo: userId }).populate(
      "assignedTo",
      "email role"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user tasks", error: error.message });
  }
});

// Update task status (Admin or Employee)
app.patch("/api/tasks/:id/status", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body; // New status
    // Add validation for valid status values if not already handled by schema enum
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    ).populate("assignedTo", "email role");

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({
        message: "Task status updated successfully!",
        task: updatedTask,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating task status", error: error.message });
  }
});

// Delete a task (Admin only)
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    // Add authentication/authorization here
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Backend API URL: http://localhost:${PORT}/api`);
});
