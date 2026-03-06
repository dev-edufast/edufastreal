import React from "react";

interface UniversitiesFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedProgram: string;
  onProgramChange: (program: string) => void;
  locations: string[];
  programs: string[];
  className?: string;
}

export function UniversitiesFilterBar({
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedProgram,
  onProgramChange,
  locations,
  programs,
  className = "",
}: UniversitiesFilterBarProps) {
  return (
    <div className={`universities-filter-bar ${className}`} style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search universities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
            minWidth: "250px",
          }}
        />
        
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: "#fff",
          }}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <select
          value={selectedProgram}
          onChange={(e) => onProgramChange(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: "#fff",
          }}
        >
          <option value="">All Programs</option>
          {programs.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UniversitiesFilterBar;
