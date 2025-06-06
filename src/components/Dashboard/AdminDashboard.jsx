import React from "react";
import Header from "../other/header";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gray-950 p-6 sm:p-10 text-white font-sans">
      {/* Overall container with a dark background and padding */}
      <Header /> {/* Assuming Header is already premium */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/*
          This grid layout will place CreateTask and AllTask side-by-side on larger screens,
          and stack them on smaller screens, optimizing space usage.
        */}
        <div className="lg:col-span-1">
          {" "}
          {/* Take 1 column on large screens */}
          <CreateTask />
        </div>
        <div className="lg:col-span-1">
          {" "}
          {/* Take 1 column on large screens */}
          <AllTask />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
