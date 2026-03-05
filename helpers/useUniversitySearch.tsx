import { useState, useCallback } from "react";

interface University {
  id: string;
  name: string;
  location: string;
  programs: string[];
  imageUrl?: string;
}

export function useUniversitySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    
    // Mock search - replace with actual API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock results
      const mockUniversities: University[] = [
        {
          id: "1",
          name: "Harvard University",
          location: "Cambridge, MA",
          programs: ["Business", "Law", "Medicine"],
        },
        {
          id: "2",
          name: "Stanford University",
          location: "Stanford, CA",
          programs: ["Engineering", "Computer Science", "Business"],
        },
      ].filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(mockUniversities);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    search,
  };
}
