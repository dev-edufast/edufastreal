import { useState, useCallback, useMemo } from "react";

interface University {
  id: string;
  name: string;
  location: string;
  programs: string[];
  imageUrl?: string;
  isFeatured?: boolean;
}

interface FilterState {
  searchQuery: string;
  selectedLocation: string;
  selectedProgram: string;
}

export function useUniversitiesFilter(universities: University[]) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedLocation: "",
    selectedProgram: "",
  });

  const setSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const setSelectedLocation = useCallback((location: string) => {
    setFilters(prev => ({ ...prev, selectedLocation: location }));
  }, []);

  const setSelectedProgram = useCallback((program: string) => {
    setFilters(prev => ({ ...prev, selectedProgram: program }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      selectedLocation: "",
      selectedProgram: "",
    });
  }, []);

  const filteredUniversities = useMemo(() => {
    return universities.filter(university => {
      const matchesSearch = !filters.searchQuery || 
        university.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        university.location.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      const matchesLocation = !filters.selectedLocation || 
        university.location === filters.selectedLocation;
      
      const matchesProgram = !filters.selectedProgram || 
        university.programs.includes(filters.selectedProgram);

      return matchesSearch && matchesLocation && matchesProgram;
    });
  }, [universities, filters]);

  // Extract unique locations and programs for filter options
  const locations = useMemo(() => {
    return [...new Set(universities.map(u => u.location))];
  }, [universities]);

  const programs = useMemo(() => {
    const allPrograms = universities.flatMap(u => u.programs);
    return [...new Set(allPrograms)];
  }, [universities]);

  return {
    filters,
    setSearchQuery,
    setSelectedLocation,
    setSelectedProgram,
    clearFilters,
    filteredUniversities,
    locations,
    programs,
  };
}
