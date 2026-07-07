import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .max(100, { message: "First name is too long." })
    .trim(),
  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .max(100, { message: "Last name is too long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, { message: "Password is too long." }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }),
});

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
  subject: z
    .string()
    .min(1, { message: "Subject cannot be empty." })
    .trim(),
  message: z
    .string()
    .regex(/[a-zA-Z]/, { message: "Your message cannot be empty." })
    .trim(),
});
