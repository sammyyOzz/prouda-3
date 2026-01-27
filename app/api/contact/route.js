import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/validations";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate the input fields
    const validatedFields = ContactFormSchema.safeParse({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      subject: body.subject,
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

    const { firstName, lastName, email, subject, message } = body;

    // Call Brevo API to add contact
    const payload = {
      email,
      listIds: [13],
      updateEnabled: true,
      attributes: {
        ...(firstName && { FIRSTNAME: firstName }),
        ...(lastName && { LASTNAME: lastName }),
        ...(subject && { SUBJECT: subject }),
        ...(message && { MESSAGE: message }),
      },
    };

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Brevo contact creation error:", data);
      return NextResponse.json(
        {
          isSuccess: false,
          data,
          message: data.message || "Failed to create contact",
        },
        { status: res.status },
      );
    }

    console.log("Contact created successfully:", data);

    return NextResponse.json({
      isSuccess: true,
      data,
      message: "Contact created successfully. Thank you for reaching out!",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "Server error occurred",
      },
      { status: 500 },
    );
  }
}
