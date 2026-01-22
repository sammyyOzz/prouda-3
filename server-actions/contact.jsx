"use server";

import { ContactFormSchema } from "@/validations";

export async function createContact(formData) {
  const validatedFields = ContactFormSchema.safeParse({
    firstName: formData.get("name"),
    email: formData.get("email"),
    // message: formData.get('message'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const name = formData.get("name");
  const email = formData.get("email");

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        email,
        attributes: {
          FULL_NAME: name,
        },
        listIds: [7], // ID of the lists to add the contact to
        updateEnabled: true // Set to true to update if the contact exists
      }),
    });

    const data = await res.json();

    console.log("create contact data", data)

    return { isSuccess: true, data, message: "create contact success" };

  } catch (err) {
    return { isSuccess: false, data: err, message: "server error" };
  }
}
