import { NextResponse } from "next/server";
import { getDatabase, closeDatabase } from "@/libs/db"; // Adjust the import path accordingly
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


export async function POST(request) {
    let db;
    try {
       db = getDatabase();
      const { Name , email , Password} = await request.json();
      
      const hashPassword = await bcrypt.hash(Password, 5);
    const user = await db.oneOrNone('SELECT * FROM users WHERE email= $1', email);
    if (user) {
      return NextResponse.json({ user });
    } else {
      const newUser = await db.one(
        "INSERT INTO users (name , email , password) VALUES($1 , $2 , $3) RETURNING *",
       [Name , email , hashPassword]
      );
      return NextResponse.json({ newUser }, { status: 201 });

    }
    } catch (error) {
      console.error("Error adding user:", error);
      return NextResponse.json({ message: error }, { status: 500 });
    }  finally {
      if (db) {
        closeDatabase(); 
      }
    }
  }
