import { useQuery } from "@tanstack/react-query";

interface AdminData {
  users: any[];
  registrations: any[];
  stats: {
    totalUsers: number;
    totalRegistrations: number;
    pendingApprovals: number;
  };
}

export function useAdminData() {
  return useQuery<AdminData>({
    queryKey: ["adminData"],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return {
        users: [],
        registrations: [],
        stats: {
          totalUsers: 0,
          totalRegistrations: 0,
          pendingApprovals: 0,
        },
      };
    },
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      return {
        totalUsers: 0,
        totalRegistrations: 0,
        pendingApprovals: 0,
        revenue: 0,
      };
    },
  });
}
