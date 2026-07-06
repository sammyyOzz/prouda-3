import { NextResponse } from "next/server";
import { z } from "zod";

const API_URL = process.env.API_URL || "http://localhost:8000";

const QuizSubmissionSchema = z.object({
  full_name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  answers: z.array(
    z.object({
      question_id: z.string(),
      selected_option_id: z.string(),
    })
  ).min(1, { message: "At least one answer is required" }),
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the input fields
    const validatedFields = QuizSubmissionSchema.safeParse(body);

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

    const res = await fetch(`${API_URL}/career-quiz/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to submit quiz:", errorData);
      return NextResponse.json(
        { isSuccess: false, message: errorData.detail || "Failed to submit quiz" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error submitting quiz:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
