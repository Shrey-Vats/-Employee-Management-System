import mongoose from "mongoose";
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables from .env

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true }, // Added validation
  password: { type: String, required: true }, // Added validation
});

const TaskSchema = new Schema({
  Title: { type: String, required: true },
  Description: String,
  Date: { type: Date, default: Date.now }, // Set default to current date
  Category: String,
  Asign: String,
});

const User = mongoose.model("User", UserSchema);
const Task = mongoose.model("Tasks", TaskSchema);

// Connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // These options are deprecated in newer Mongoose versions,
      // but good to keep in mind if you're using an older version:
      // useCreateIndex: true,
      // useFindAndModify: false
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = {
  User,
  Task,
  connectDB, // Export the connection function
};
