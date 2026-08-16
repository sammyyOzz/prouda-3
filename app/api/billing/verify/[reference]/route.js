import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * POST /api/billing/verify/[reference]
 * Confirm a Paystack transaction after redirect back from checkout (authenticated)
 */
export async function POST(request, { params }) {
  try {
    const { reference } = await params;
    const cookieHeader = request.headers.get("cookie") || "";

    const res = await fetch(`${API_URL}/billing/verify/${reference}`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to verify payment",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error verifying payment:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
