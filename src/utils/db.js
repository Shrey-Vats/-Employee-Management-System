import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    email: String,
    password: String
})

const TaskSchema = new Schema({
  Title: String,
  Description: String,
  Date: Date,
  Category: String,
  Asign: String
});

const User = mongoose.model("User", UserSchema);
const Task = mongoose.model("Tasks", TaskSchema);

module.exports = {
    User,
    Task
}