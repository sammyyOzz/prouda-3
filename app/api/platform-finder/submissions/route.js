import { NextResponse } from "next/server";
import { z } from "zod";

const API_URL = process.env.API_URL || "http://localhost:8000";

const SubmissionSchema = z.object({
  answers: z.array(
    z.object({
      question_id: z.string(),
      selected_option_ids: z.array(z.string()).min(1, { message: "Select at least one option" }),
    })
  ).min(1, { message: "At least one answer is required" }),
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the input fields
    const validatedFields = SubmissionSchema.safeParse(body);

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

    const res = await fetch(`${API_URL}/platform-finder/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to submit platform finder:", errorData);
      return NextResponse.json(
        { isSuccess: false, message: errorData.detail || "Failed to submit" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error submitting platform finder:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
