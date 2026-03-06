import React from "react";
import { Link } from "react-router-dom";

interface RelatedCourse {
  id: string;
  courseName?: string;
  name?: string;
  slug?: string;
  category?: string;
  durationMonths?: number;
  duration?: string;
  fees?: string;
  description?: string;
}

interface CourseCardProps {
  course: RelatedCourse;
  universityName: string;
  universitySlug: string;
  className?: string;
}

export function CourseCard({
  course,
  universityName,
  universitySlug,
  className = ""
}: CourseCardProps) {
  const courseName = course.courseName || course.name || "Untitled Course";
  const courseSlug = course.slug || course.id;
  const category = course.category || "General";
  const duration = course.durationMonths 
    ? `⏱️ ${course.durationMonths} Months` 
    : course.duration 
      ? `⏱️ ${course.duration}` 
      : "⏱️ Duration not specified";

  return (
    <Link 
      to={`/courses/${courseSlug}`}
      className={`course-card ${className}`}
      style={{
        display: "block",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
        textDecoration: "none",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
      }}
    >
      <span 
        style={{ 
          display: "inline-block",
          fontSize: "12px", 
          color: "#2563eb", 
          fontWeight: 500,
          marginBottom: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}
      >
        {category}
      </span>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 600, color: "#111827" }}>
        {courseName}
      </h3>
      <p style={{ margin: "0 0 8px 0", color: "#6b7280", fontSize: "13px" }}>
        {universityName}
      </p>
      <span style={{ fontSize: "13px", color: "#059669", fontWeight: 500 }}>
        {duration}
      </span>
      {course.fees && (
        <p style={{ margin: "8px 0 0 0", color: "#6b7280", fontSize: "13px" }}>
          💰 {course.fees}
        </p>
      )}
    </Link>
  );
}

export default CourseCard;
