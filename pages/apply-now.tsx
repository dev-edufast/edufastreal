import React from 'react';
import { Helmet } from 'react-helmet';
import { RegistrationForm } from '../components/RegistrationForm';
import { CheckCircle, ShieldCheck, TrendingUp } from 'lucide-react';
import { StrongCTA } from '../components/StrongCTA';
import styles from './apply-now.module.css';

const ApplyNowPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Apply Now | Edufast</title>
        <meta
          name="description"
          content="Start your application to Edufast's accelerated 6-month degree programs. Complete the registration form to begin your journey towards a new career."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        <div className={styles.backgroundGradient}></div>
        <div className={styles.contentWrapper}>
          <header className={styles.header}>
            <h1>Your Future Starts Now</h1>
            <p className={styles.subtitle}>
              Complete your application in minutes and take the first step towards earning your degree in just 6 months.
            </p>
          </header>

          {/* Strong CTA after header section */}
          <div className={styles.headerCTA}>
            <StrongCTA actions={['counseling', 'apply']} />
          </div>

          <div className={styles.mainContent}>
            <aside className={styles.infoPanel}>
              <h2>The Edufast Advantage</h2>
              <p>
                By applying today, you're not just enrolling in a program; you're fast-tracking your career. Here’s what to expect:
              </p>
              <ul className={styles.advantageList}>
                <li>
                  <CheckCircle size={20} className={styles.advantageIcon} />
                  <div>
                    <h3>Streamlined Process</h3>
                    <p>Our multi-step form is designed to be simple and intuitive, saving you time.</p>
                  </div>
                </li>
                <li>
                  <TrendingUp size={20} className={styles.advantageIcon} />
                  <div>
                    <h3>Accelerated Path</h3>
                    <p>Get on the fast track to graduation. Our model is built for speed and efficiency.</p>
                  </div>
                </li>
                <li>
                  <ShieldCheck size={20} className={styles.advantageIcon} />
                  <div>
                    <h3>Secure & Confidential</h3>
                    <p>Your data is protected. We use secure systems to handle your application with care.</p>
                  </div>
                </li>
              </ul>
              <div className={styles.quote}>
                <p>"The application was the easiest part. It felt like the first win on my journey to a new career."</p>
                <span>- Jessica L., BBA Graduate</span>
              </div>
              
              {/* CTA after advantages list */}
              <div className={styles.infoPanelCTA}>
                <StrongCTA actions={['brochure', 'counseling']} layout="vertical" />
              </div>
            </aside>
            <main className={styles.formSection}>
              <RegistrationForm />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyNowPage;