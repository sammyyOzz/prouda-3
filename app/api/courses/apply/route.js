import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for course applications
const CourseApplicationSchema = z.object({
  firstName: z
    .string()
    .regex(/[a-zA-Z]/, { message: "First name must contain at least one letter." })
    .trim(),
  lastName: z
    .string()
    .regex(/[a-zA-Z]/, { message: "Last name must contain at least one letter." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  course: z
    .string()
    .min(1, { message: "Please select a course." })
    .trim(),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters." })
    .trim(),
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the input fields
    const validatedFields = CourseApplicationSchema.safeParse({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      course: body.course,
      message: body.message,
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          isSuccess: false,
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Validation failed",
        },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, course, message } = validatedFields.data;

    // Add contact to Brevo CRM
    const contactPayload = {
      email,
      listIds: [14],
      updateEnabled: true,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        EMAIL: email,
        COURSE: [course],
        MESSAGE: message,
      },
    };

    console.dir(contactPayload, { depth: null });

    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify(contactPayload),
    });

    const contactData = await contactRes.json();

    if (!contactRes.ok) {
      console.error("Brevo contact creation error:", contactData);
      return NextResponse.json(
        {
          isSuccess: false,
          message: contactData.message || "Failed to process application",
        },
        { status: contactRes.status },
      );
    }

    console.log("Course applicant contact created:", contactData);

    return NextResponse.json({
      isSuccess: true,
      message: "Your application has been submitted successfully! We'll review it and get back to you within 24-48 hours.",
    });
  } catch (err) {
    console.error("Course application API error:", err);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "Server error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
