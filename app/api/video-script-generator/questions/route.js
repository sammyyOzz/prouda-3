import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/video-script-generator/active-questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to fetch video script questions:", errorData);
      return NextResponse.json(
        { isSuccess: false, message: errorData.detail || "Failed to fetch questions" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching video script questions:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
