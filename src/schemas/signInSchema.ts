import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().trim().min(2, "User name must be at least 2 characters"),
  email: z
    .string()
    .min(2, "Email is required")
    .email("Invalid email type")
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
    ),
});
