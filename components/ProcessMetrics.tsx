import React from "react";

interface ProcessMetricsProps {
  className?: string;
}

export function ProcessMetrics({ className = "" }: ProcessMetricsProps) {
  const metrics = [
    { value: "10K+", label: "Students Enrolled" },
    { value: "95%", label: "Success Rate" },
    { value: "4.8", label: "Average Rating" },
    { value: "24h", label: "Response Time" },
  ];

  return (
    <section className={`process-metrics ${className}`}>
      <div className="container">
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessMetrics;
