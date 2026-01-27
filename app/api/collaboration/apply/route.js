import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for partnership inquiries
const PartnershipInquirySchema = z.object({
  firstName: z
    .string()
    .regex(/[a-zA-Z]/, { message: "First name must contain at least one letter." })
    .trim(),
  lastName: z
    .string()
    .regex(/[a-zA-Z]/, { message: "Last name must contain at least one letter." })
    .trim(),
  company: z
    .string()
    .min(2, { message: "Company/Organization name must be at least 2 characters." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  partnershipType: z
    .string()
    .min(1, { message: "Please select a partnership type." })
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
    const validatedFields = PartnershipInquirySchema.safeParse({
      firstName: body.firstName,
      lastName: body.lastName,
      company: body.company,
      email: body.email,
      partnershipType: body.partnershipType,
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

    const { firstName, lastName, company, email, partnershipType, message } = validatedFields.data;

    // Add contact to Brevo CRM
    const contactPayload = {
      email,
      listIds: [15],
      updateEnabled: true,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        PARTNERSHIP_TYPE: [partnershipType],
        COMPANY: company,
        MESSAGE: message,
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
          message: contactData.message || "Failed to submit partnership inquiry",
        },
        { status: contactRes.status },
      );
    }

    console.log("Partnership contact created:", contactData);

    return NextResponse.json({
      isSuccess: true,
      message: "Your partnership inquiry has been submitted successfully! We'll review it and get back to you within 24-48 hours.",
    });
  } catch (err) {
    console.error("Partnership inquiry API error:", err);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "Server error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
