import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { BreadcrumbSchema } from '../components/BreadcrumbSchema';
import { FAQSchema } from '../components/FAQSchema';
import { createOrganizationSchema } from '../helpers/seoUtils';
import { useTestimonials } from '../helpers/useTestimonials';
import { HeroSection } from '../components/HeroSection';
import { FloatingEducationIcons } from '../components/FloatingEducationIcons';
import { AdmissionSteps } from '../components/AdmissionSteps';
import { AccreditationDisplay } from '../components/AccreditationDisplay';
import { FacultyShowcase } from '../components/FacultyShowcase';
import { EnhancedCTA } from '../components/EnhancedCTA';
import { FloatingCTA } from '../components/FloatingCTA';
import { BackToTop } from '../components/BackToTop';
import { Progress } from '../components/Progress';
import { HomepageConversion } from '../components/HomepageConversion';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { HomepageSections } from '../components/HomepageSections';
import { StrongCTA } from '../components/StrongCTA';
import { Button } from '../components/Button';
import { Download } from 'lucide-react';
import { LeadCaptureModal } from '../components/LeadCaptureModal';

import styles from './_index.module.css';

const HomePage: React.FC = () => {
  const { data: testimonials } = useTestimonials();
  const [readingProgress, setReadingProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalInitialProgram, setLeadModalInitialProgram] = useState<string>('');

  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef<number>(0);
  const scrollAnimationRef = useRef<number | null>(null);

  // Optimized scroll handler with reduced throttling
  const throttledScrollHandler = useCallback(() => {
    const now = performance.now();
    if (now - lastScrollTime.current < 10) {
      return;
    }
    lastScrollTime.current = now;

    requestAnimationFrame(() => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    });
  }, []);

  const handleScroll = useCallback(() => {
    throttledScrollHandler();

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      throttledScrollHandler();
    }, 50);
  }, [throttledScrollHandler]);

  // Enhanced reading progress tracking
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Intersection observer for lazy loading sections
  useEffect(() => {
    let observerTimeout: NodeJS.Timeout | null = null;

    observerRef.current = new IntersectionObserver(
      entries => {
        if (observerTimeout) return;

        observerTimeout = setTimeout(() => {
          requestAnimationFrame(() => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('data-section');

                if (sectionId) {
                  // Update visibleSections to trigger content loading
                  setVisibleSections(prev => {
                    const newSet = new Set(prev);
                    newSet.add(sectionId);
                    return newSet;
                  });
                }
              }
            });
          });
          observerTimeout = null;
        }, 30);
      },
      {
        threshold: [0.1, 0.3],
        rootMargin: '100px 0px -80px 0px',
      },
    );

    const animatedElements = document.querySelectorAll('[data-section], [data-animate]');
    animatedElements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
      if (observerTimeout) {
        clearTimeout(observerTimeout);
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  // FAQ data for homepage
  const homepageFAQs = [
    {
      question: "How can I get a degree in just 6 months?",
      answer: "Our innovative competency-based learning approach allows you to demonstrate your knowledge and skills quickly, accelerating your path to graduation through intensive coursework and real-world application."
    },
    {
      question: "Are Edufast degrees accredited and recognized?",
      answer: "Yes, all our degree programs are fully accredited and recognized by relevant educational authorities. Our partnerships with established universities ensure your degree holds the same value as traditional programs."
    },
    {
      question: "What career support do you provide?",
      answer: "We offer comprehensive career services including resume optimization, interview preparation, job placement assistance, and ongoing career counseling to help you achieve your professional goals."
    },
    {
      question: "Can I study while working full-time?",
      answer: "Absolutely! Our flexible delivery modes including online and hybrid options are designed for working professionals. You can study at your own pace while maintaining your current commitments."
    }
  ];

  // Breadcrumb data for homepage
  const breadcrumbs = [
    { name: 'Home', url: '/' }
  ];

  // Organization schema
  const organizationSchema = createOrganizationSchema();

  return (
    <>
      {/* Enhanced SEO Head */}
      <SEOHead
        title="Fast but Recognized Degree Programs | International Edge Attestation | End-to-End Support"
        description="Fast but Recognized accelerated degree programs with International Edge - embassy attestation proof for abroad opportunities. Complete End-to-End Support from admission to career help. Get your 6-month graduation with official recognition!"
        canonicalUrl="/"
        ogType="website"
        ogImage="/og-homepage.png"
        ogImageAlt="Edufast - Fast but Recognized Degree Programs with International Edge"
        twitterCard="summary_large_image"
      >
        {/* Keywords meta tag */}
        <meta name="keywords" content="fast but recognized degrees, international edge attestation, end-to-end support education, accelerated degree programs, 6-month graduation, embassy attestation proof, fast track degree, recognized degree programs, official degree recognition" />
        
        {/* Additional Open Graph tags */}
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="Edufast" />
        
        {/* Twitter specific tags */}
        <meta name="twitter:creator" content="@edufast" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Edufast" />
        <meta name="publisher" content="Edufast" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Geo targeting */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </SEOHead>

      {/* Structured Data */}
      <StructuredData schema={organizationSchema} />
      
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* FAQ Schema */}
      <FAQSchema items={homepageFAQs} />

      {/* Reading Progress Indicator */}
      <div className={styles.progressIndicator}>
        <Progress value={readingProgress} />
      </div>

      <div className={styles.pageContainer}>
        {/* Animated Background - Behind all content */}
        <AnimatedBackground />

        {/* Optimized Floating Education Icons */}
        <div className={styles.floatingEducationLayer}>
          <FloatingEducationIcons />
        </div>

        {/* Optimized Background Elements - Reduced count on mobile */}
        <div className={styles.backgroundElements}>
          <div className={styles.floatingShape} style={{ '--delay': '0s' } as React.CSSProperties}></div>
          <div className={styles.floatingShape} style={{ '--delay': '3s' } as React.CSSProperties}></div>
          <div
            className={`${styles.floatingShape} ${styles.desktopOnly}`}
            style={{ '--delay': '6s' } as React.CSSProperties}
          ></div>
          <div
            className={`${styles.floatingShape} ${styles.desktopOnly}`}
            style={{ '--delay': '9s' } as React.CSSProperties}
          ></div>
        </div>

        {/* Hero Section - Always visible */}
        <section id="hero" data-section="hero" className={styles.section}>
          <HeroSection />
          
          {/* Hero CTAs */}
          <div className={styles.heroCtaSection}>
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
              className={styles.brochureButton}
            >
              <Download size={20} />
              <span>Download Brochure</span>
            </Button>
          </div>
        </section>

        {/* Transform Your Career Section */}
        <section id="accreditations" data-section="accreditations" className={styles.section}>
          <div className={styles.seoSectionHeader}>
            <h2>Fast but Recognized: Official Accreditation with International Edge</h2>
            <p>Our Fast but Recognized degree programs provide official accreditation with International Edge - including embassy attestation proof for abroad opportunities. Experience true End-to-End Support throughout your education journey.</p>
          </div>
          <AccreditationDisplay />
        </section>

        {/* Faculty Showcase Section with SEO heading */}
        <section id="faculty" data-section="faculty" className={styles.section}>
          <div className={styles.seoSectionHeader}>
            <h2>End-to-End Support from Expert Faculty with International Edge</h2>
            <p>Our Fast but Recognized faculty provides complete End-to-End Support with International Edge expertise, ensuring your degree has global recognition and embassy attestation capability.</p>
          </div>
          <FacultyShowcase />
        </section>

        {/* Admission Steps Section with SEO heading */}
        <section id="admission" data-section="admission" className={styles.section}>
          <div className={styles.seoSectionHeader}>
            <h2>Complete End-to-End Support: Admission to Career Success</h2>
            <p>Experience our Fast but Recognized admission process with International Edge advantage - from study materials to exams to degree attestation to career placement support.</p>
          </div>
          <AdmissionSteps />
          <HomepageConversion>
            <EnhancedCTA type="apply" />
            <EnhancedCTA type="counseling" />
          </HomepageConversion>
        </section>

        {/* All lazy-loaded sections are managed by HomepageSections component */}
        <HomepageSections visibleSections={visibleSections} />

        {/* Mid-page CTAs - After testimonials */}
        <section className={styles.midPageCtaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Fast but Recognized Success with International Edge</h2>
            <p className={styles.ctaSubtitle}>
              Join thousands who achieved Fast but Recognized degrees with International Edge attestation and complete End-to-End Support for global career opportunities.
            </p>
            <div className={styles.ctaButtonRow}>
              <StrongCTA 
                actions={['apply']} 
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
                <span>Get Free Brochure</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTAs - Before footer */}
        <section className={styles.finalCtaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Fast but Recognized Degrees with End-to-End Support</h2>
            <p className={styles.ctaSubtitle}>
              Start your Fast but Recognized degree journey with International Edge attestation and complete End-to-End Support from admission to global career placement.
            </p>
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
                <span>Download Brochure</span>
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

      {/* Floating Action Elements */}
      <FloatingCTA />
      <BackToTop />
    </>
  );
};

export default HomePage;