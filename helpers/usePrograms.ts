import { useState, useEffect } from "react";

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: string;
}

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching programs
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, this would fetch from an API
        // const response = await fetch('/api/programs');
        // const data = await response.json();
        
        // Mock data for now
        const mockPrograms: Program[] = [
          {
            id: "bba",
            name: "Bachelor of Business Administration (BBA)",
            description: "Comprehensive business administration program",
            duration: "6 months",
            level: "Undergraduate"
          },
          {
            id: "bca",
            name: "Bachelor of Computer Applications (BCA)",
            description: "Computer science and applications program",
            duration: "6 months",
            level: "Undergraduate"
          },
          {
            id: "mba",
            name: "Master of Business Administration (MBA)",
            description: "Advanced business management program",
            duration: "6 months",
            level: "Postgraduate"
          },
          {
            id: "mca",
            name: "Master of Computer Applications (MCA)",
            description: "Advanced computer applications program",
            duration: "6 months",
            level: "Postgraduate"
          }
        ];
        
        setPrograms(mockPrograms);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch programs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return {
    programs,
    isLoading,
    error
  };
}

export default usePrograms;
