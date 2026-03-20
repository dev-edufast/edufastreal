import React, { useState, useRef, useEffect } from "react";

interface PopoverProps {
  children: React.ReactNode;
  className?: string;
}

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(undefined);

export function Popover({ children, className = "" }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className={`popover ${className}`} style={{ position: "relative", display: "inline-block" }}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger must be used within Popover");
  
  const { open, setOpen, triggerRef } = context;

  if (asChild) {
    return (
      <div ref={triggerRef as React.RefObject<HTMLDivElement>} onClick={() => setOpen(!open)}>
        {children}
      </div>
    );
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      onClick={() => setOpen(!open)}
      type="button"
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      {children}
    </button>
  );
}

export function PopoverContent({ 
  children, 
  className = "",
  align = "center",
  removeBackgroundAndPadding = false
}: { 
  children: React.ReactNode; 
  className?: string;
  align?: "start" | "center" | "end";
  removeBackgroundAndPadding?: boolean;
}) {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error("PopoverContent must be used within Popover");
  
  const { open, setOpen, triggerRef } = context;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current && 
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  const alignStyles = {
    start: { left: "0" },
    center: { left: "50%", transform: "translateX(-50%)" },
    end: { right: "0" },
  };

  return (
    <div
      ref={contentRef}
      className={`popover-content ${className}`}
      style={{
        position: "absolute",
        top: "100%",
        marginTop: "8px",
        zIndex: 50,
        ...alignStyles[align],
      }}
    >
      {children}
    </div>
  );
}

export default Popover;
