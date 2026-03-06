import React from "react";
import { StructuredData } from "./StructuredData";

type BreadcrumbItem = {
  name: string;
  item?: string;
  url?: string;
};

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item ?? item.url ?? "",
    })),
  };

  return <StructuredData data={schema} />;
}

export default BreadcrumbSchema;
