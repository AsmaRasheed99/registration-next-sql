import { NextResponse } from "next/server";
import { getDatabase, closeDatabase } from "@/libs/db"; // Adjust the import path accordingly
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;

export async function POST(request) {
  let db;
  try {
    db = getDatabase();
    const { email, Password } = await request.json();
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE email= $1 ",
      email
    );
    const validpassword = await bcrypt.compare(Password, user.password);
    if (!validpassword) {
      return NextResponse.json(
        { message: "password not correct" },
        { status: 400 }
      );
    } else {
      const token = jwt.sign({ id: user._id }, SECRETKEY, { expiresIn: "24h" });
      return NextResponse.json({ user, token }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  } finally {
    if (db) {
      closeDatabase();
    }
  }
}
