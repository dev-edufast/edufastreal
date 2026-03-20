import { useState, useCallback } from "react";
import { VideoVerificationInput } from "../endpoints/video-verification_POST.schema";

interface UseVideoVerificationReturn {
  mutate: (data: VideoVerificationInput, options?: { onSuccess?: () => void; onError?: (error: Error) => void }) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
  reset: () => void;
}

export function useVideoVerification(): UseVideoVerificationReturn {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback((data: VideoVerificationInput, options?: { onSuccess?: () => void; onError?: (error: Error) => void }) => {
    setIsPending(true);
    setError(null);
    setIsSuccess(false);

    // Simulate API call
    setTimeout(async () => {
      try {
        // Mock success
        console.log("Video verification scheduled:", data);
        setIsSuccess(true);
        setIsPending(false);
        options?.onSuccess?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to schedule video verification");
        setError(error);
        setIsPending(false);
        options?.onError?.(error);
      }
    }, 1500);
  }, []);

  const reset = useCallback(() => {
    setIsPending(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  return {
    mutate,
    isPending,
    isSuccess,
    error,
    reset
  };
}

export default useVideoVerification;
