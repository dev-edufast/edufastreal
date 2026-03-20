import React from "react";

interface DialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Dialog({ children, open = false, onOpenChange, className = "" }: DialogProps) {
  if (!open) return null;
  
  return (
    <div className={`dialog-overlay ${className}`} onClick={() => onOpenChange?.(false)}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

interface DialogContentProps {
  children?: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
  return <div className={`dialog-body ${className}`}>{children}</div>;
}

interface DialogHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className = "" }: DialogHeaderProps) {
  return <div className={`dialog-header ${className}`}>{children}</div>;
}

interface DialogTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
  return <h2 className={`dialog-title ${className}`}>{children}</h2>;
}

interface DialogDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export function DialogDescription({ children, className = "" }: DialogDescriptionProps) {
  return <p className={`dialog-description ${className}`}>{children}</p>;
}

interface DialogFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className = "" }: DialogFooterProps) {
  return <div className={`dialog-footer ${className}`}>{children}</div>;
}

interface DialogCloseProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function DialogClose({ children, className = "", asChild }: DialogCloseProps) {
  return (
    <button className={`dialog-close ${className}`}>
      {children || "Close"}
    </button>
  );
}

export default Dialog;
