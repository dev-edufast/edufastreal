import React from "react";

interface BreadcrumbProps {
  children: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ children, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb ${className}`}>
      {children}
    </nav>
  );
}

interface BreadcrumbListProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbList({ children, className = "" }: BreadcrumbListProps) {
  return (
    <ol className={`breadcrumb-list ${className}`}>
      {children}
    </ol>
  );
}

interface BreadcrumbItemProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbItem({ children, className = "" }: BreadcrumbItemProps) {
  return (
    <li className={`breadcrumb-item ${className}`}>
      {children}
    </li>
  );
}

interface BreadcrumbLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  as?: React.ElementType;
  to?: string;
  asChild?: boolean;
}

export function BreadcrumbLink({ children, href, className = "", as: Component = "a", to, asChild, ...props }: BreadcrumbLinkProps) {
  // If asChild is true, clone the child element with additional props
  if (asChild && React.isValidElement(children)) {
    const childProps = (children as React.ReactElement<any>).props;
    return React.cloneElement(children, {
      className: `breadcrumb-link ${className} ${childProps.className || ''}`.trim(),
      ...props
    } as any);
  }
  
  if (Component !== "a") {
    return (
      <Component to={to} className={`breadcrumb-link ${className}`} {...props}>
        {children}
      </Component>
    );
  }
  
  return (
    <a href={href} className={`breadcrumb-link ${className}`} {...props}>
      {children}
    </a>
  );
}

interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
  className?: string;
}

export function BreadcrumbSeparator({ children, className = "" }: BreadcrumbSeparatorProps) {
  return (
    <span className={`breadcrumb-separator ${className}`} aria-hidden="true">
      {children || "/"}
    </span>
  );
}

interface BreadcrumbPageProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbPage({ children, className = "" }: BreadcrumbPageProps) {
  return (
    <span className={`breadcrumb-page ${className}`} aria-current="page">
      {children}
    </span>
  );
}

export default {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
};
