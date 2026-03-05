import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../helpers/useAuth';
import { Skeleton } from '../components/Skeleton';
import { FreelancerDashboardSidebar, type FreelancerSection } from '../components/FreelancerDashboardSidebar';
import { FreelancerDashboardContent } from '../components/FreelancerDashboardContent';
import { useFreelancerNotifications } from '../helpers/useFreelancerDashboard';
import styles from './freelancer-dashboard.module.css';

const WelcomeHeader: React.FC = () => {
  const { authState } = useAuth();

  if (authState.type !== 'authenticated') {
    return (
      <div className={styles.welcomeHeader}>
        <Skeleton style={{ width: '300px', height: '2rem', marginBottom: 'var(--spacing-2)' }} />
        <Skeleton style={{ width: '400px', height: '1rem' }} />
      </div>
    );
  }

  return (
    <div className={styles.welcomeHeader}>
      <h1 className={styles.welcomeTitle}>Welcome back, {authState.user.displayName}!</h1>
      <p className={styles.welcomeSubtitle}>Manage your students and track their admission progress.</p>
    </div>
  );
};

const FreelancerDashboardPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<FreelancerSection>('home');
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [studentAction, setStudentAction] = useState<'view' | 'edit' | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch notification count for badge
  const { data: notificationsData } = useFreelancerNotifications({
    page: 1,
    pageSize: 1,
    unreadOnly: true,
  });

  const notificationCount = notificationsData?.unreadCount || 0;

  // Handle section change
  const handleSectionChange = (section: FreelancerSection) => {
    setCurrentSection(section);
    setSelectedStudentId(null);
    setStudentAction(null);
  };

  // Handle student view/edit
  const handleViewStudent = (id: number) => {
    setSelectedStudentId(id);
    setStudentAction('view');
  };

  const handleEditStudent = (id: number) => {
    setSelectedStudentId(id);
    setStudentAction('edit');
  };

  const handleNavigateBack = () => {
    setSelectedStudentId(null);
    setStudentAction(null);
    setCurrentSection('students');
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>Freelancer Dashboard - Edufast</title>
        <meta name="description" content="Manage your students, track admissions, and view your earnings on Edufast." />
      </Helmet>
      
      <div className={styles.dashboardContainer}>
        <FreelancerDashboardSidebar
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          notificationCount={notificationCount}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <WelcomeHeader />
            
            <FreelancerDashboardContent
              currentSection={currentSection}
              selectedStudentId={selectedStudentId}
              studentAction={studentAction}
              onNavigateBack={handleNavigateBack}
              onViewStudent={handleViewStudent}
              onEditStudent={handleEditStudent}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelancerDashboardPage;