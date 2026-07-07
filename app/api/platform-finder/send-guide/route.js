import { NextResponse } from "next/server";
import { z } from "zod";

const API_URL = process.env.API_URL || "http://localhost:8000";

const SendGuideSchema = z.object({
  submission_id: z.string(),
  full_name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  whatsapp_number: z.string().min(1, { message: "WhatsApp number is required" }),
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the input fields
    const validatedFields = SendGuideSchema.safeParse(body);

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

    const res = await fetch(`${API_URL}/platform-finder/send-guide`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to send guide:", errorData);
      return NextResponse.json(
        { isSuccess: false, message: errorData.detail || "Failed to send guide" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ isSuccess: true, data });
  } catch (err) {
    console.error("Error sending guide:", err);
    return NextResponse.json(
      { isSuccess: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}
