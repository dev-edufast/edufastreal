import { z } from 'zod';

export const schema = z.object({
  format: z.enum(['json', 'csv', 'pdf']).default('json'),
  includePreferences: z.boolean().default(true),
  includeProfile: z.boolean().default(true),
  includeActivity: z.boolean().default(false),
});

export type ExportDataInput = z.infer<typeof schema>;

export type ExportDataResponse = Blob;

export async function postExportData(data: ExportDataInput): Promise<ExportDataResponse> {
  // Mock implementation - return a Blob with JSON data
  const mockData = {
    profile: { name: 'John Doe', email: 'john@example.com' },
    preferences: { theme: 'light', language: 'en' },
    exportedAt: new Date().toISOString(),
  };
  return new Blob([JSON.stringify(mockData, null, 2)], { type: 'application/json' });
}
