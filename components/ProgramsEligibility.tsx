import React from "react";

interface ProgramsEligibilityProps {
  className?: string;
}

export function ProgramsEligibility({ className = "" }: ProgramsEligibilityProps) {
  return (
    <section className={`programs-eligibility ${className}`}>
      <div className="container">
        <h2>Eligibility Requirements</h2>
        <p>Check if you qualify for our accelerated degree programs</p>
      </div>
    </section>
  );
}

export default ProgramsEligibility;
