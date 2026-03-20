import React from "react";

interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
  config?: ChartConfig;
}

export function ChartContainer({ children, className = "", config }: ChartContainerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      {children}
    </div>
  );
}

interface ChartTooltipProps {
  children?: React.ReactNode;
  cursor?: boolean;
  content?: React.ReactNode;
}

export function ChartTooltip({ children, cursor, content }: ChartTooltipProps) {
  return null; // Placeholder - actual tooltip logic would be more complex
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  indicator?: "dot" | "line" | "dashed";
}

export function ChartTooltipContent({ active, payload, label, indicator }: ChartTooltipContentProps) {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="bg-white p-2 border rounded shadow-lg">
      {label && <p className="font-medium">{label}</p>}
      {payload.map((entry, index) => (
        <p key={index} className="text-sm">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
};
