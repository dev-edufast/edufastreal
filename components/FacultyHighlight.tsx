import React from "react";

interface FacultyHighlightProps {
  className?: string;
}

export function FacultyHighlight({ className = "" }: FacultyHighlightProps) {
  return (
    <section className={`faculty-highlight ${className}`}>
      <div className="container">
        <h2>Our Expert Faculty</h2>
        <p>Learn from industry leaders and academic experts</p>
      </div>
    </section>
  );
}

export default FacultyHighlight;
