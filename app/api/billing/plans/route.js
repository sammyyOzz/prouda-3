import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * GET /api/billing/plans
 * List founding/standard pricing tiers (public)
 */
export async function GET() {
  try {
    const res = await fetch(`${API_URL}/billing/plans`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to fetch plans",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching plans:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
