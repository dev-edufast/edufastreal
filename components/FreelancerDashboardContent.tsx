import React from "react";
import { FreelancerSection } from "./FreelancerDashboardSidebar";

interface FreelancerDashboardContentProps {
  children?: React.ReactNode;
  currentSection?: FreelancerSection;
  selectedStudentId?: number | null;
  studentAction?: "view" | "edit" | null;
  onNavigateBack?: () => void;
  onViewStudent?: (id: number) => void;
  onEditStudent?: (id: number) => void;
  className?: string;
}

export function FreelancerDashboardContent({
  children,
  currentSection,
  selectedStudentId,
  studentAction,
  onNavigateBack,
  onViewStudent,
  onEditStudent,
  className = ""
}: FreelancerDashboardContentProps) {
  return (
    <main className={`freelancer-dashboard-content ${className}`}>
      {children}
    </main>
  );
}

export default FreelancerDashboardContent;
