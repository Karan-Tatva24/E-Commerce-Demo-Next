import { z } from "zod";

export const UserUpdateOrChangePasswordSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "User name must be at least 2 characters")
      .optional(),
    phoneNumber: z
      .string()
      .regex(
        /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d-.\s]{7,10}$/,
        "Enter a valid phone number"
      )
      .optional(),
    email: z.string().email("Invalid email address").optional(),
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
      )
      .optional(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.oldPassword || data.newPassword) {
      if (!data.oldPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["oldPassword"],
          message: "Old password is required when changing the password",
        });
      }

      if (!data.newPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["newPassword"],
          message: "New password is required when changing the password",
        });
      }
    } else if (!data.username && !data.phoneNumber && !data.email) {
      ctx.addIssue({
        code: "custom",
        path: ["username"],
        message:
          "At least one field (username, phoneNumber, or email) must be provided",
      });
    }
  });
