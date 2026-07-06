import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { isSuccess: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${API_URL}/career-quiz/results/latest/${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json(
          { isSuccess: false, message: "No results found for this email" },
          { status: 404 }
        );
      }
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to fetch results:", errorData);
      return NextResponse.json(
        { isSuccess: false, message: errorData.detail || "Failed to fetch results" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching results:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
