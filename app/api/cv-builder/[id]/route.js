import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * GET /api/cv-builder/[id]
 * Get a specific CV builder submission
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const cookieHeader = request.headers.get("cookie") || "";

    const res = await fetch(`${API_URL}/cv-builder/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to fetch submission",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching CV builder submission:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
