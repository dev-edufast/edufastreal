import React from "react";

interface ProgramsSkeletonProps {
  count?: number;
  className?: string;
}

export function ProgramsSkeleton({ count = 3, className = "" }: ProgramsSkeletonProps) {
  return (
    <div className={`programs-skeleton ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-header" />
          <div className="skeleton-body" />
          <div className="skeleton-footer" />
        </div>
      ))}
    </div>
  );
}

export default ProgramsSkeleton;
