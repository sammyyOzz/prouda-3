import { NextResponse } from "next/server";
import { RegisterSchema } from "@/validations";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedFields = RegisterSchema.safeParse({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      password: body.password,
    });

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          isSuccess: false,
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Validation failed",
        },
        { status: 400 }
      );
    }

    // Call backend
    const res = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Registration failed",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "An error occurred during registration",
      },
      { status: 500 }
    );
  }
}
