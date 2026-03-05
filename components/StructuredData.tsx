import React from "react";
import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type?: "Organization" | "WebSite" | "WebPage" | "Course" | "EducationalOrganization";
  data?: Record<string, any>;
}

export function StructuredData({
  type = "Organization",
  data = {},
}: StructuredDataProps) {
  const defaultData = {
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
