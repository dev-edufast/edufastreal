import { useQuery, useMutation } from '@tanstack/react-query';

export interface VerifierStats {
  totalStudents: number;
  pendingVerifications: number;
  completedToday: number;
  rejectedThisWeek: number;
  // Additional properties used in student-verifier.tsx
  totalPendingStudents?: number;
  studentsApprovedToday?: number;
  studentsRejectedToday?: number;
  totalPendingDocuments?: number;
  documentsApprovedToday?: number;
  documentsRejectedToday?: number;
  totalDocuments?: number;
}

export interface StudentVerification {
  id: string;
  studentName: string;
  studentId: string;
  program: string;
  documents: VerificationDocument[];
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  notes?: string;
}

export interface VerificationDocument {
  id: string;
  type: 'identity' | 'education' | 'address' | 'other';
  name: string;
  url: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

const VERIFIER_STATS_QUERY_KEY = 'verifierStats';
const VERIFIER_STUDENTS_QUERY_KEY = 'verifierStudents';

// Mock data for verifier stats
const mockStats: VerifierStats = {
  totalStudents: 156,
  pendingVerifications: 23,
  completedToday: 8,
  rejectedThisWeek: 3,
};

// Mock data for student verifications
const mockStudents: StudentVerification[] = [
  {
    id: '1',
    studentName: 'John Doe',
    studentId: 'STU001',
    program: 'Bachelor of Computer Science',
    documents: [
      {
        id: 'doc1',
        type: 'identity',
        name: 'Passport.pdf',
        url: '/documents/passport.pdf',
        uploadedAt: '2024-01-15T10:30:00Z',
        status: 'pending',
      },
      {
        id: 'doc2',
        type: 'education',
        name: 'High School Certificate.pdf',
        url: '/documents/certificate.pdf',
        uploadedAt: '2024-01-15T10:35:00Z',
        status: 'pending',
      },
    ],
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    studentId: 'STU002',
    program: 'Data Science Fundamentals',
    documents: [
      {
        id: 'doc3',
        type: 'identity',
        name: 'ID Card.pdf',
        url: '/documents/id.pdf',
        uploadedAt: '2024-01-14T14:20:00Z',
        status: 'approved',
      },
    ],
    status: 'verified',
    submittedAt: '2024-01-14T14:20:00Z',
    verifiedAt: '2024-01-14T16:45:00Z',
    verifiedBy: 'Verifier Admin',
  },
];

export function useVerifierStats() {
  return useQuery({
    queryKey: [VERIFIER_STATS_QUERY_KEY],
    queryFn: async (): Promise<VerifierStats> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockStats;
    },
  });
}

export function useVerifierStudents(status?: 'pending' | 'verified' | 'rejected') {
  return useQuery({
    queryKey: [VERIFIER_STUDENTS_QUERY_KEY, status],
    queryFn: async (): Promise<StudentVerification[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      if (status) {
        return mockStudents.filter(s => s.status === status);
      }
      return mockStudents;
    },
  });
}

export function useVerifyStudent() {
  return useMutation({
    mutationFn: async ({ studentId, notes }: { studentId: string; notes?: string }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      console.log(`Verified student ${studentId}`, notes);
      return { success: true };
    },
  });
}

export function useRejectStudent() {
  return useMutation({
    mutationFn: async ({ studentId, reason }: { studentId: string; reason: string }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      console.log(`Rejected student ${studentId}: ${reason}`);
      return { success: true };
    },
  });
}

export function useRequestAdditionalDocuments() {
  return useMutation({
    mutationFn: async ({ studentId, documentTypes }: { studentId: string; documentTypes: string[] }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      console.log(`Requested additional documents from ${studentId}:`, documentTypes);
      return { success: true };
    },
  });
}
