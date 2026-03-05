import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { User, Building } from 'lucide-react';
import styles from './admin-login.module.css';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Role Selection | Edufast</title>
        <meta
          name="description"
          content="Select your role to log in to the Edufast platform. Choose between Donor and Admin access."
        />
      </Helmet>
      <main className={styles.pageWrapper}>
        <div className={styles.selectionContainer}>
          <header className={styles.header}>
            <Link to="/" className={styles.logoLink}>
              <img
                src="https://assets.floot.app/731b2326-1c69-4fc4-9e87-bdbe90c4ce17/acaeeaa8-bd5b-452c-aea9-fbba33b18b28.png"
                alt="Edufast Logo"
                className={styles.logoIcon}
              />
              <h1 className={styles.title}>Edufast</h1>
            </Link>
            <p className={styles.subtitle}>Please select your login portal.</p>
          </header>

          <div className={styles.buttonContainer}>
            <div className={styles.buttonLink}>
              <Button 
                variant="primary" 
                size="lg" 
                className={styles.selectionButton}
                onClick={() => navigate('/login')}
              >
                                <User size={24} />
                <span>Student Login</span>
              </Button>
            </div>
            <div className={styles.buttonLink}>
              <Button 
                variant="secondary" 
                size="lg" 
                className={styles.selectionButton}
                onClick={() => navigate('/login?type=admin')}
              >
                <Building size={24} />
                <span>Admin Login</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminLoginPage;