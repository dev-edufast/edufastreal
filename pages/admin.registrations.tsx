import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAdminAnalytics } from '../helpers/useAdminData';
import { AdminRegistrationsSection } from '../components/AdminRegistrationsSection';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import styles from './admin.registrations.module.css';

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: number | undefined;
  isLoading: boolean;
  className?: string;
}> = ({ icon, title, value, isLoading, className = '' }) => {
  return (
    <div className={`${styles.statCard} ${className}`}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statContent}>
        <h3 className={styles.statTitle}>{title}</h3>
        {isLoading ? (
          <Skeleton style={{ height: '2rem', width: '60px' }} />
        ) : (
          <p className={styles.statValue}>{value?.toLocaleString() ?? 'N/A'}</p>
        )}
      </div>
    </div>
  );
};

const AdminRegistrationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: analyticsData, isFetching: isAnalyticsFetching } = useAdminAnalytics();

  const getStatusCount = (status: string): number => {
    return analyticsData?.registrationStatusDistribution.find(s => s.status === status)?.count ?? 0;
  };

  const stats = {
    totalRegistrations: analyticsData?.stats.totalRegistrations,
    pendingRegistrations: getStatusCount('Pending'),
    approvedRegistrations: getStatusCount('Approved'),
    rejectedRegistrations: getStatusCount('Rejected'),
  };

  return (
    <>
      <Helmet>
        <title>Registration Management | Edufast Admin</title>
        <meta name="description" content="Review, manage, and process student registrations." />
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Registration Management</h1>
            <p className={styles.subtitle}>Review, manage, and process student registrations efficiently.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </header>

        <section className={styles.statsGrid}>
          <StatCard
            icon={<FileText size={24} />}
            title="Total Registrations"
            value={stats.totalRegistrations}
            isLoading={isAnalyticsFetching}
            className={styles.totalCard}
          />
          <StatCard
            icon={<Clock size={24} />}
            title="Pending Registrations"
            value={stats.pendingRegistrations}
            isLoading={isAnalyticsFetching}
            className={styles.pendingCard}
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            title="Approved Registrations"
            value={stats.approvedRegistrations}
            isLoading={isAnalyticsFetching}
            className={styles.approvedCard}
          />
          <StatCard
            icon={<XCircle size={24} />}
            title="Rejected Registrations"
            value={stats.rejectedRegistrations}
            isLoading={isAnalyticsFetching}
            className={styles.rejectedCard}
          />
        </section>

        <main className={styles.mainContent}>
          <AdminRegistrationsSection />
        </main>
      </div>
    </>
  );
};

export default AdminRegistrationsPage;