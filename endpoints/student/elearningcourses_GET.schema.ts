import { z } from "zod";

// Schema for individual student e-learning course
export const StudentElearningCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional(),
  progress: z.number(), // 0-100
  progressPercentage: z.number().optional(), // 0-100
  totalModules: z.number(),
  completedModules: z.number(),
  lastAccessed: z.string().optional(),
  certificateAvailable: z.boolean(),
  googleDriveLink: z.string().optional(),
  status: z.string().optional(), // e.g., "in-progress", "completed"
});

export type StudentElearningCourse = z.infer<typeof StudentElearningCourseSchema>;

// Schema for student e-learning courses response (array of courses)
export const StudentElearningCoursesResponseSchema = z.array(StudentElearningCourseSchema);

export type StudentElearningCoursesResponse = z.infer<typeof StudentElearningCoursesResponseSchema>;

// Mock function to get student e-learning courses
export async function getStudentElearningCourses(): Promise<StudentElearningCourse[]> {
  // Mock data - replace with actual API call
  return [
    {
      id: "1",
      title: "Introduction to Programming",
      description: "Learn the fundamentals of programming",
      thumbnail: "/course-1.jpg",
      progress: 75,
      progressPercentage: 75,
      totalModules: 8,
      completedModules: 6,
      lastAccessed: "2024-01-15T10:30:00Z",
      certificateAvailable: false,
      googleDriveLink: "https://drive.google.com/mock-link-1",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Web Development Basics",
      description: "HTML, CSS, and JavaScript fundamentals",
      thumbnail: "/course-2.jpg",
      progress: 100,
      progressPercentage: 100,
      totalModules: 10,
      completedModules: 10,
      lastAccessed: "2024-01-10T14:20:00Z",
      certificateAvailable: true,
      googleDriveLink: "https://drive.google.com/mock-link-2",
      status: "completed",
    },
  ];
}
