import React from 'react';
import { Helmet } from 'react-helmet';
import { SectionHeader } from '../components/SectionHeader';
import { InteractiveTimeline } from '../components/InteractiveTimeline';
import { ProgramComparison } from '../components/ProgramComparison';
import { AlumniSuccessHub } from '../components/AlumniSuccessHub';
import { InstantBooking } from '../components/InstantBooking';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { LeadMagnet } from '../components/LeadMagnet';
import { SmartCTA } from '../components/SmartCTA';
import { LiveChatWidget } from '../components/LiveChatWidget';
import styles from './features-demo.module.css';

const FeaturesDemoPage = () => {
  return (
    <>
      <Helmet>
        <title>Features Demo | Edufast</title>
        <meta name="description" content="A showcase of advanced conversion and user engagement features available on the Edufast platform." />
      </Helmet>
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <h1>Advanced Features Showcase</h1>
          <p>This page demonstrates the advanced components designed to enhance user engagement and drive conversions.</p>
        </header>

        <section className={styles.section}>
          <SectionHeader
            title="Interactive 6-Month Timeline"
            subtitle="Visually guide prospective students through their accelerated learning journey from start to finish."
          />
          <InteractiveTimeline />
        </section>

        <section className={styles.section}>
          <SectionHeader
            title="Side-by-Side Program Comparison"
            subtitle="Empower users to make informed decisions by comparing key details of up to four programs."
          />
          <ProgramComparison />
        </section>

        <section className={styles.section}>
          <SectionHeader
            title="Alumni Success Hub"
            subtitle="Build trust and inspire action with a dynamic carousel of real-world alumni success stories."
          />
          <AlumniSuccessHub />
        </section>

        <section className={styles.section}>
          <SectionHeader
            title="Instant Counselor Booking"
            subtitle="Allow users to book appointments directly from the website by viewing real-time counselor availability."
          />
          <InstantBooking />
        </section>

        <section className={styles.section}>
          <SectionHeader
            title="Dynamic Progress Indicators"
            subtitle="Provide clear visual feedback on multi-step processes like applications or course completion."
          />
          <div className={styles.progressGrid}>
            <ProgressIndicator
              title="Application Status"
              steps={[
                { label: 'Profile', status: 'completed' },
                { label: 'Documents', status: 'completed' },
                { label: 'Review', status: 'current' },
                { label: 'Payment', status: 'pending' },
                { label: 'Enrolled', status: 'pending' },
              ]}
            />
            <ProgressIndicator
              title="Onboarding Progress"
              steps={[
                { label: 'Welcome', status: 'completed' },
                { label: 'Orientation', status: 'current' },
                { label: 'Mentorship', status: 'pending' },
              ]}
            />
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader
            title="Lead Magnets"
            subtitle="Capture high-quality leads by offering valuable, downloadable resources in exchange for contact information."
          />
          <div className={styles.leadMagnetGrid}>
            <LeadMagnet
              id={1}
              title="Ultimate Guide to Fast-Track Degrees"
              description="Download our comprehensive guide to understand how accelerated degrees work and if they are right for you."
              thumbnailUrl="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800"
              fileUrl="/mock-assets/guide.pdf"
            />
            <LeadMagnet
              id={2}
              title="Career Pathways Brochure"
              description="Explore the high-demand careers you can launch into after completing an Edufast program."
              thumbnailUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"
              fileUrl="/mock-assets/brochure.pdf"
            />
            <LeadMagnet
              id={3}
              title="Scholarship Application Kit"
              description="Get all the templates and tips you need to successfully apply for scholarships to fund your education."
              thumbnailUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800"
              fileUrl="/mock-assets/kit.zip"
            />
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeader
            title="Smart, Context-Aware CTAs"
            subtitle="Display dynamic calls-to-action that adapt based on user context, behavior, and interests."
          />
          <div className={styles.ctaGrid}>
            <div className={styles.ctaDemo}>
              <h4>Default CTA</h4>
              <p>Shown on most pages as a primary action.</p>
              <SmartCTA />
            </div>
            <div className={styles.ctaDemo}>
              <h4>Program-Specific CTA</h4>
              <p>Adapts when a user shows interest in a category.</p>
              <SmartCTA programInterest="Business" />
            </div>
            <div className={styles.ctaDemo}>
              <h4>Behavior-Driven CTA</h4>
              <p>Triggers after a user has spent time on the page.</p>
              <SmartCTA userBehavior="time_on_page" />
            </div>
          </div>
        </section>
      </div>
      <LiveChatWidget />
    </>
  );
};

export default FeaturesDemoPage;