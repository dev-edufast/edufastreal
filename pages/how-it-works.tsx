import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { StrongCTA } from '../components/StrongCTA';
import { ProcessHero } from '../components/ProcessHero';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { ProcessMetrics } from '../components/ProcessMetrics';
import { ProcessFAQ } from '../components/ProcessFAQ';
import styles from './how-it-works.module.css';

const HowItWorksPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>How Our Accelerated Learning Process Works | Edufast</title>
        <meta
          name="description"
          content="Discover how our innovative accelerated learning methodology works. From academic assessment to career advancement, see our proven 6-phase process for legitimate degree completion in 6 months."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        <ProcessHero />
        
        {/* Hero CTAs - After ProcessHero */}
        <section className={styles.heroCtaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Ready to Experience Our Revolutionary Process?</h2>
            <p className={styles.ctaSubtitle}>
              Discover how our proven methodology can transform your career in just 6 months.
            </p>
            <StrongCTA 
              actions={['apply', 'counseling', 'brochure']} 
              layout="horizontal"
            />
          </div>
        </section>

        <ProcessTimeline />
        <ProcessMetrics />
        
        {/* Mid-page CTAs - After metrics */}
        <section className={styles.midPageCtaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Impressed by Our Results?</h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of professionals who have achieved similar success through our accelerated programs.
            </p>
            <StrongCTA 
              actions={['apply', 'brochure']} 
              layout="horizontal"
            />
          </div>
        </section>

        <ProcessFAQ />

        {/* Final CTA Section */}
        <section className={styles.finalCtaSection}>
          <div className={styles.ctaContent}>
            <h2>Ready to Start Your Accelerated Learning Journey?</h2>
            <p>Join thousands who have successfully transformed their careers through our innovative accelerated education programs. Expert faculty, proven methodology, and legitimate accredited degrees.</p>
            <StrongCTA 
              actions={['apply', 'counseling', 'brochure']} 
              layout="horizontal"
            />
            <p className={styles.ctaFootnote}>
              <small>*Fully accredited degrees through innovative accelerated learning methodologies</small>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowItWorksPage;