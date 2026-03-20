import { z } from "zod";

export const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM", 
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM"
] as const;

export const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  preferredDate: z.date(),
  preferredTimeSlot: z.enum(TIME_SLOTS),
  degreeCategory: z.string().min(1, "Please select a degree category"),
  program: z.string().min(1, "Please select a program"),
  notes: z.string().optional(),
});

export type VideoVerificationInput = z.infer<typeof schema>;
