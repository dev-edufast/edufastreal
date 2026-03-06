import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "destructive" | "outline" | "success";
  className?: string;
  size?: "default" | "sm" | "lg";
}

export function Badge({ children, variant = "default", className = "", size = "default" }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full font-medium";
  
  const sizeStyles = {
    default: "px-2.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };
  
  const variantStyles = {
    default: "bg-blue-100 text-blue-800",
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    outline: "border border-gray-200 text-gray-800",
    success: "bg-green-100 text-green-800",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
