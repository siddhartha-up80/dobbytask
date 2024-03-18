import { hash } from "bcrypt-ts";
import User from "@/models/User";
import { NextRequest } from "next/server";
import { connectToDB } from "@/lib/database";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = (await request.json()) as {
    name: string;
    email: string;
    password: string;
  };

  try {
    await connectToDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred during signup:", error);
    return new Response(JSON.stringify({ message: "Failed to create user" }), {
      status: 500,
    });
  }
};
