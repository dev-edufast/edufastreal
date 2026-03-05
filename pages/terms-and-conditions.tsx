import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './terms-and-conditions.module.css';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | Edufast</title>
        <meta name="description" content="Read the Terms and Conditions for using Edufast's educational consulting services. Understand our policies, user responsibilities, and liability limitations." />
      </Helmet>
      <div className={styles.legalPageContainer}>
        <div className={styles.header}>
          <h1>Terms and Conditions</h1>
          <p>Last Updated: October 26, 2023</p>
        </div>

        <div className={styles.content}>
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to Edufast. These Terms and Conditions ("Terms") govern your use of our website and the educational consulting services we provide. By accessing our website or using our services, you agree to be bound by these Terms. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2>2. Service Disclaimer</h2>
            <p>
              Edufast provides educational consulting services to facilitate admission into degree programs offered by third-party universities and educational institutions ("Partner Institutions"). We are not a university and do not grant degrees. Our role is to guide, support, and manage the application and enrollment process on behalf of our clients.
            </p>
            <p>
              The successful acquisition of a degree is contingent upon the student's satisfactory completion of all academic requirements set forth by the Partner Institution. Edufast does not guarantee admission or the successful completion of any degree program.
            </p>
          </section>

          <section>
            <h2>3. Relationship with Third-Party Institutions</h2>
            <p>
              Edufast maintains partnerships with various universities and educational bodies. However, we are an independent entity. All academic programs, curricula, assessments, and degree conferrals are the sole responsibility of the respective Partner Institution. We act as a facilitator and are not responsible for the academic quality, content, or recognition of the programs offered by our partners.
            </p>
          </section>

          <section>
            <h2>4. User Responsibilities</h2>
            <p>As a user of our services, you agree to:</p>
            <ul>
              <li>Provide accurate, complete, and current information during the application and consultation process.</li>
              <li>Comply with all academic and conduct policies of the Partner Institution you are enrolled in.</li>
              <li>Meet all deadlines for document submission, fee payments, and other administrative requirements.</li>
              <li>Maintain the confidentiality of your account information and be responsible for all activities that occur under your account.</li>
            </ul>
          </section>

          <section>
            <h2>5. Payment Terms</h2>
            <p>
              All fees for Edufast's consulting services are due as per the payment schedule provided to you. Payments must be made in full and on time to ensure the continuation of services. Failure to make timely payments may result in the suspension or termination of our services.
            </p>
            <p>
              Please refer to our <Link to="/refund-policy">Refund Policy</Link> for detailed information on the non-refundable nature of our service fees. All payments made to Edufast are for the consulting and facilitation services rendered and are separate from any tuition fees or other charges levied by the Partner Institutions.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Edufast shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions or content.
            </p>
            <p>
              Our total liability to you for any and all claims arising from the use of our services is limited to the total amount of service fees paid by you to Edufast.
            </p>
          </section>

          <section>
            <h2>7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
            </p>
          </section>

          <section>
            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:info@edufast.in">info@edufast.in</a> or call us at <a href="tel:+919538078333">+91 95380 78333</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;