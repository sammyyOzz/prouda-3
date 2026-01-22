import { NextResponse } from 'next/server';
import { ContactFormSchema } from "@/validations";

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate the input fields
    const validatedFields = ContactFormSchema.safeParse({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          isSuccess: false,
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Validation failed"
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, subject, message } = body;

    // Call Brevo API to add contact
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
        },
        listIds: [7], // ID of the lists to add the contact to
        updateEnabled: true // Set to true to update if the contact exists
      }),
    });

    const data = await res.json();

    console.log("create contact data", data);

    if (!res.ok) {
      return NextResponse.json(
        {
          isSuccess: false,
          data,
          message: data.message || "Failed to create contact"
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      isSuccess: true,
      data,
      message: "Contact created successfully"
    });

  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      {
        isSuccess: false,
        message: "Server error occurred"
      },
      { status: 500 }
    );
  }
}
