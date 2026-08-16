import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get("id");
    const email = searchParams.get("email");

    let url;
    if (submissionId) {
      url = `${API_URL}/platform-finder/results/${submissionId}`;
    } else if (email) {
      url = `${API_URL}/platform-finder/results/by-email/${encodeURIComponent(email)}`;
    } else {
      return NextResponse.json(
        { isSuccess: false, message: "Either id or email parameter is required" },
        { status: 400 }
      );
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to fetch platform finder results:", errorData);
      return NextResponse.json(
        { isSuccess: false, message: errorData.detail || "Failed to fetch results" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching platform finder results:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
