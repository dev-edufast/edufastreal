import React from "react";
import { Outlet } from "react-router-dom";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="about-layout">
      {children || <Outlet />}
    </div>
  );
}
