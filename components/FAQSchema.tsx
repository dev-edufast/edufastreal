import React from "react";
import { StructuredData } from "./StructuredData";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSchemaProps = {
  faqs?: FAQItem[];
  items?: FAQItem[];
};

export function FAQSchema({ faqs, items }: FAQSchemaProps) {
  const source = faqs ?? items ?? [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: source.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <StructuredData data={schema} />;
}

export default FAQSchema;
