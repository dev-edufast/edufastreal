import React from "react";

interface ProgramsServiceOverviewProps {
  className?: string;
}

export function ProgramsServiceOverview({ className = "" }: ProgramsServiceOverviewProps) {
  return (
    <section className={`programs-service-overview ${className}`}>
      <div className="container">
        <h2>Our Service Overview</h2>
        <p>Comprehensive degree services tailored for working professionals</p>
      </div>
    </section>
  );
}

export default ProgramsServiceOverview;
