import { z } from "zod";

// Schema for course preview request
export const CoursePreviewRequestSchema = z.object({
  courseId: z.string(),
});

// Schema for course preview response
export const CoursePreviewResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string().optional(),
  duration: z.string(),
  modules: z.array(z.object({
    id: z.string(),
    title: z.string(),
    duration: z.string(),
    isPreview: z.boolean(),
  })),
  instructor: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
  }),
  price: z.number().optional(),
  isEnrolled: z.boolean(),
  isFree: z.boolean().optional(),
  googleDriveLink: z.string().optional(),
  error: z.string().optional(),
});

export type CoursePreviewRequest = z.infer<typeof CoursePreviewRequestSchema>;
export type CoursePreviewResponse = z.infer<typeof CoursePreviewResponseSchema>;

// Mock function to get course preview
export async function getCoursePreview(courseId: string | { courseId: number | string }): Promise<CoursePreviewResponse> {
  const id = typeof courseId === 'string' ? courseId : String(courseId.courseId);
  // Mock data - replace with actual API call
  return {
    id: id,
    title: "Introduction to Programming",
    description: "Learn the fundamentals of programming with hands-on exercises and real-world projects.",
    thumbnail: "/course-thumbnail.jpg",
    duration: "8 weeks",
    modules: [
      { id: "1", title: "Getting Started", duration: "2 hours", isPreview: true },
      { id: "2", title: "Variables and Data Types", duration: "3 hours", isPreview: false },
      { id: "3", title: "Control Flow", duration: "4 hours", isPreview: false },
    ],
    instructor: {
      name: "Dr. Sarah Johnson",
      bio: "Senior Software Engineer with 10+ years of experience",
      avatar: "/instructor-avatar.jpg",
    },
    price: 4999,
    isEnrolled: false,
  };
}
