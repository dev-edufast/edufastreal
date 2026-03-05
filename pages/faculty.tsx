import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { BreadcrumbSchema } from '../components/BreadcrumbSchema';
import { ImageOptimizer } from '../components/ImageOptimizer';
import { Linkedin, Award, Briefcase, Mail } from 'lucide-react';
import { useFaculty } from '../helpers/useFaculty';
import { createPersonSchema } from '../helpers/seoUtils';
import { Skeleton } from '../components/Skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '../components/Avatar';
import { EnhancedCTA } from '../components/EnhancedCTA';
import { AlumniSuccessHub } from '../components/AlumniSuccessHub';
import { SmartCTA } from '../components/SmartCTA';
import { StrongCTA } from '../components/StrongCTA';
import styles from './faculty.module.css';

const FacultyPage: React.FC = () => {
  const { data: faculty, isFetching } = useFaculty();

  // Breadcrumb data
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Faculty', url: '/faculty' }
  ];

  // Generate person schemas for faculty
  const facultySchemas = faculty?.map(member => createPersonSchema(member)) || [];

  return (
    <>
      {/* Enhanced SEO Head */}
      <SEOHead
        title="Our Expert Faculty - World-Class Educators"
        description="Meet the expert faculty at Edufast. Our team of experienced educators and industry professionals are dedicated to your success in our accelerated degree programs."
        canonicalUrl="/faculty"
        ogType="website"
        ogImage="/og-faculty.png"
        ogImageAlt="Edufast Faculty - Expert educators and industry professionals"
        twitterCard="summary_large_image"
      >
        {/* Additional SEO tags */}
        <meta name="keywords" content="faculty, professors, educators, industry experts, academic staff, experienced teachers, qualified instructors" />
        <meta name="robots" content="index, follow" />
      </SEOHead>

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Faculty Person Schemas */}
      {facultySchemas.map((schema, index) => (
        <StructuredData key={`faculty-${index}`} schema={schema} />
      ))}
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Meet Our World-Class Faculty</h1>
          <p className={styles.subtitle}>
            A dedicated team of scholars, researchers, and industry leaders committed to providing an unparalleled educational experience.
          </p>
          
          {/* Hero CTA */}
          <div className={styles.heroCTA}>
            <StrongCTA actions={['apply', 'brochure', 'counseling']} layout="horizontal" />
          </div>
        </header>

        <main className={styles.grid}>
          {isFetching
            ? Array.from({ length: 8 }).map((_, index) => <FacultyCardSkeleton key={index} />)
            : faculty?.map((member) => (
                <div key={member.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <Avatar className={styles.avatar}>
                      {member.imageUrl && (
                        <AvatarImage asChild>
                          <ImageOptimizer
                            src={member.imageUrl} 
                            alt={`${member.name} - ${member.title} at Edufast`}
                            loading="lazy"
                          />
                        </AvatarImage>
                      )}
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className={styles.headerText}>
                      <h2 className={styles.name}>{member.name}</h2>
                      <p className={styles.memberTitle}>{member.title}</p>
                    </div>
                  </div>
                  <div className={styles.details}>
                    <p className={styles.detailItem}><Award size={16} /> {member.qualifications}</p>
                    {member.specialization && <p className={styles.detailItem}><Briefcase size={16} /> Specialization: {member.specialization}</p>}
                  </div>
                  <p className={styles.bio}>{member.bio}</p>
                  <div className={styles.cardFooter}>
                    {member.linkedinUrl && (
                      <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                        <Linkedin size={20} />
                      </a>
                    )}
                    {/* Assuming email is not in DB, but can be added */}
                    <a href={`mailto:info@edufast.com?subject=Inquiry for ${member.name}`} className={styles.socialLink}>
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              ))}
        </main>

        {/* Mid-page CTA after faculty grid */}
        <section className={styles.midPageCTA}>
          <div className={styles.ctaContent}>
            <h3>Ready to Learn from These Experts?</h3>
            <p>Our faculty are waiting to guide your transformation. Take the next step in your educational journey.</p>
            <StrongCTA actions={['apply', 'counseling']} layout="horizontal" />
          </div>
        </section>

        {/* Alumni Success Stories mentored by Faculty */}
        <section className={styles.alumniSection}>
          <h2 className={styles.alumniTitle}>Faculty-Mentored Success Stories</h2>
          <p className={styles.alumniSubtitle}>
            Discover how our expert faculty have guided students to remarkable career transformations through personalized mentorship and industry expertise.
          </p>
          <AlumniSuccessHub />
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Learn from the Best?</h2>
          <p className={styles.ctaSubtitle}>
            Our faculty are ready to guide you. Take the first step towards your accelerated degree today.
          </p>
          <div className={styles.ctaActions}>
            <StrongCTA actions={['apply', 'brochure', 'counseling']} layout="horizontal" />
          </div>
        </section>
      </div>
    </>
  );
};

const FacultyCardSkeleton: React.FC = () => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <Skeleton style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <div className={styles.headerText}>
        <Skeleton style={{ height: '1.5rem', width: '200px', marginBottom: '0.5rem' }} />
        <Skeleton style={{ height: '1rem', width: '150px' }} />
      </div>
    </div>
    <div className={styles.details}>
      <Skeleton style={{ height: '1rem', width: '90%' }} />
      <Skeleton style={{ height: '1rem', width: '80%' }} />
    </div>
    <Skeleton style={{ height: '4rem', width: '100%' }} />
    <div className={styles.cardFooter}>
      <Skeleton style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
      <Skeleton style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
    </div>
  </div>
);

export default FacultyPage;