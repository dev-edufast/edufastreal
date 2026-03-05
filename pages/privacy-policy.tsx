import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './terms-and-conditions.module.css'; // Reusing the same styles

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Edufast</title>
        <meta name="description" content="Learn how Edufast collects, uses, and protects your personal data. Our privacy policy covers data sharing with partner institutions, your rights, and our cookie policy." />
      </Helmet>
      <div className={styles.legalPageContainer}>
        <div className={styles.header}>
          <h1>Privacy Policy</h1>
          <p>Last Updated: October 26, 2023</p>
        </div>

        <div className={styles.content}>
          <section>
            <h2>1. Introduction</h2>
            <p>
              Edufast ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully.
            </p>
          </section>

          <section>
            <h2>2. Data Collection and Usage</h2>
            <p>We collect personal information that you voluntarily provide to us when you register, express an interest in obtaining information about us or our products and services, or otherwise contact us. The personal information we collect may include:</p>
            <ul>
              <li>Contact Information (e.g., name, email address, phone number)</li>
              <li>Educational and Professional Background</li>
              <li>Application Documents (e.g., transcripts, certificates)</li>
              <li>Payment Information</li>
            </ul>
            <p>We use this information to provide and manage our consulting services, process your applications, communicate with you, process payments, and comply with legal obligations.</p>
          </section>

          <section>
            <h2>3. Third-Party Sharing</h2>
            <p>
              To facilitate your admission, we must share your personal and academic information with our Partner Institutions. This sharing is essential for the application, review, and enrollment process. We only share the information necessary for these purposes.
            </p>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties other than our trusted Partner Institutions and service providers who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2>4. User Rights</h2>
            <p>You have certain rights regarding your personal data, including:</p>
            <ul>
              <li>The right to access, update, or delete the information we have on you.</li>
              <li>The right to object to our processing of your personal data.</li>
              <li>The right to request that we restrict the processing of your personal information.</li>
              <li>The right to data portability.</li>
            </ul>
            <p>To exercise these rights, please contact us at the details provided below.</p>
          </section>

          <section>
            <h2>5. Security Measures</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers, and we use encryption to protect sensitive information transmitted online. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2>6. Cookie Policy</h2>
            <p>
              Our website uses "cookies" to enhance your experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser that enables the site's systems to recognize your browser and capture and remember certain information. We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction.
            </p>
          </section>

          <section>
            <h2>7. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@edufast.in">info@edufast.in</a> or call us at <a href="tel:+919538078333">+91 95380 78333</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;