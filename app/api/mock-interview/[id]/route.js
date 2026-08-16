import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * GET /api/mock-interview/[id]
 * Get a specific mock interview session by ID (authenticated)
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { isSuccess: false, message: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get cookies from the incoming request
    const cookieHeader = request.headers.get("cookie") || "";

    // Call backend
    const res = await fetch(`${API_URL}/mock-interview/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to fetch session",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching mock interview session:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
