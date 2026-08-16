import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get cookies from the incoming request
    const cookieHeader = request.headers.get("cookie") || "";

    // Call backend
    const res = await fetch(`${process.env.API_URL}/auth/me`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Not authenticated",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "An error occurred",
      },
      { status: 500 }
    );
  }
}
