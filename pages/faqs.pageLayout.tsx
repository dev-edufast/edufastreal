import React from "react";
import { Outlet } from "react-router-dom";

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="faqs-layout">
      {children || <Outlet />}
    </div>
  );
}
