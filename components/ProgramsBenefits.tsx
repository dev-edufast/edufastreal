import React from "react";

interface ProgramsBenefitsProps {
  className?: string;
}

export function ProgramsBenefits({ className = "" }: ProgramsBenefitsProps) {
  return (
    <section className={`programs-benefits ${className}`}>
      <div className="container">
        <h2>Program Benefits</h2>
        <p>Discover the advantages of our accelerated degree programs</p>
      </div>
    </section>
  );
}

export default ProgramsBenefits;
