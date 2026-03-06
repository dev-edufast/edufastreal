import React from "react";
import { Link } from "react-router-dom";

interface University {
  id: string;
  name: string;
  location: string;
  programs: string[];
  imageUrl?: string;
}

interface UniversityCardProps {
  university: University;
  className?: string;
}

export function UniversityCard({ university, className = "" }: UniversityCardProps) {
  return (
    <Link
      to={`/universities/${university.id}`}
      className={`university-card ${className}`}
      style={{
        display: "block",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        textDecoration: "none",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        {university.imageUrl ? (
          <img
            src={university.imageUrl}
            alt={university.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "8px",
              backgroundColor: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            🎓
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: 600, color: "#111827" }}>
            {university.name}
          </h3>
          <p style={{ margin: "0 0 8px 0", color: "#6b7280", fontSize: "14px" }}>
            📍 {university.location}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {university.programs.slice(0, 3).map((program, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "12px",
                  padding: "4px 8px",
                  backgroundColor: "#e0e7ff",
                  color: "#4338ca",
                  borderRadius: "4px",
                }}
              >
                {program}
              </span>
            ))}
            {university.programs.length > 3 && (
              <span
                style={{
                  fontSize: "12px",
                  padding: "4px 8px",
                  backgroundColor: "#f3f4f6",
                  color: "#6b7280",
                  borderRadius: "4px",
                }}
              >
                +{university.programs.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UniversityCard;
