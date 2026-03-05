import { z } from "zod";
import superjson from 'superjson';

export const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  course: z.string().min(1, "Course is required."),
  branch: z.string().min(1, "Branch is required."),
  previousUniversity: z.string().min(2, "Previous university is required."),
  papersPassed: z.preprocess(
    (val) => {
      // Handle string inputs
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') {
          return undefined; // Will fail validation with required_error
        }
        const num = Number(trimmed);
        return isNaN(num) ? undefined : num;
      }
      // Handle number inputs directly
      if (typeof val === 'number') {
        return val;
      }
      // Otherwise return undefined to fail validation
      return undefined;
    },
    z.number({ required_error: "Number of papers passed is required." }).int("Please enter a whole number.").positive("Please enter a valid number.")
  ),
  comments: z.string().optional(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = {
  success: boolean;
  message: string;
  submissionId: number;
};

export const postEligibility = async (body: InputType, init?: RequestInit): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch(`/_api/eligibility`, {
    method: "POST",
    body: superjson.stringify(validatedInput),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!result.ok) {
    const errorObject = superjson.parse(await result.text());
    throw new Error(typeof errorObject === 'object' && errorObject !== null && 'error' in errorObject ? String(errorObject.error) : 'Unknown error');
  }
  return superjson.parse<OutputType>(await result.text());
};