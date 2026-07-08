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

export const MockInterviewCreateSchema = z.object({
  role: z
    .string()
    .min(1, { message: "Role is required." })
    .max(200, { message: "Role is too long." })
    .trim(),
  experience_level: z
    .string()
    .max(100, { message: "Experience level is too long." })
    .trim()
    .optional()
    .nullable(),
  subject: z
    .string()
    .max(200, { message: "Subject is too long." })
    .trim()
    .optional()
    .nullable(),
  num_questions: z
    .number()
    .int({ message: "Number of questions must be a whole number." })
    .min(1, { message: "At least 1 question is required." })
    .max(20, { message: "Maximum 20 questions allowed." })
    .default(5),
});
