type OrganizationSchemaInput = {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
};

type LocalBusinessSchemaInput = {
  name?: string;
  url?: string;
  logo?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
};

export function createOrganizationSchema(input: OrganizationSchemaInput = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name ?? "EduFast",
    url: input.url ?? "https://dev-edufast.vercel.app",
    logo: input.logo ?? "https://dev-edufast.vercel.app/logo.png",
    sameAs: input.sameAs ?? [],
  };
}

export function createLocalBusinessSchema(input: LocalBusinessSchemaInput = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name ?? "EduFast",
    url: input.url ?? "https://dev-edufast.vercel.app",
    logo: input.logo ?? "https://dev-edufast.vercel.app/logo.png",
    telephone: input.telephone,
    email: input.email,
    address: input.address,
    sameAs: input.sameAs ?? [],
  };
}

type PersonSchemaInput = {
  name?: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  worksFor?: {
    name?: string;
    url?: string;
  };
};

export function createPersonSchema(input: PersonSchemaInput = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name ?? "",
    jobTitle: input.jobTitle,
    description: input.description,
    image: input.image,
    url: input.url,
    sameAs: input.sameAs ?? [],
    worksFor: input.worksFor ? {
      "@type": "Organization",
      name: input.worksFor.name,
      url: input.worksFor.url,
    } : undefined,
  };
}

// Course schema for SEO
interface CourseSchemaInput {
  name: string;
  description?: string;
  provider?: string;
  url?: string;
  image?: string;
  duration?: string;
  educationalLevel?: string;
}

export function createCourseSchema(input: CourseSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    provider: {
      "@type": "Organization",
      name: input.provider ?? "EduFast",
    },
    url: input.url,
    image: input.image,
    timeRequired: input.duration,
    educationalLevel: input.educationalLevel,
  };
}

// Review schema for SEO
interface ReviewSchemaInput {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished?: string;
}

export function createReviewSchema(input: ReviewSchemaInput | ReviewSchemaInput[]) {
  const inputs = Array.isArray(input) ? input : [input];
  return inputs.map(item => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: item.author,
    },
    reviewBody: item.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: item.ratingValue,
    },
    datePublished: item.datePublished ?? new Date().toISOString(),
  }));
}

// Aggregate rating schema for SEO
interface AggregateRatingSchemaInput {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}

export function createAggregateRatingSchema(input: AggregateRatingSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: input.ratingValue,
    reviewCount: input.reviewCount,
    bestRating: input.bestRating ?? 5,
  };
}
