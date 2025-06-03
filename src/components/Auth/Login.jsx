import React, { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHeader = (e)=>{
    e.preventDefault();
    console.log(`email is ${email}, and password is ${password}`)

    setEmail("")
    setPassword('')
  }

    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="border-2 border-emerald-600 p-20 rounded-xl">
          <form
          onSubmit={(e)=>{
            submitHeader(e)
          }} 
          className="flex align-center justify-center flex-col">
            <input
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
              className=" bg-transparent border-2 border-emerald-600 text-white placeholder:text-gray-500 py-3 px-5 outline-none rounded-full text-xl"
              type="email"
              placeholder="Enter your email"
              required
            />
            <input
            value = {password}
            onChange={(e)=>{
              setPassword(e.target.value);
            }}

              className=" bg-transparent border-2 border-emerald-600 text-white placeholder:text-gray-500 py-3 px-4 outline-none rounded-full mt-2  text-xl " 
              type="password"
              placeholder="Enter your password"
              required
            />
            <button className=" bg-emerald-600 text-white font-bold placeholder:text-[#F5EDF0] py-3 px-4 outline-none mt-5 placeholder:opacity-50 text-xl rounded-full">
               Log in
            </button>
          </form>
        </div>
      </div>
    );
}

export default Login