import { useEffect, useState } from "react";

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  author?: string;
  reviewBody?: string;
  ratingValue?: number;
};

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadTestimonials() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/_api/testimonials");
        if (!response.ok) {
          throw new Error("Failed to load testimonials");
        }
        const data = (await response.json()) as Testimonial[];
        if (mounted) {
          setTestimonials(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setTestimonials([]);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadTestimonials();

    return () => {
      mounted = false;
    };
  }, []);

  return { data: testimonials, testimonials, isLoading, isFetching: isLoading, error };
}

export default useTestimonials;
