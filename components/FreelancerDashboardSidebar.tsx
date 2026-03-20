import React from "react";

export type FreelancerSection = 
  | "home"
  | "overview" 
  | "students" 
  | "documents" 
  | "earnings" 
  | "settings";

interface FreelancerDashboardSidebarProps {
  activeSection?: FreelancerSection;
  currentSection?: FreelancerSection;
  onSectionChange?: (section: FreelancerSection) => void;
  notificationCount?: number;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function FreelancerDashboardSidebar({
  activeSection = "overview",
  currentSection,
  onSectionChange,
  notificationCount = 0,
  isOpen = true,
  onToggle,
  className = ""
}: FreelancerDashboardSidebarProps) {
  const active = currentSection || activeSection;
  const sections: { id: FreelancerSection; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "students", label: "My Students" },
    { id: "documents", label: "Documents" },
    { id: "earnings", label: "Earnings" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside className={`freelancer-sidebar ${className}`}>
      <nav className="sidebar-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`sidebar-link ${active === section.id ? "active" : ""}`}
            onClick={() => onSectionChange?.(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default FreelancerDashboardSidebar;
