import React from "react";

type AdminPageLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AdminPageLayout({ title, subtitle, children }: AdminPageLayoutProps) {
  return (
    <main style={{ padding: "1.5rem" }}>
      <header style={{ marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{title}</h1>
        {subtitle ? (
          <p style={{ marginTop: "0.5rem", color: "#4b5563" }}>{subtitle}</p>
        ) : null}
      </header>
      <section>{children}</section>
    </main>
  );
}

export default AdminPageLayout;
