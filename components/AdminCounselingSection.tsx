import React from "react";

type AdminCounselingSectionProps = {
  title?: string;
  count?: number;
  children?: React.ReactNode;
};

export function AdminCounselingSection({
  title,
  count,
  children,
}: AdminCounselingSectionProps) {
  return (
    <section style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{title ?? "Counseling"}</h3>
        {typeof count === "number" ? (
          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{count}</span>
        ) : null}
      </div>
      <div>{children ?? null}</div>
    </section>
  );
}

export default AdminCounselingSection;
