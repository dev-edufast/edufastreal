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

export function useAdminAnalytics() {
  return useQuery({
    queryKey: ["adminAnalytics"],
    queryFn: async () => {
      return {
        totalSessions: 0,
        conversionRate: 0,
        topSources: [],
        funnel: [],
        bookingStatusDistribution: [],
        leadStatusDistribution: [
          { status: "New", count: 0 },
          { status: "Converted", count: 0 },
          { status: "Hot", count: 0 },
        ],
        registrationStatusDistribution: [
          { status: "Pending", count: 0 },
          { status: "Approved", count: 0 },
          { status: "Rejected", count: 0 },
          { status: "Completed", count: 0 },
        ],
        stats: {
          totalBookings: 0,
          totalLeads: 0,
          totalRegistrations: 0,
          totalEligibilityChecks: 0,
        },
      };
    },
  });
}

type AdminCoursesParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  status?: "Published" | "Draft" | "Archived" | string;
};

export function useAdminCourses(params: AdminCoursesParams = {}) {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "createdAt",
    sortDirection = "desc",
    status,
  } = params;

  return useQuery({
    queryKey: ["adminCourses", page, pageSize, sortBy, sortDirection, status],
    queryFn: async () => {
      return {
        page,
        pageSize,
        sortBy,
        sortDirection,
        status: status ?? null,
        total: 0,
        items: [],
      };
    },
  });
}

type AdminLeadsParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  status?: string;
  source?: string;
  priority?: string;
};

export function useAdminLeads(params: AdminLeadsParams = {}) {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "createdAt",
    sortDirection = "desc",
    status,
    source,
    priority,
  } = params;

  return useQuery({
    queryKey: ["adminLeads", page, pageSize, sortBy, sortDirection, status, source, priority],
    queryFn: async () => {
      return {
        page,
        pageSize,
        sortBy,
        sortDirection,
        status: status ?? null,
        source: source ?? null,
        priority: priority ?? null,
        total: 0,
        items: [],
        hotLeads: 0,
        newLeads: 0,
        convertedLeads: 0,
      };
    },
  });
}

type AdminProgramsParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  status?: string;
  category?: string;
  university?: string;
  deliveryMode?: string;
};

export function useAdminPrograms(params: AdminProgramsParams = {}) {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "createdAt",
    sortDirection = "desc",
    status,
    category,
    university,
    deliveryMode,
  } = params;

  return useQuery({
    queryKey: ["adminPrograms", page, pageSize, sortBy, sortDirection, status, category, university, deliveryMode],
    queryFn: async () => {
      return {
        page,
        pageSize,
        sortBy,
        sortDirection,
        status: status ?? null,
        category: category ?? null,
        university: university ?? null,
        deliveryMode: deliveryMode ?? null,
        total: 0,
        items: [],
        onlinePrograms: 0,
        offlinePrograms: 0,
        hybridPrograms: 0,
        totalUniversities: 0,
      };
    },
  });
}

type AdminUsersParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  role?: string;
  status?: string;
  search?: string;
};

export function useAdminUsers(params: AdminUsersParams = {}) {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "createdAt",
    sortDirection = "desc",
    role,
    status,
    search,
  } = params;

  return useQuery({
    queryKey: ["adminUsers", page, pageSize, sortBy, sortDirection, role, status, search],
    queryFn: async () => {
      return {
        page,
        pageSize,
        sortBy,
        sortDirection,
        role: role ?? null,
        status: status ?? null,
        search: search ?? null,
        total: 0,
        items: [],
        totalAdmins: 0,
        totalSuperAdmins: 0,
        totalCounselors: 0,
        totalStudents: 0,
      };
    },
  });
}
