import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const res = await fetch(`${API_URL}/video-script-generator/results/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to fetch video script result:", errorData);
      return NextResponse.json(
        { isSuccess: false, message: errorData.detail || "Failed to fetch result" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching video script result:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
