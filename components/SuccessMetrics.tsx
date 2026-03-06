import React from "react";
import { TrendingUp, Users, Award, Briefcase } from "lucide-react";

interface Metric {
  icon: React.ElementType;
  value: string;
  label: string;
  change?: string;
}

interface SuccessMetricsProps {
  metrics?: Metric[];
}

const defaultMetrics: Metric[] = [
  {
    icon: Users,
    value: "10,000+",
    label: "Success Stories",
    change: "+25% this year",
  },
  {
    icon: Briefcase,
    value: "85%",
    label: "Career Placement",
    change: "Within 6 months",
  },
  {
    icon: Award,
    value: "500+",
    label: "Industry Awards",
    change: "Recognized globally",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Satisfaction Rate",
    change: "Student feedback",
  },
];

export function SuccessMetrics({ metrics = defaultMetrics }: SuccessMetricsProps) {
  return (
    <div className="success-metrics">
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon">
              <metric.icon size={32} />
            </div>
            <div className="metric-content">
              <h3 className="metric-value">{metric.value}</h3>
              <p className="metric-label">{metric.label}</p>
              {metric.change && (
                <span className="metric-change">{metric.change}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuccessMetrics;
