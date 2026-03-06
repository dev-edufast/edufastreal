import React from "react";

type SharedLayoutProps = {
  children: React.ReactNode;
};

export function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  );
}

export default SharedLayout;
