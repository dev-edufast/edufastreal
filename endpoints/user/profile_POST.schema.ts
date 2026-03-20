import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

export type ProfileInput = z.infer<typeof schema>;

export type ProfileResponse = 
  | { success: true; user: { name: string; email: string; phone?: string; bio?: string } }
  | { success: false; error: string };

export async function postUserProfile(data: ProfileInput): Promise<ProfileResponse> {
  // Mock implementation
  return { success: true, user: { name: data.name, email: data.email, phone: data.phone, bio: data.bio } };
}
