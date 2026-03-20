import React from "react";

interface FilterChip {
  label: string;
  value: string;
  onRemove: () => void;
}

interface ActiveFilterChipsProps {
  filters: FilterChip[];
  className?: string;
}

export function ActiveFilterChips({ filters, className = "" }: ActiveFilterChipsProps) {
  if (filters.length === 0) return null;

  return (
    <div className={`active-filter-chips ${className}`} style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "#6b7280" }}>Active filters:</span>
        {filters.map((filter, index) => (
          <span
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 12px",
              backgroundColor: "#e0e7ff",
              color: "#4338ca",
              borderRadius: "16px",
              fontSize: "13px",
            }}
          >
            {filter.label}: {filter.value}
            <button
              onClick={filter.onRemove}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
                marginLeft: "4px",
                fontSize: "14px",
                color: "#4338ca",
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default ActiveFilterChips;
