import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.email("Not a valid email"),
  password: z
    .string("Not a string")
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    ),
});

export const patientRegistrationZodSchema = z
  .object({
    name: z
      .string("Not a string")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long"),
    email: z.email("Not a valid email"),
    password: z
      .string("Not a string")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    contactNumber: z
      .string()
      .refine(
        (value) => value === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(value),
        {
          message: "Not a valid Bangladeshi phone number",
        },
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const patientEmailVerificationZodSchema = z.object({
  email: z.email("Not a valid email"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});
