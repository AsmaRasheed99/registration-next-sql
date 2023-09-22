"use client"
import Link from "next/link"
import { useState, } from "react"



const page = () => {
const [email, setEmail] = useState("");
const [Password, setPassword] = useState("");

const handleSignIn = async (e)=>{
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:3000/api/users/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({  email , Password}),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("auth",data.token);
      window.location.href = "http://localhost:3000/welcome"
          } else {
      throw new Error("Failed");
    }
  } catch (error) {
    console.log(error.message);
  }    

}

  return (
    <form className="flex flex-col gap-5 items-center w-full py-10  " onSubmit={(e)=>{handleSignIn(e)}}>
      <p>Sign In</p>
      <input type="email" placeholder="Email" className="shadow-lg p-2 rounded-lg w-60 border" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type="password" placeholder="Password" className="shadow-lg p-2 rounded-lg w-60 border" value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button type="submit" className="p-2 bg-sky-800 rounded-lg text-white">Sign In</button>

     <p className="text-sm">Don't have an account?  <Link className="text-blue-500 font-bold" href="/">sign up</Link></p>
    </form>
  )
  }

export default page