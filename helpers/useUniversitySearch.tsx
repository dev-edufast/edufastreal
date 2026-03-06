import { useState, useCallback } from "react";

interface University {
  id: string;
  name: string;
  location: string;
  programs: string[];
  imageUrl?: string;
  isFeatured?: boolean;
}

interface CourseDetail {
  id: string;
  name: string;
  description: string;
  duration: string;
  mode: string;
  fees: string;
  university: string;
  eligibility: string[];
  careerProspects: string[];
  syllabus: string[];
}

export function useUniversitiesList() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUniversities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock universities list
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
        {
          id: "3",
          name: "MIT",
          location: "Cambridge, MA",
          programs: ["Technology", "Science", "Engineering"],
        },
        {
          id: "4",
          name: "Edufast University",
          location: "New Delhi, India",
          programs: ["B.Tech", "MBA", "BCA", "MCA", "BBA"],
        },
      ];
      
      setUniversities(mockUniversities);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch universities"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-fetch on mount
  useState(() => {
    fetchUniversities();
  });

  return {
    universities,
    isLoading,
    error,
    refetch: fetchUniversities
  };
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

interface CourseDetailData {
  courseName: string;
  courseAbbreviation?: string;
  category: string;
  description: string;
  durationMonths: number;
  deliveryMode: string;
  feeAmount?: string;
  scholarshipAvailable: boolean;
  eligibility?: string;
  careerOutcomes?: string[];
  specializations?: string[];
  slug: string;
}

interface UniversityData {
  name: string;
  slug: string;
}

interface RelatedCourse {
  id: string;
  courseName: string;
  slug: string;
  category: string;
  durationMonths: number;
}

interface CourseDetailResponse {
  course: CourseDetailData;
  university: UniversityData;
  relatedCourses: RelatedCourse[];
}

export function useCourseDetail(courseSlug: string) {
  const [data, setData] = useState<CourseDetailResponse | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Mock course data fetch
  const fetchCourse = useCallback(async () => {
    if (!courseSlug) return;
    
    setIsFetching(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock course data matching the expected structure
      const mockData: CourseDetailResponse = {
        course: {
          courseName: "B.Tech Computer Science",
          courseAbbreviation: "B.Tech CS",
          category: "Engineering",
          description: "A comprehensive program covering software engineering, algorithms, data structures, and modern computing technologies. Perfect for aspiring software developers and tech professionals.",
          durationMonths: 6,
          deliveryMode: "Online & Distance Learning",
          feeAmount: "₹1,50,000",
          scholarshipAvailable: true,
          eligibility: "10+2 with Mathematics and minimum 50% aggregate",
          careerOutcomes: [
            "Software Developer",
            "Data Analyst",
            "System Architect",
            "Technical Lead"
          ],
          specializations: [
            "Artificial Intelligence",
            "Cloud Computing",
            "Cyber Security"
          ],
          slug: courseSlug
        },
        university: {
          name: "Edufast University",
          slug: "edufast-university"
        },
        relatedCourses: [
          {
            id: "1",
            courseName: "B.Tech Information Technology",
            slug: "btech-it",
            category: "Engineering",
            durationMonths: 6
          },
          {
            id: "2",
            courseName: "BCA Computer Applications",
            slug: "bca",
            category: "Computer Applications",
            durationMonths: 6
          }
        ]
      };
      
      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch course details"));
    } finally {
      setIsFetching(false);
    }
  }, [courseSlug]);

  // Auto-fetch when slug changes
  useState(() => {
    fetchCourse();
  });

  return {
    data,
    isFetching,
    error
  };
}

// University detail hook for university detail page
interface Course {
  id: string;
  name: string;
  duration: string;
  fees: string;
  description?: string;
}

interface UniversityDetail {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  established: string;
  establishedYear?: string;
  accreditation: string[];
  programs: string[];
  facilities: string[];
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  stats: {
    students: string;
    faculty: string;
    placementRate: string;
  };
  // Additional properties used by the university detail page
  shortName?: string;
  coverImageUrl?: string;
  logoUrl?: string;
  universityType?: string;
  naacGrade?: string;
  isFeatured?: boolean;
  highlights?: string[];
  approvalBody?: string;
  accreditationDetails?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  courses?: Course[];
}

interface UniversityDetailResponse {
  university: UniversityDetail;
  relatedUniversities: University[];
  courses?: Course[];
}

export function useUniversityDetail(universitySlug: string) {
  const [data, setData] = useState<UniversityDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUniversity = useCallback(async () => {
    if (!universitySlug) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock university data
      const mockData: UniversityDetailResponse = {
        university: {
          id: universitySlug,
          slug: universitySlug,
          name: "Edufast University",
          location: "New Delhi, India",
          description: "A premier institution offering quality education through distance learning and online programs. Known for its industry-relevant curriculum and excellent placement support.",
          established: "1995",
          accreditation: ["UGC", "AICTE", "NAAC A+"],
          programs: ["B.Tech", "MBA", "BCA", "MCA", "BBA"],
          facilities: ["Digital Library", "Online Labs", "Career Center", "Virtual Campus"],
          contact: {
            email: "info@edufast.edu",
            phone: "+91-11-1234-5678",
            website: "https://edufast.edu"
          },
          stats: {
            students: "50,000+",
            faculty: "500+",
            placementRate: "95%"
          }
        },
        relatedUniversities: [
          {
            id: "2",
            name: "Global Tech University",
            location: "Bangalore, India",
            programs: ["Engineering", "Technology", "Management"]
          },
          {
            id: "3",
            name: "National Business School",
            location: "Mumbai, India",
            programs: ["Business", "Finance", "Marketing"]
          }
        ]
      };
      
      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch university details"));
    } finally {
      setIsLoading(false);
    }
  }, [universitySlug]);

  // Auto-fetch when slug changes
  useState(() => {
    fetchUniversity();
  });

  return {
    data,
    isLoading,
    isFetching: isLoading,
    error,
    refetch: fetchUniversity
  };
}
