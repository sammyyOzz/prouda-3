import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * POST /api/cv-builder/extract
 * Upload an existing resume and extract fields to pre-fill the CV builder form
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const cookieHeader = request.headers.get("cookie") || "";

    const res = await fetch(`${API_URL}/cv-builder/extract`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to extract resume",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error extracting resume:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
