import { z } from "zod";

export const ContactFormSchema = z.object({
  firstName: z
    .string()
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .trim(),
  lastName: z
    .string()
    .regex(/[a-zA-Z]/, { message: "Must contain at least one letter." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  // message: z
  //   .string()
  //   .regex(/[a-zA-Z]/, { message: "Your message cannot be empty." })
  //   .trim(),
});
