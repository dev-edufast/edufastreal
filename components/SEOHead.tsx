import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  canonical?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

export function SEOHead({
  title = "EduFast - Online Education Platform",
  description = "EduFast provides quality online education programs and courses",
  keywords = "education, online courses, learning",
  ogImage,
  ogUrl,
  canonical,
  canonicalUrl,
  ogImageAlt,
  ogType,
  twitterCard,
  noindex = false,
  children,
}: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {(canonical || canonicalUrl) && <link rel="canonical" href={canonical ?? canonicalUrl} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {children}
    </Helmet>
  );
}

export default SEOHead;
