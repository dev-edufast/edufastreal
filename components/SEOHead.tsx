import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

export default function SEOHead({
  title = "EduFast - Online Education Platform",
  description = "EduFast provides quality online education programs and courses",
  keywords = "education, online courses, learning",
  ogImage,
  ogUrl,
  canonical,
  noindex = false,
  children,
}: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {children}
    </Helmet>
  );
}
