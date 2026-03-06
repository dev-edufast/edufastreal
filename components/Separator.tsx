import React from "react";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  decorative?: boolean;
}

export function Separator({
  orientation = "horizontal",
  className = "",
  decorative = true,
}: SeparatorProps) {
  const baseStyles = "shrink-0 bg-gray-200";
  
  const orientationStyles = orientation === "horizontal" 
    ? "h-[1px] w-full" 
    : "h-full w-[1px]";

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={`${baseStyles} ${orientationStyles} ${className}`}
    />
  );
}

export default Separator;
