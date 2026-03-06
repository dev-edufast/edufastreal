import { useQuery } from '@tanstack/react-query';

export interface Program {
  id: string;
  title: string;
  name?: string;
  progress: number;
  totalModules?: number;
  completedModules?: number;
  status?: 'active' | 'completed' | 'on-hold';
  thumbnailUrl?: string;
  category?: string;
  registrationStatus?: 'Enrolled' | 'Pending' | 'Completed';
}

export interface Announcement {
  id: string;
  title: string;
  content?: string;
  date: string;
  isRead?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
}

export interface Deadline {
  id: string;
  title: string;
  dueDate: string;
  type?: 'assignment' | 'exam' | 'project' | 'quiz';
  courseName?: string;
  programTitle?: string;
  isCompleted?: boolean;
}

const STUDENT_PROGRAMS_QUERY_KEY = 'studentPrograms';
const STUDENT_ANNOUNCEMENTS_QUERY_KEY = 'studentAnnouncements';
const STUDENT_DEADLINES_QUERY_KEY = 'studentDeadlines';

// Mock data for student programs
const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Bachelor of Computer Science',
    name: 'Bachelor of Computer Science',
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    status: 'active',
    thumbnailUrl: '/images/cs-program.jpg',
    category: 'Technology',
    registrationStatus: 'Enrolled',
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    name: 'Data Science Fundamentals',
    progress: 30,
    totalModules: 8,
    completedModules: 2,
    status: 'active',
    category: 'Data Science',
    registrationStatus: 'Enrolled',
  },
];

// Mock data for announcements
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'New Course Materials Available',
    content: 'Updated materials for Module 3 are now available in the resource center.',
    date: new Date().toISOString(),
    isRead: false,
    priority: 'medium',
  },
  {
    id: '2',
    title: 'System Maintenance Notice',
    content: 'The platform will be under maintenance on Sunday from 2-4 AM.',
    date: new Date(Date.now() - 86400000).toISOString(),
    isRead: true,
    priority: 'high',
  },
];

// Mock data for deadlines
const mockDeadlines: Deadline[] = [
  {
    id: '1',
    title: 'Assignment 2: Database Design',
    dueDate: new Date(Date.now() + 172800000).toISOString(),
    type: 'assignment',
    courseName: 'Database Management',
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Mid-term Examination',
    dueDate: new Date(Date.now() + 604800000).toISOString(),
    type: 'exam',
    courseName: 'Computer Networks',
    isCompleted: false,
  },
];

export function useStudentPrograms() {
  return useQuery({
    queryKey: [STUDENT_PROGRAMS_QUERY_KEY],
    queryFn: async (): Promise<Program[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPrograms;
    },
  });
}

export function useStudentAnnouncements() {
  return useQuery({
    queryKey: [STUDENT_ANNOUNCEMENTS_QUERY_KEY],
    queryFn: async (): Promise<Announcement[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockAnnouncements;
    },
  });
}

export function useStudentDeadlines() {
  return useQuery({
    queryKey: [STUDENT_DEADLINES_QUERY_KEY],
    queryFn: async (): Promise<Deadline[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockDeadlines;
    },
  });
}

export function useMarkAnnouncementRead() {
  return {
    mutate: async (announcementId: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log(`Marked announcement ${announcementId} as read`);
    },
    isPending: false,
  };
}
