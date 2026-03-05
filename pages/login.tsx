import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { PasswordLoginForm } from '../components/PasswordLoginForm';
import { PasswordRegisterForm } from '../components/PasswordRegisterForm';

import styles from './login.module.css';


type AuthMode = 'login' | 'signup';

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [searchParams] = useSearchParams();
  const isAdminLogin = searchParams.get('type') === 'admin';

  return (
    <>
      <Helmet>
        <title>{isAdminLogin ? 'Admin Login' : 'Login'} | Edufast</title>
        <meta
          name="description"
          content={isAdminLogin 
            ? "Admin login portal for Edufast management dashboard."
            : "Login or create an account to start your accelerated degree program with Edufast."
          }
        />
      </Helmet>
      <main className={styles.pageWrapper}>
        <div className={styles.authContainer}>
          <div className={styles.header}>
            <Link to="/" className={styles.logoLink}>
              <img 
                src="https://assets.floot.app/731b2326-1c69-4fc4-9e87-bdbe90c4ce17/acaeeaa8-bd5b-452c-aea9-fbba33b18b28.png"
                alt="Edufast - Modern Education with Graduation Cap, Graduate Figure and Open Book in Bright Orange Theme"
                className={styles.logoIcon}
              />
              <h1 className={styles.title}>Edufast</h1>
            </Link>
            <p className={styles.subtitle}>
              {isAdminLogin
                ? 'Admin Portal Access'
                : mode === 'login'
                ? 'Welcome back! Please login to your account.'
                : 'Create an account to get started.'}
            </p>
          </div>

          {!isAdminLogin && (
            <div className={styles.toggleContainer}>
              <button
                onClick={() => setMode('login')}
                className={`${styles.toggleButton} ${mode === 'login' ? styles.active : ''}`}
                aria-pressed={mode === 'login'}
              >
                Login
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`${styles.toggleButton} ${mode === 'signup' ? styles.active : ''}`}
                aria-pressed={mode === 'signup'}
              >
                Sign Up
              </button>
            </div>
          )}

          <div className={styles.formWrapper}>
            {(mode === 'login' || isAdminLogin) ? (
              <PasswordLoginForm />
            ) : (
              <PasswordRegisterForm onSwitchToLogin={() => setMode('login')} />
            )}
          </div>

          {(mode === 'login' || isAdminLogin) && !isAdminLogin && (
            <div className={styles.footer}>
              <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                Forgot Password?
              </Link>
            </div>
          )}
        </div>

        
      </main>
    </>
  );
};

export default LoginPage;