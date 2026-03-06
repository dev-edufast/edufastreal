type OrganizationSchemaInput = {
  name?: string;
  url?: string;
  logo?: string;
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
