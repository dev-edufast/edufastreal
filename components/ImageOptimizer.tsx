import React from "react";

interface ImageOptimizerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

export function ImageOptimizer({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  priority = false,
  loading
}: ImageOptimizerProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading || (priority ? "eager" : "lazy")}
    />
  );
}

export default ImageOptimizer;
