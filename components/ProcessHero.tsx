import React from "react";

interface ProcessHeroProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ProcessHero({
  title = "How It Works",
  subtitle = "Your journey to a degree in 4 simple steps",
  className = ""
}: ProcessHeroProps) {
  return (
    <section className={`process-hero ${className}`}>
      <div className="container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

export default ProcessHero;
