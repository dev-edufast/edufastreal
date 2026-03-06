import React from "react";
import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type?: "Organization" | "WebSite" | "WebPage" | "Course" | "EducationalOrganization";
  data?: Record<string, any>;
  schema?: Record<string, any>;
}

export function StructuredData({
  type = "Organization",
  data = {},
  schema,
}: StructuredDataProps) {
  const defaultData = schema ?? {
    "@context": "https://schema.org",
    "@type": type,
    name: "EduFast",
    url: "https://edufast.com",
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(defaultData)}
      </script>
    </Helmet>
  );
}
