import { useQuery } from "@tanstack/react-query";

interface FacultyMember {
  id: number;
  name: string;
  title: string;
  department: string;
  bio: string;
  imageUrl: string;
  linkedinUrl?: string;
  email?: string;
  awards?: string[];
  specializations?: string[];
  qualifications?: string;
  specialization?: string;
}

// Mock function to fetch faculty data
async function fetchFaculty(): Promise<FacultyMember[]> {
  // Mock data - replace with actual API call
  return [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Professor of Computer Science",
      department: "Technology",
      bio: "Dr. Johnson has over 15 years of experience in software engineering and education.",
      imageUrl: "/faculty/sarah-johnson.jpg",
      linkedinUrl: "https://linkedin.com/in/sarahjohnson",
      email: "sarah.johnson@edufast.com",
      awards: ["Best Educator 2023", "Research Excellence Award"],
      specializations: ["Software Engineering", "AI/ML", "Cloud Computing"],
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Associate Professor of Business",
      department: "Business",
      bio: "Prof. Chen specializes in digital marketing and entrepreneurship.",
      imageUrl: "/faculty/michael-chen.jpg",
      linkedinUrl: "https://linkedin.com/in/michaelchen",
      email: "michael.chen@edufast.com",
      awards: ["Innovation in Teaching Award"],
      specializations: ["Digital Marketing", "Entrepreneurship", "E-commerce"],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Senior Lecturer in Data Science",
      department: "Data Science",
      bio: "Dr. Rodriguez is a data scientist with expertise in big data analytics.",
      imageUrl: "/faculty/emily-rodriguez.jpg",
      linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
      email: "emily.rodriguez@edufast.com",
      specializations: ["Data Analytics", "Machine Learning", "Statistics"],
    },
  ];
}

export function useFaculty() {
  return useQuery({
    queryKey: ["faculty"],
    queryFn: fetchFaculty,
  });
}

export default useFaculty;
