import z from "zod";

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
