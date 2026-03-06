import React from "react";

type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "1rem",
        borderRadius: 6,
        background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%)",
        backgroundSize: "400% 100%",
        animation: "skeleton-loading 1.4s ease infinite",
        ...style,
      }}
    />
  );
}

export default Skeleton;
