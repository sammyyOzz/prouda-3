import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for tutor hire inquiries
const TutorHireSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  roleNeeded: z
    .string()
    .min(1, { message: "Please select a role." })
    .trim(),
  teachingNiche: z
    .string()
    .min(1, { message: "Please select a teaching niche." })
    .trim(),
  message: z
    .string()
    .trim()
    .optional(),
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the input fields
    const validatedFields = TutorHireSchema.safeParse({
      companyName: body.companyName,
      email: body.email,
      roleNeeded: body.roleNeeded,
      teachingNiche: body.teachingNiche,
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

    const { companyName, email, roleNeeded, teachingNiche, message } = validatedFields.data;

    // Add contact to Brevo CRM
    const contactPayload = {
      email,
      listIds: [16],
      updateEnabled: true,
      attributes: {
        COMPANY: companyName,
        ROLE: [roleNeeded],
        NICHE: [teachingNiche],
        MESSAGE: message || "",
      },
    };

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
          message: contactData.message || "Failed to submit hire inquiry",
        },
        { status: contactRes.status },
      );
    }

    console.log("Tutor hire inquiry contact created:", contactData);

    return NextResponse.json({
      isSuccess: true,
      message: "Your inquiry has been submitted successfully! We'll be in touch soon with tutor recommendations.",
    });
  } catch (err) {
    console.error("Tutor hire API error:", err);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "Server error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
