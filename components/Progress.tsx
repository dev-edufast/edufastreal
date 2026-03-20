import React from "react";

type ProgressProps = {
  value?: number;
  size?: "sm" | "md" | "lg";
};

export function Progress({ value = 0, size = "md" }: ProgressProps) {
  const height = size === "sm" ? "4px" : size === "lg" ? "12px" : "8px";
  
  return (
    <div 
      className="progress-container"
      style={{ 
        width: "100%", 
        height, 
        backgroundColor: "#e5e7eb", 
        borderRadius: "9999px",
        overflow: "hidden"
      }}
    >
      <div 
        className="progress-bar"
        style={{ 
          width: `${Math.min(100, Math.max(0, value))}%`, 
          height: "100%", 
          backgroundColor: "#3b82f6",
          borderRadius: "9999px",
          transition: "width 0.3s ease"
        }}
      />
    </div>
  );
}

export default Progress;
