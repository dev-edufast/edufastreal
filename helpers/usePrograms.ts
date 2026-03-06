import { useState, useEffect } from "react";

export interface Program {
  id: string;
  title: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  category?: string;
  eligibility?: string;
  careerOutcomes?: string[];
}

export function usePrograms() {
  const [data, setData] = useState<Program[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching programs
    const fetchPrograms = async () => {
      try {
        setIsFetching(true);
        // In a real implementation, this would fetch from an API
        // const response = await fetch('/api/programs');
        // const data = await response.json();
        
        // Mock data for now
        const mockPrograms: Program[] = [
          {
            id: "bba",
            title: "Bachelor of Business Administration (BBA)",
            name: "Bachelor of Business Administration (BBA)",
            description: "Comprehensive business administration program",
            duration: "6 months",
            level: "Undergraduate",
            category: "Undergraduate",
            eligibility: "High school diploma or equivalent",
            careerOutcomes: ["Business Manager", "Marketing Executive", "Operations Manager"]
          },
          {
            id: "bca",
            title: "Bachelor of Computer Applications (BCA)",
            name: "Bachelor of Computer Applications (BCA)",
            description: "Computer science and applications program",
            duration: "6 months",
            level: "Undergraduate",
            category: "Undergraduate",
            eligibility: "High school diploma with Mathematics",
            careerOutcomes: ["Software Developer", "System Analyst", "Web Developer"]
          },
          {
            id: "mba",
            title: "Master of Business Administration (MBA)",
            name: "Master of Business Administration (MBA)",
            description: "Advanced business management program",
            duration: "6 months",
            level: "Postgraduate",
            category: "Postgraduate",
            eligibility: "Bachelor's degree in any discipline",
            careerOutcomes: ["Senior Manager", "Business Consultant", "CEO"]
          },
          {
            id: "mca",
            title: "Master of Computer Applications (MCA)",
            name: "Master of Computer Applications (MCA)",
            description: "Advanced computer applications program",
            duration: "6 months",
            level: "Postgraduate",
            category: "Postgraduate",
            eligibility: "Bachelor's degree in Computer Science or related field",
            careerOutcomes: ["Senior Software Engineer", "Technical Architect", "IT Director"]
          }
        ];
        
        setData(mockPrograms);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch programs");
      } finally {
        setIsFetching(false);
      }
    };

    fetchPrograms();
  }, []);

  return {
    data,
    isFetching,
    error
  };
}

export default usePrograms;
