import { NextResponse } from "next/server";
import { MockInterviewCreateSchema } from "@/validations";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * POST /api/mock-interview
 * Create a new AI mock interview session (authenticated)
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedFields = MockInterviewCreateSchema.safeParse(body);

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

    // Get cookies from the incoming request
    const cookieHeader = request.headers.get("cookie") || "";

    // Call backend
    const res = await fetch(`${API_URL}/mock-interview/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to generate mock interview",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error creating mock interview:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/mock-interview
 * List all mock interview sessions for the authenticated user
 */
export async function GET(request) {
  try {
    // Get cookies from the incoming request
    const cookieHeader = request.headers.get("cookie") || "";

    // Call backend
    const res = await fetch(`${API_URL}/mock-interview/`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to fetch sessions",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching mock interview sessions:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
