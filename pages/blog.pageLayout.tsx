import React from "react";
import { Outlet } from "react-router-dom";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-layout">
      {children || <Outlet />}
    </div>
  );
}
