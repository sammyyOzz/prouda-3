import { NextResponse } from "next/server";
import { LoginSchema } from "@/validations";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedFields = LoginSchema.safeParse({
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
    const res = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Invalid email or password",
        },
        { status: res.status }
      );
    }

    // Forward cookies from backend to client
    const response = NextResponse.json({ isSuccess: true, data });

    // Get Set-Cookie headers from backend
    const setCookieHeaders = res.headers.getSetCookie();
    for (const cookie of setCookieHeaders) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "An error occurred during login",
      },
      { status: 500 }
    );
  }
}
