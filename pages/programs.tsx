import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { BreadcrumbSchema } from '../components/BreadcrumbSchema';
import { usePrograms } from '../helpers/usePrograms';
import { useTestimonials } from '../helpers/useTestimonials';
import { createCourseSchema, createReviewSchema, createAggregateRatingSchema } from '../helpers/seoUtils';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { AccreditationDisplay } from '../components/AccreditationDisplay';
import { EnhancedCTA } from '../components/EnhancedCTA';
import SectionHeader from '../components/SectionHeader';
import { ProgramComparison } from '../components/ProgramComparison';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { InstantBooking } from '../components/InstantBooking';
import { LeadMagnet } from '../components/LeadMagnet';
import { SmartCTA } from '../components/SmartCTA';
import { StrongCTA } from '../components/StrongCTA';
import { LeadCaptureModal } from '../components/LeadCaptureModal';
import { ProgramsServiceOverview } from '../components/ProgramsServiceOverview';
import { Download, Clock, DollarSign, Target, ArrowRight } from 'lucide-react';
import { ProgramsEligibility } from '../components/ProgramsEligibility';
import { ProgramsBenefits } from '../components/ProgramsBenefits';
import { ProgramsApplication } from '../components/ProgramsApplication';
import { FacultyHighlight } from '../components/FacultyHighlight';
import { ProgramsControls } from '../components/ProgramsControls';
import { ProgramsSkeleton } from '../components/ProgramsSkeleton';
import { ProgramListItem } from '../components/ProgramListItem';
import { useLeadMagnets } from '../helpers/useLeadMagnets';
import { TrendingUp } from 'lucide-react';
import type { DegreeCategory } from '../helpers/schema';
import type { Selectable } from 'kysely';
import type { Programs } from '../helpers/schema';
import styles from './programs.module.css';

type Program = Selectable<Programs>;

const ProgramsPage: React.FC = () => {
  const { data: programs, isFetching } = usePrograms();
  const { data: leadMagnets, isFetching: isFetchingLeadMagnets } = useLeadMagnets();
  const { data: testimonials } = useTestimonials();
  const [activeCategory, setActiveCategory] = useState<DegreeCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalInitialProgram, setLeadModalInitialProgram] = useState<string>('');

  // Application process steps for ProgressIndicator
  const applicationSteps = [
    { label: 'Explore Services', status: 'completed' as const },
    { label: 'Compare Programs', status: 'current' as const },
    { label: 'Book Consultation', status: 'pending' as const },
    { label: 'Submit Application', status: 'pending' as const },
    { label: 'Begin Transformation', status: 'pending' as const }
  ];

  const categories = useMemo(() => {
    if (!programs) return [];
    const cats = new Set(programs.map(p => p.category));
    return ['All', ...Array.from(cats)] as (DegreeCategory | 'All')[];
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    if (!programs) return [];
    let filtered = programs;
    
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.eligibility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.careerOutcomes?.some(outcome => 
          outcome.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filtered;
  }, [programs, activeCategory, searchTerm]);

  const uniqueCategories = useMemo(() => {
    if (!filteredPrograms) return [];
    return Array.from(new Set(filteredPrograms.map(p => p.category)));
  }, [filteredPrograms]);

  // Breadcrumb data
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/programs' }
  ];

  // Generate structured data for programs and reviews
  const programSchemas = filteredPrograms?.map(program => createCourseSchema(program)) || [];
  const reviewSchemas = testimonials ? createReviewSchema(testimonials.map(t => ({
    author: t.author ?? t.name ?? 'Anonymous',
    reviewBody: t.reviewBody ?? t.quote ?? '',
    ratingValue: t.ratingValue ?? 5,
    datePublished: new Date().toISOString(),
  }))) : [];
  const aggregateRating = testimonials ? createAggregateRatingSchema({
    ratingValue: testimonials.reduce((acc, t) => acc + (t.ratingValue ?? 5), 0) / testimonials.length,
    reviewCount: testimonials.length,
  }) : null;

  const handleBrochureClick = (program: Program) => {
    setLeadModalInitialProgram(program.title);
    setIsLeadModalOpen(true);
  };

  return (
    <>
      {/* Enhanced SEO Head */}
      <SEOHead
        title="Accelerated Degree Services - Transform Your Career in 6 Months"
        description="Professional degree services for working adults. Complete your accredited degree in just 6 months with flexible scheduling, career coaching, and guaranteed career advancement. 89% of graduates get promoted within 12 months."
        canonicalUrl="/programs"
        ogType="website"
        ogImage="/og-services.png"
        ogImageAlt="Edufast Career Transformation Services - Accelerated degrees for working professionals"
        twitterCard="summary_large_image"
      >
        <meta name="keywords" content="accelerated degree services, professional education, career advancement, working professionals, 6-month degrees, career transformation, executive education" />
        <meta name="robots" content="index, follow" />
      </SEOHead>

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Program Structured Data */}
      {programSchemas.map((schema, index) => (
        <StructuredData key={`program-${index}`} schema={schema} />
      ))}

      {/* Review Structured Data */}
      {reviewSchemas.map((schema, index) => (
        <StructuredData key={`review-${index}`} schema={schema} />
      ))}

      {/* Aggregate Rating */}
      {aggregateRating && (
        <StructuredData schema={aggregateRating} />
      )}

      <div className={styles.pageContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <SectionHeader
            title="Career Transformation Services for Working Professionals"
            subtitle="Accelerate your career with our 6-month degree programs designed exclusively for ambitious professionals. Combine your experience with targeted education for immediate career advancement and salary increases."
          />
          
          <div className={styles.ctaRow}>
            <StrongCTA 
              actions={['apply', 'counseling']} 
              layout="horizontal"
            />
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                setLeadModalInitialProgram('');
                setIsLeadModalOpen(true);
              }}
            >
              <Download size={20} />
              <span>Get Program Guide</span>
            </Button>
          </div>
        </section>

        {/* Service Overview */}
        <ProgramsServiceOverview />

        {/* Application Progress Indicator */}
        <section className={styles.progressSection}>
          <ProgressIndicator 
            steps={applicationSteps}
            title="Your Career Transformation Journey"
          />
        </section>

        {/* Search and Filter Controls */}
        <ProgramsControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          className={styles.controlsSection}
        />

        {/* Programs List */}
        <main className={styles.programsSection}>
          {isFetching ? (
            <ProgramsSkeleton count={6} />
          ) : filteredPrograms.length > 0 ? (
            <>
              {uniqueCategories.map((category) => {
                const categoryPrograms = filteredPrograms.filter(program => program.category === category);
                return (
                  <div key={category} className={styles.categorySection}>
                    <div className={styles.categoryHeader}>
                      <h2 className={styles.categoryTitle}>{category} Career Advancement Programs</h2>
                      <p className={styles.categoryCount}>{categoryPrograms.length} {categoryPrograms.length === 1 ? 'Program' : 'Programs'} Available</p>
                    </div>
                    
                    <div className={styles.programsList}>
                      {categoryPrograms.map((program, index) => (
                        <ProgramListItem
                          key={program.id}
                          program={program}
                          onBrochureClick={handleBrochureClick}
                          className={index % 2 === 0 ? styles.even : styles.odd}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>🔍</div>
              <h3>No programs found</h3>
              <p>Try adjusting your search terms or category filter to find the perfect program for your career goals.</p>
              <Button 
                onClick={() => { 
                  setSearchTerm(''); 
                  setActiveCategory('All'); 
                }}
                className={styles.resetButton}
              >
                Show All Programs
              </Button>
            </div>
          )}
        </main>

        {/* Mid-page CTAs - Between program sections */}
        <section className={styles.midPageCtaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Found Your Perfect Program?</h2>
            <p className={styles.ctaSubtitle}>
              Take the next step towards your career transformation. Our advisors are ready to help you get started.
            </p>
            <div className={styles.ctaButtonRow}>
              <StrongCTA 
                actions={['apply', 'counseling']} 
                layout="horizontal"
              />
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => {
                  setLeadModalInitialProgram('');
                  setIsLeadModalOpen(true);
                }}
              >
                <Download size={20} />
                <span>Download Brochure</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Program Comparison Tool */}
        <section className={styles.comparisonSection}>
          <h2 className={styles.sectionTitle}>Compare Programs & Career Outcomes</h2>
          <p className={styles.sectionDescription}>
            Compare up to 4 programs side-by-side including duration, costs, salary potential, and specific career advancement opportunities.
          </p>
          <ProgramComparison />
        </section>

        {/* Eligibility & Requirements */}
        <ProgramsEligibility />

        {/* Comprehensive Benefits */}
        <ProgramsBenefits />

        {/* Application Process */}
        <ProgramsApplication />

        {/* Accreditation Section */}
        <AccreditationDisplay className={styles.accreditationSection} />

        {/* Instant Booking Section */}
        <section className={styles.bookingSection}>
          <h2 className={styles.sectionTitle}>Schedule Your Career Consultation</h2>
          <p className={styles.sectionDescription}>
            Speak with our career transformation specialists to create your personalized degree and advancement plan.
          </p>
          <InstantBooking />
        </section>

        {/* Program-Specific Resources */}
        <section className={styles.leadMagnetSection}>
          <h2 className={styles.sectionTitle}>Free Career Advancement Resources</h2>
          <p className={styles.sectionDescription}>
            Download detailed program guides, salary reports, career progression maps, and application checklists.
          </p>
          <div className={styles.leadMagnetsGrid}>
            {isFetchingLeadMagnets ? (
              <ProgramsSkeleton count={3} />
            ) : (
              leadMagnets?.filter(magnet => 
                activeCategory === 'All' || magnet.programCategory === activeCategory
              ).slice(0, 3).map((magnet) => (
                <LeadMagnet
                  key={magnet.id}
                  id={magnet.id}
                  title={magnet.title}
                  description={magnet.description}
                  thumbnailUrl={magnet.thumbnailUrl}
                  fileUrl={magnet.fileUrl}
                />
              ))
            )}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className={styles.finalCtaSection}>
          <div className={styles.finalCtaContent}>
            <TrendingUp size={32} className={styles.finalCtaIcon} />
            <h2>Ready to Transform Your Career?</h2>
            <p>Join 15,000+ professionals who accelerated their careers with our proven degree services. Start your 6-month transformation today.</p>
            <div className={styles.ctaButtonRow}>
              <StrongCTA 
                actions={['apply', 'counseling']} 
                layout="horizontal"
              />
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  setLeadModalInitialProgram('');
                  setIsLeadModalOpen(true);
                }}
              >
                <Download size={20} />
                <span>Get Free Brochure</span>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialProgram={leadModalInitialProgram}
      />
    </>
  );
};

export default ProgramsPage;