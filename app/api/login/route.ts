import { compare } from "bcrypt-ts";
import User from "@/models/User";
import { NextRequest } from "next/server";
import { connectToDB } from "@/lib/database";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "";

export const POST = async (request: NextRequest) => {
  const { email, password } = (await request.json()) as {
    email: string;
    password: string;
  };

  try {
    await connectToDB();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }

    const loggedInUser = {
      userId: user._id,
      username: user.name,
    };

    const token = jwt.sign(loggedInUser, secret, {
      expiresIn: "1h",
    });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Error occurred during login:", error);
    return new Response(JSON.stringify({ message: "Failed to login user" }), {
      status: 500,
    });
  }
};
