import React from "react";

interface Step {
  label: string;
  status: "completed" | "current" | "pending";
}

interface ProgressIndicatorProps {
  title?: string;
  steps?: Step[];
  className?: string;
}

export function ProgressIndicator({ 
  title = "Progress",
  steps = [],
  className = "" 
}: ProgressIndicatorProps) {
  return (
    <div className={`progress-indicator ${className}`}>
      {title && <h4 className="progress-title">{title}</h4>}
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className={`step ${step.status}`}>
            <div className="step-marker">
              {step.status === "completed" ? "✓" : 
               step.status === "current" ? "●" : "○"}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;
