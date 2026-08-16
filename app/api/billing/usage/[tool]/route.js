import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * GET /api/billing/usage/[tool]
 * Get the authenticated user's free-trial usage and subscription access for a gated tool
 */
export async function GET(request, { params }) {
  try {
    const { tool } = await params;
    const cookieHeader = request.headers.get("cookie") || "";

    const res = await fetch(`${API_URL}/billing/usage/${tool}`, {
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
          message: data.detail || "Failed to fetch usage",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching tool usage:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
