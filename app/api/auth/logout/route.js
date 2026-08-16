import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Get cookies from the incoming request
    const cookieHeader = request.headers.get("cookie") || "";

    // Call backend
    const res = await fetch(`${process.env.API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    const data = await res.json();

    // Forward cookies from backend to client (clears them)
    const response = NextResponse.json({
      isSuccess: res.ok,
      message: data.message || "Logged out",
    });

    // Get Set-Cookie headers from backend
    const setCookieHeaders = res.headers.getSetCookie();
    for (const cookie of setCookieHeaders) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "An error occurred during logout",
      },
      { status: 500 }
    );
  }
}
