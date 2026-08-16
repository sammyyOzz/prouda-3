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

export const CVProfileSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: "Full name is required." })
    .max(200, { message: "Full name is too long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  phone: z
    .string()
    .min(1, { message: "Phone number is required." })
    .max(50, { message: "Phone number is too long." })
    .trim(),
  city: z
    .string()
    .min(1, { message: "City is required." })
    .max(200, { message: "City is too long." })
    .trim(),
  linkedin: z
    .string()
    .max(300, { message: "LinkedIn URL is too long." })
    .trim()
    .optional()
    .nullable(),
  professional_summary_input: z
    .string()
    .max(1000, { message: "Keep this under 1000 characters." })
    .trim()
    .optional()
    .nullable(),
  work_experience: z
    .string()
    .min(1, { message: "Work experience is required." })
    .max(8000, { message: "Work experience is too long." }),
  education: z
    .string()
    .min(1, { message: "Education is required." })
    .max(4000, { message: "Education is too long." }),
  certifications: z
    .string()
    .max(2000, { message: "Certifications are too long." })
    .trim()
    .optional()
    .nullable(),
  skills: z
    .string()
    .min(1, { message: "Skills are required." })
    .max(2000, { message: "Skills are too long." }),
});

export const CVGenerateSchema = z
  .object({
    profile: CVProfileSchema,
    job_description: z
      .string()
      .max(8000, { message: "Job description is too long." })
      .trim()
      .optional()
      .nullable(),
    generate_cover_letter: z.boolean().default(false),
  })
  .refine(
    (data) => !data.generate_cover_letter || (data.job_description && data.job_description.trim().length > 0),
    {
      message: "A job description is required to generate a cover letter.",
      path: ["job_description"],
    }
  );

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
