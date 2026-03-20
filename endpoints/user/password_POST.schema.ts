import { z } from 'zod';

export const schema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type PasswordInput = z.infer<typeof schema>;

export type PasswordResponse = 
  | { success: true; message: string }
  | { success: false; error: string };

export async function postUserPassword(data: PasswordInput): Promise<PasswordResponse> {
  // Mock implementation
  return { success: true, message: 'Password updated successfully' };
}
