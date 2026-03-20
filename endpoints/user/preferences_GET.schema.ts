import { z } from 'zod';

export const UserPreferencesSchema = z.object({
  emailNotifications: z.object({
    announcements: z.boolean().default(true),
    deadlines: z.boolean().default(true),
    grades: z.boolean().default(true),
  }),
  smsNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(true),
  language: z.string().default('en'),
  timezone: z.string().default('UTC'),
  privacy: z.object({
    showProfilePublicly: z.boolean().default(false),
  }),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

export type PreferencesResponse = 
  | { success: true; preferences: UserPreferences }
  | { success: false; error: string };

export async function getUserPreferences(): Promise<PreferencesResponse> {
  // Mock implementation
  return {
    success: true,
    preferences: {
      emailNotifications: {
        announcements: true,
        deadlines: true,
        grades: true,
      },
      smsNotifications: false,
      marketingEmails: true,
      language: 'en',
      timezone: 'UTC',
      privacy: {
        showProfilePublicly: false,
      },
    },
  };
}
