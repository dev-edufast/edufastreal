export type Programs = {
  id: number;
  name: string;
  slug?: string | null;
  description?: string | null;
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

export default {};
