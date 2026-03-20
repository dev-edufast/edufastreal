import React from "react";

interface AvatarProps {
  children?: React.ReactNode;
  className?: string;
}

export function Avatar({ children, className = "" }: AvatarProps) {
  return (
    <div className={`avatar ${className}`}>
      {children}
    </div>
  );
}

interface AvatarImageProps {
  src?: string;
  alt?: string;
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export function AvatarImage({ src, alt, className = "", asChild, children }: AvatarImageProps) {
  if (asChild && children) {
    return <>{children}</>;
  }
  
  return (
    <img 
      src={src} 
      alt={alt || ""} 
      className={`avatar-image ${className}`}
    />
  );
}

interface AvatarFallbackProps {
  children?: React.ReactNode;
  className?: string;
}

export function AvatarFallback({ children, className = "" }: AvatarFallbackProps) {
  return (
    <div className={`avatar-fallback ${className}`}>
      {children}
    </div>
  );
}

export default Avatar;
