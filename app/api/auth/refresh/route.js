import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Get cookies from the incoming request
    const cookieHeader = request.headers.get("cookie") || "";

    // Call backend
    const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Token refresh failed",
        },
        { status: res.status }
      );
    }

    // Forward cookies from backend to client
    const response = NextResponse.json({ isSuccess: true, message: data.message });

    // Get Set-Cookie headers from backend
    const setCookieHeaders = res.headers.getSetCookie();
    for (const cookie of setCookieHeaders) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "An error occurred during token refresh",
      },
      { status: 500 }
    );
  }
}
