import React from "react";

const TaskListNumbers = ()=>{
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-5 mt-20 h-auto w-auto">
        <div className="bg-blue-500 h-52 p-5 rounded-2xl">
          <h2 className="text-8xl font-bold">0</h2>
          <h3 className="text-3xl mt-2 font-bold">New task</h3>
        </div>
        <div className="bg-lime-600 p-5 rounded-2xl">
          <h2 className="text-8xl font-bold">3</h2>
          <h3 className="text-3xl mt-2 font-bold">Completed</h3>
        </div>
        <div className="bg-yellow-500 p-5 rounded-2xl">
          <h2 className="text-8xl font-bold text-black">0</h2>
          <h3 className="text-3xl mt-2 font-bold text-black">Accepted</h3>
        </div>
        <div className="bg-orange-500 p-5 rounded-2xl">
          <h2 className="text-8xl font-bold">1</h2>
          <h3 className="text-3xl mt-2 font-bold">Failed</h3>
        </div>
      </div>
    );
}

export default TaskListNumbers