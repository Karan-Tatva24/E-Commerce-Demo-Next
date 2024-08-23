import { z } from "zod";

export const ShippingDetailsSchema = z.object({
  shippingName: z
    .string()
    .trim()
    .min(2, "User name must be at least 2 characters"),
  shippingAddress: z
    .string()
    .trim()
    .min(10, "Shipping address must be at least 2 characters"),
  billingName: z
    .string()
    .trim()
    .min(2, "Billing name must be at least 2 characters"),
  billingAddress: z
    .string()
    .trim()
    .min(10, "Billing address must be at least 2 characters"),
  paymentMethod: z.string().trim().min(2, "Payment method is required"),
});
