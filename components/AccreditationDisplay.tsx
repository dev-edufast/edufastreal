import React from "react";

interface AccreditationDisplayProps {
  className?: string;
}

export function AccreditationDisplay({ className = "" }: AccreditationDisplayProps) {
  return (
    <section className={`accreditation-display ${className}`}>
      <div className="container">
        <h2>Accredited & Recognized</h2>
        <p>Our programs are recognized by leading educational bodies and industry organizations.</p>
      </div>
    </section>
  );
}

export default AccreditationDisplay;
