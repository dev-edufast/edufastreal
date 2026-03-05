import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';

import styles from './forgot-password.module.css';

const ForgotPasswordPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Forgot Password | Edufast</title>
        <meta
          name="description"
          content="Contact Edufast support to reset your account password."
        />
      </Helmet>
      <main className={styles.pageWrapper}>
        <div className={styles.authContainer}>
          <div className={styles.header}>
            <Link to="/" className={styles.logoLink}>
              <img 
                src="https://assets.floot.app/731b2326-1c69-4fc4-9e87-bdbe90c4ce17/acaeeaa8-bd5b-452c-aea9-fbba33b18b28.png"
                alt="Edufast Logo"
                className={styles.logoIcon}
              />
              <h1 className={styles.title}>Edufast</h1>
            </Link>
            <h2 className={styles.pageTitle}>Password Reset</h2>
            <p className={styles.subtitle}>
              For security reasons, password resets are handled by our support team. Please contact us using one of the methods below to regain access to your account.
            </p>
          </div>

          <div className={styles.contactList}>
            <a 
              href="https://mail.google.com/mail/?view=cm&to=info@edufast.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.contactItem}
            >
              <Mail size={20} className={styles.contactIcon} />
              <span>info@edufast.in</span>
            </a>
            
            <a href="tel:+919538078333" className={styles.contactItem}>
              <Phone size={20} className={styles.contactIcon} />
              <span>+91 95380 78333</span>
            </a>
            
            <WhatsAppButton 
              variant="minimal" 
              department="admissions" 
              className={styles.contactItem}
            >
              WhatsApp Us
            </WhatsAppButton>
          </div>

          <div className={styles.footer}>
            <Link to="/login" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPasswordPage;