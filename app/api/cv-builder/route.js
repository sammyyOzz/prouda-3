import { NextResponse } from "next/server";
import { CVGenerateSchema } from "@/validations";

const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * POST /api/cv-builder
 * Generate an AI resume (and optional cover letter) for the authenticated user
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const validatedFields = CVGenerateSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          isSuccess: false,
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Validation failed",
        },
        { status: 400 }
      );
    }

    const cookieHeader = request.headers.get("cookie") || "";

    const res = await fetch(`${API_URL}/cv-builder/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to generate resume",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error creating CV builder submission:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cv-builder
 * List all CV builder submissions for the authenticated user
 */
export async function GET(request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";

    const res = await fetch(`${API_URL}/cv-builder/`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          message: data.detail || "Failed to fetch submissions",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error fetching CV builder submissions:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
