export type Programs = {
  id: number;
  name: string;
  title?: string;
  slug?: string | null;
  description?: string | null;
  category?: string | null;
  eligibility?: string | null;
  careerOutcomes?: string[] | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

export type Testimonials = {
  id: number;
  name?: string | null;
  quote?: string | null;
  role?: string | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

export type Leads = {
  id: number;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  message?: string | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

// Course level enum type
export type CourseLevel = "beginner" | "intermediate" | "advanced" | "all";

// Degree category type
export type DegreeCategory = "Undergraduate" | "Postgraduate" | "Diploma" | "Certificate" | "Professional";

// Degree category array values for select options
export const DegreeCategoryArrayValues = [
  "Undergraduate",
  "Postgraduate", 
  "Diploma",
  "Certificate",
  "Professional"
] as const;

export default {};
