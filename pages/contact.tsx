import React, { useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { BreadcrumbSchema } from '../components/BreadcrumbSchema';
import { useSearchParams } from 'react-router-dom';
import { RegistrationForm } from '../components/RegistrationForm';
import { createLocalBusinessSchema } from '../helpers/seoUtils';
import { 
  Mail, 
  Phone, 
  Users, 
  Sparkles,
  Heart,
  Star
} from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { StrongCTA } from '../components/StrongCTA';
import styles from './contact.module.css';

const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const programFromUrl = searchParams.get('program');
  
  const [recentInquiries] = React.useState([
    { name: 'Sarah M.', program: 'Healthcare Management', time: '2 min ago' },
    { name: 'David L.', program: 'Information Technology', time: '5 min ago' },
    { name: 'Maria R.', program: 'Business Analytics', time: '8 min ago' },
  ]);

  // Breadcrumb data
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Register', url: '/contact' }
  ];

  // Local business schema for contact page
  const localBusinessSchema = createLocalBusinessSchema();

  // Contact information structured data
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Edufast',
    description: 'Get in touch with Edufast for admissions, course information, and student support.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Edufast',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-95380-78333',
          contactType: 'Admissions',
          availableLanguage: ['English', 'Hindi'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          }
        },
        {
          '@type': 'ContactPoint',
          email: 'info@edufast.in',
          contactType: 'Customer Service',
          availableLanguage: ['English', 'Hindi']
        }
      ]
    }
  };

  const getResponseTime = () => {
    const hour = new Date().getHours();
    if (hour >= 9 && hour < 17) {
      return 'Usually responds in ~15 minutes';
    } else if (hour >= 17 && hour < 22) {
      return 'Usually responds in ~45 minutes';
    } else {
      return 'Will respond first thing tomorrow';
    }
  };

  return (
    <>
      {/* Enhanced SEO Head */}
      <SEOHead
        title="Register Now - Start Your 6-Month Journey Today!"
        description="Ready to transform your career? Complete your student registration and officially begin your 6-month degree journey with Edufast. Real programs, real results, real fast!"
        canonicalUrl="/contact"
        ogType="website"
        ogImage="/og-contact.png"
        ogImageAlt="Register for Edufast - Start your educational journey today"
        twitterCard="summary_large_image"
      >
        {/* Additional SEO tags */}
        <meta name="keywords" content="register, contact, admissions, student registration, apply now, contact edufast, get started" />
        <meta name="robots" content="index, follow" />
        
        {/* Contact-specific tags */}
        <meta name="contact:phone_number" content="+91-95380-78333" />
        <meta name="contact:email" content="info@edufast.in" />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai, Maharashtra" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
      </SEOHead>

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Local Business Schema */}
      <StructuredData schema={localBusinessSchema} />

      {/* Contact Information Schema */}
      <StructuredData schema={contactSchema} />
      
      <div className={styles.pageContainer}>
        {/* Animated Background Elements */}
        <div className={styles.backgroundElements}>
          <div className={styles.floatingShape} style={{ '--delay': '0s' } as React.CSSProperties}></div>
          <div className={styles.floatingShape} style={{ '--delay': '3s' } as React.CSSProperties}></div>
          <div className={styles.floatingShape} style={{ '--delay': '6s' } as React.CSSProperties}></div>
          <div className={styles.particleField}></div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.infoSection}>
            <div className={styles.heroContent}>
              <div className={styles.sparkleIcon}>
                <Sparkles size={32} />
              </div>
              <h1>Ready to Register? Let's Do This! 🎓</h1>
              <p>
                This is it - the moment you officially become an Edufast student! Complete your registration below and 
                in just 6 months, you'll be walking across that virtual stage with your new degree. We're here to make 
                this as smooth and exciting as possible!
              </p>
              
              {/* Trust Building Elements */}
              <div className={styles.trustElements}>
                <div className={styles.counselorStatus}>
                  <div className={styles.onlineIndicator}></div>
                  <div>
                    <span className={styles.statusText}>Student Advisors Online</span>
                    <p className={styles.responseTime}>{getResponseTime()}</p>
                  </div>
                </div>

                <div className={styles.recentActivity}>
                  <div className={styles.activityHeader}>
                    <Users size={16} />
                    <span>Recent registrations</span>
                  </div>
                  <div className={styles.activityList}>
                    {recentInquiries.map((inquiry, index) => (
                      <div 
                        key={index} 
                        className={styles.activityItem}
                        style={{ '--delay': `${index * 0.5}s` } as React.CSSProperties}
                      >
                        <div className={styles.activityDot}></div>
                        <span>{inquiry.name} registered for <strong>{inquiry.program}</strong></span>
                        <span className={styles.activityTime}>{inquiry.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA after hero content */}
            <div className={styles.heroCTA}>
              <StrongCTA actions={['apply', 'counseling']} layout="horizontal" />
            </div>

            <div className={styles.contactOptions}>
              <h3>Need Help? We're Here For You:</h3>
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <Mail size={24} />
                  <div>
                    <h4>Email the Team</h4>
                    <a href="https://mail.google.com/mail/?view=cm&to=info@edufast.in" target="_blank" rel="noopener noreferrer">info@edufast.in</a>
                    <span className={styles.methodBenefit}>Perfect for detailed questions</span>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <Phone size={24} />
                  <div>
                    <h4>Call Right Now</h4>
                    <a href="tel:+18005550199">+91 95380 78333</a>
                    <span className={styles.methodBenefit}>Talk to a human immediately</span>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <WhatsAppButton
                    variant="minimal"
                    department="admissions"
                    messageContext={{ type: 'general' }}
                  />
                  <div>
                    <h4>WhatsApp Chat</h4>
                    <span className={styles.methodBenefit}>Quick questions, instant answers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA after contact options */}
            <div className={styles.contactCTA}>
              <StrongCTA actions={['brochure']} layout="vertical" />
            </div>

            {/* Mini Testimonial */}
            <div className={styles.miniTestimonial}>
              <div className={styles.quote}>
                "The registration process was so easy! Within minutes I was officially on my way to my new degree."
              </div>
              <div className={styles.author}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--warning)" />)}
                </div>
                <span>- Marcus T., Business Analytics Graduate</span>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.registrationFormContainer}>
              <RegistrationForm />
            </div>
          </div>
        </div>

        {/* Floating encouragement */}
        <div className={styles.floatingEncouragement}>
          <Heart size={16} />
          <span>You've got this!</span>
        </div>
      </div>
    </>
  );
};

export default ContactPage;