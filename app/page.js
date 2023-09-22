"use client"
import Link from "next/link";
import { useState } from "react";

export default function Home() {

const [Name , setName] = useState("")
const [email , setEmail] = useState("")
const [Password , setPassword] = useState("")


  const handleRegistration = async (e)=>{
    e.preventDefault();
    
    try {
      const res = await fetch(`http://localhost:3000/api/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ Name , email , Password}),
      });
  
      if (res.ok) {
  
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      console.log(error.message);
    }    
  }

  return (
    <>
    <form className="flex flex-col gap-5 items-center w-full py-10  " onSubmit={(e)=>{handleRegistration(e)}}>
      <p>Sign Up</p>
      <input type="text" placeholder="Name" className="shadow-lg p-2 rounded-lg w-60 border" value={Name} onChange={(e)=>{setName(e.target.value)}}/>
      <input type="email" placeholder="Email" className="shadow-lg p-2 rounded-lg w-60 border"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type="password" placeholder="Password" className="shadow-lg p-2 rounded-lg w-60 border"  value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button type="submit" className="p-2 bg-sky-800 rounded-lg text-white">Register</button>
     <p className="text-sm">Already have an account?  <Link className="text-blue-500 font-bold" href="/signin">sign in</Link></p>
    </form>
    </>
  )
}
