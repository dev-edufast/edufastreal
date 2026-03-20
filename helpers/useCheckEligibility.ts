import { useState, useCallback } from "react";

interface EligibilityFormData {
  fullName?: string;
  email?: string;
  phone?: string;
  educationLevel?: string;
  workExperience?: string;
  preferredProgram?: string;
  additionalInfo?: string;
}

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseCheckEligibilityReturn {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  mutate: (data: EligibilityFormData, options?: MutationOptions) => void;
  reset: () => void;
}

export function useCheckEligibility(): UseCheckEligibilityReturn {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback((data: EligibilityFormData, options?: MutationOptions) => {
    const submit = async () => {
      setIsPending(true);
      setIsError(false);
      setError(null);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // In a real implementation, this would make an API call
        // const response = await fetch('/api/check-eligibility', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data),
        // });
        
        // if (!response.ok) {
        //   throw new Error('Failed to check eligibility');
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

export default useCheckEligibility;
