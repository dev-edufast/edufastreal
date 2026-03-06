import { useState, useCallback } from "react";

interface CounselingFormData {
  fullName: string;
  email: string;
  phone: string;
  interestedProgram?: string;
  preferredDate: string;
  preferredTime: string;
  topics: string[];
  additionalInfo?: string;
}

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseBookCounselingReturn {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  mutate: (data: CounselingFormData, options?: MutationOptions) => void;
  reset: () => void;
}

export function useBookCounseling(): UseBookCounselingReturn {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback((data: CounselingFormData, options?: MutationOptions) => {
    const submit = async () => {
      setIsPending(true);
      setIsError(false);
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
        options?.onSuccess?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error("An error occurred");
        setIsError(true);
        setError(error);
        options?.onError?.(error);
      } finally {
        setIsPending(false);
      }
    };

    submit();
  }, []);

  const reset = useCallback(() => {
    setIsSuccess(false);
    setIsError(false);
    setError(null);
  }, []);

  return {
    isPending,
    isSuccess,
    isError,
    error,
    mutate,
    reset,
  };
}

export default useBookCounseling;
