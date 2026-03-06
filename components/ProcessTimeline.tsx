import React from "react";

interface ProcessTimelineProps {
  className?: string;
}

export function ProcessTimeline({ className = "" }: ProcessTimelineProps) {
  const steps = [
    { number: 1, title: "Apply Online", description: "Fill out our simple application form" },
    { number: 2, title: "Document Verification", description: "Upload your documents for verification" },
    { number: 3, title: "Get Admission", description: "Receive your admission confirmation" },
    { number: 4, title: "Start Learning", description: "Begin your educational journey" },
  ];

  return (
    <section className={`process-timeline ${className}`}>
      <div className="container">
        <div className="timeline">
          {steps.map((step) => (
            <div key={step.number} className="timeline-step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessTimeline;
