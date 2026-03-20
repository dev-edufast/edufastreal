import React from "react";

interface ProgramsApplicationProps {
  className?: string;
}

export function ProgramsApplication({ className = "" }: ProgramsApplicationProps) {
  return (
    <section className={`programs-application ${className}`}>
      <div className="container">
        <h2>Application Process</h2>
        <p>Simple steps to start your educational journey</p>
      </div>
    </section>
  );
}

export default ProgramsApplication;
