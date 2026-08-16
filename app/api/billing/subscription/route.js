import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * GET /api/billing/subscription
 * Get the authenticated user's most recent subscription
 */
export async function GET(request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";

    const res = await fetch(`${API_URL}/billing/subscription`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "No subscription found",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching subscription:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
