import { useQuery } from "@tanstack/react-query";

interface ELearningCourse {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  price: number;
  thumbnailUrl: string | null;
  durationHours: number;
  level: string | null;
  instructorName: string | null;
  learningObjectives: string[] | null;
  isFree: boolean;
}

// Mock function to fetch e-learning courses
async function fetchELearningCourses(): Promise<ELearningCourse[]> {
  // Mock data - replace with actual API call
  return [
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the fundamentals of programming with hands-on exercises",
      category: "Technology",
      price: 4999,
      thumbnailUrl: "/course-1.jpg",
      durationHours: 20,
      level: "beginner",
      instructorName: "Dr. Sarah Johnson",
      learningObjectives: ["Understand basic programming concepts", "Write simple programs", "Debug code"],
      isFree: false,
    },
    {
      id: 2,
      title: "Web Development Basics",
      description: "HTML, CSS, and JavaScript fundamentals for beginners",
      category: "Technology",
      price: 0,
      thumbnailUrl: "/course-2.jpg",
      durationHours: 15,
      level: "beginner",
      instructorName: "John Smith",
      learningObjectives: ["Build responsive websites", "Understand CSS layouts", "JavaScript basics"],
      isFree: true,
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Introduction to data analysis and visualization",
      category: "Data Science",
      price: 6999,
      thumbnailUrl: "/course-3.jpg",
      durationHours: 30,
      level: "intermediate",
      instructorName: "Dr. Emily Chen",
      learningObjectives: ["Analyze datasets", "Create visualizations", "Statistical analysis"],
      isFree: false,
    },
  ];
}

export function useELearningCourses() {
  return useQuery({
    queryKey: ["eLearningCourses"],
    queryFn: fetchELearningCourses,
  });
}

export default useELearningCourses;
