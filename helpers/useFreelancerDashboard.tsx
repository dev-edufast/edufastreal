import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
interface FreelancerStudent {
  id: string | number;
  fullName: string;
  name?: string;
  email: string;
  mobileNumber?: string;
  phone?: string;
  status?: string;
  admissionStage?: string;
  lastQualification?: string;
  documents?: FreelancerDocument[];
}

interface FreelancerDocument {
  id: string | number;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}

// Mock data
const mockStudent: FreelancerStudent = {
  id: 1,
  fullName: "John Doe",
  name: "John Doe",
  email: "john@example.com",
  mobileNumber: "+1234567890",
  phone: "+1234567890",
  status: "active",
  admissionStage: "Admission Confirmed",
  lastQualification: "12th Standard",
  documents: []
};

const mockDocuments: FreelancerDocument[] = [];

// Response type for freelancer student data
interface FreelancerStudentResponse {
  student: FreelancerStudent;
  documents: FreelancerDocument[];
}

// Hook to fetch freelancer student data
export function useFreelancerStudent(studentId?: string | number) {
  return useQuery({
    queryKey: ["freelancerStudent", studentId],
    queryFn: async (): Promise<FreelancerStudentResponse | null> => {
      if (!studentId) return null;
      // Mock API call
      return { 
        student: { ...mockStudent, id: studentId },
        documents: mockDocuments
      };
    },
    enabled: !!studentId,
  });
}

// Upload document input type
interface UploadDocumentInput {
  studentId: string | number;
  documentId?: number;
  documentType: string;
  fileName: string;
  mimeType: string;
  fileData: string;
}

// Hook to upload document
export function useUploadDocument() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: UploadDocumentInput) => {
      // Mock upload
      console.log("Uploading file for student", input.studentId, input.fileName);
      return { success: true, fileName: input.fileName };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["freelancerStudent", variables.studentId] });
    },
  });
}

// Hook to delete freelancer document
export function useDeleteFreelancerDocument() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ studentId, documentId }: { studentId: string | number; documentId: string | number }) => {
      // Mock delete
      console.log("Deleting document", documentId, "for student", studentId);
      return { success: true };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["freelancerStudent", variables.studentId] });
    },
  });
}

// Additional hooks that might be needed
export function useFreelancerStudents() {
  return useQuery({
    queryKey: ["freelancerStudents"],
    queryFn: async (): Promise<FreelancerStudent[]> => {
      // Mock API call
      return [mockStudent];
    },
  });
}

export function useCreateFreelancerStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<FreelancerStudent>) => {
      // Mock create
      console.log("Creating student", data);
      return { success: true, id: Math.random().toString(36).substr(2, 9) };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["freelancerStudents"] });
    },
  });
}

export function useUpdateFreelancerStudent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ studentId, data }: { studentId: string | number; data: Partial<FreelancerStudent> }) => {
      // Mock update
      console.log("Updating student", studentId, data);
      return { success: true };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["freelancerStudent", variables.studentId] });
      queryClient.invalidateQueries({ queryKey: ["freelancerStudents"] });
    },
  });
}

// Hook for freelancer notifications
interface NotificationOptions {
  page?: number;
  pageSize?: number;
  unreadOnly?: boolean;
}

export function useFreelancerNotifications(options: NotificationOptions = {}) {
  const { page = 1, pageSize = 10, unreadOnly = false } = options;
  
  return useQuery({
    queryKey: ["freelancerNotifications", page, pageSize, unreadOnly],
    queryFn: async () => {
      // Mock notifications
      const notifications = [
        { id: 1, message: "New student registered", type: "info", read: false },
        { id: 2, message: "Document uploaded", type: "success", read: true },
      ];
      return {
        notifications: unreadOnly ? notifications.filter(n => !n.read) : notifications,
        totalCount: notifications.length,
        unreadCount: notifications.filter(n => !n.read).length,
      };
    },
  });
}

export default useFreelancerStudent;
