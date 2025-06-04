import React from "react";
import Header from "../other/header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../Task/TaskList";


const EmployeeDashboard = ()=>{
    return (
    <div className="p-10 bg-[#1C1C1C] w-screen h-screen">
        <Header />
        <TaskListNumbers />
        <TaskList />
    </div>
);
}

export default EmployeeDashboard