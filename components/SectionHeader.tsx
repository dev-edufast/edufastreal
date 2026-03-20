import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  description,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`section-header ${centered ? "text-center" : ""} ${className}`}>
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
