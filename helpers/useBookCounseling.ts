import { useState, useCallback } from "react";

interface CounselingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  agreeToTerms: boolean;
}

interface UseBookCounselingReturn {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  submitForm: (data: CounselingFormData) => Promise<void>;
  resetForm: () => void;
}

export function useBookCounseling(): UseBookCounselingReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = useCallback(async (data: CounselingFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real implementation, this would make an API call
      // const response = await fetch('/api/book-counseling', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to book counseling session');
      // }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const resetForm = useCallback(() => {
    setIsSuccess(false);
    setError(null);
  }, []);

  return {
    isSubmitting,
    isSuccess,
    error,
    submitForm,
    resetForm,
  };
}

export default useBookCounseling;
