import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * POST /api/billing/checkout
 * Start a Paystack subscription checkout (authenticated)
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const cookieHeader = request.headers.get("cookie") || "";
    const origin = request.headers.get("origin") || "";

    const res = await fetch(`${API_URL}/billing/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
        "X-Client-Origin": origin,
      },
      body: JSON.stringify({
        tier: body.tier,
        interval: body.interval,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to start checkout",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error starting checkout:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
