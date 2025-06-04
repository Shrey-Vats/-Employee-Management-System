import React from "react";
import Header from "../other/header";

const AdminDashboard = ()=>{
    return (
      <div className="h-screen w-full p-10">
        <Header />

        <div className="mt-10">
          <form className="flex flex-wrap w-full  items-start justify-between">
            <div className="w-1/2">
              <div>
                <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
                <input
                  type="text"
                  placeholder="Enter your task title"
                  className="text-sm py-1 px-2 w-4/5 bg-transparent outline-none border-[1px] rounded border-gray-400 mb-4"
                />
              </div>
              <div>
                <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
                <input
                  type="date"
                  name=""
                  id=""
                  placeholder="select date"
                  className="text-sm w-4/5 px-2 py-1 bg-transparent outline-none border-[1px] border-gray-400 rounded mb-4"
                />
              </div>
              <div>
                <h3 className="text-sm text-gray-300 mb-0.5">Asign to</h3>
                <input
                  type="text"
                  placeholder="employee name"
                  className="text-sm py-1 px-2 w-4/5 bg-transparent outline-none border-[1px] rounded border-gray-400 mb-4"
                />
              </div>
              <div>
                <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
                <input
                  type="text"
                  placeholder="design, dev, etc"
                  className="text-sm py-1 px-2 w-4/5 bg-transparent outline-none border-[1px] rounded border-gray-400 mb-4"
                />
              </div>
            </div>
            <div className="w-1/2">
              <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
              <textarea
                name=""
                id=""
                rows="10"
                cols="50"
                placeholder="Ender description here"
                className="w-full h-44 text-sm py-2 px-4  bg-transparent outline-none border-[1px] rounded border-gray-400 mb-4"
              ></textarea>
              <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">Create Task</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default AdminDashboard