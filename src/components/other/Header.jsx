import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-white">
        Welcome, <br />{" "}
        <span className="text-indigo-400 text-4xl">Shrey Vats</span>
      </h1>
      <button className="bg-red-700 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">
        Log out
      </button>
    </div>
  );
};

export default Header;
