import React from "react";

interface TimelineStep {
  label: string;
  description?: string;
  duration?: string;
}

interface InteractiveTimelineProps {
  steps?: TimelineStep[];
  className?: string;
}

export function InteractiveTimeline({ 
  steps = [],
  className = "" 
}: InteractiveTimelineProps) {
  const defaultSteps: TimelineStep[] = [
    { label: "Application", description: "Submit your application", duration: "Week 1" },
    { label: "Enrollment", description: "Complete enrollment", duration: "Week 2" },
    { label: "Learning", description: "Start your courses", duration: "Weeks 3-20" },
    { label: "Graduation", description: "Complete your degree", duration: "Week 24" },
  ];

  const displaySteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <div className={`interactive-timeline ${className}`}>
      {displaySteps.map((step, index) => (
        <div key={index} className="timeline-step">
          <div className="step-number">{index + 1}</div>
          <div className="step-content">
            <h4>{step.label}</h4>
            {step.description && <p>{step.description}</p>}
            {step.duration && <span className="duration">{step.duration}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default InteractiveTimeline;
