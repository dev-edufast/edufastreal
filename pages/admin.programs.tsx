import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Monitor, Zap, Building } from 'lucide-react';
import { useAdminPrograms } from '../helpers/useAdminData';
import { AdminProgramsSection } from '../components/AdminProgramsSection';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import styles from './admin.programs.module.css';

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

const AdminProgramsPage: React.FC = () => {
  const navigate = useNavigate();

    const { data: totalData, isFetching: isTotalFetching } = useAdminPrograms({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc' });
  const { data: onlineData, isFetching: isOnlineFetching } = useAdminPrograms({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', deliveryMode: 'Online' });
  const { data: hybridData, isFetching: isHybridFetching } = useAdminPrograms({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', deliveryMode: 'Hybrid' });
  const { data: offlineData, isFetching: isOfflineFetching } = useAdminPrograms({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', deliveryMode: 'Offline' });

  const stats = {
    totalPrograms: totalData?.total,
    onlinePrograms: onlineData?.total,
    hybridPrograms: hybridData?.total,
    offlinePrograms: offlineData?.total,
  };

  return (
    <>
      <Helmet>
        <title>Programs Management | Edufast Admin</title>
        <meta name="description" content="Create, update, and manage all academic programs offered by Edufast." />
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Programs Management</h1>
            <p className={styles.subtitle}>Create, update, and manage all academic programs offered by Edufast.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </header>

        <section className={styles.statsGrid}>
          <StatCard
            icon={<GraduationCap size={24} />}
            title="Total Programs"
            value={stats.totalPrograms}
            isLoading={isTotalFetching}
            className={styles.totalCard}
          />
          <StatCard
            icon={<Monitor size={24} />}
            title="Online Programs"
            value={stats.onlinePrograms}
            isLoading={isOnlineFetching}
            className={styles.onlineCard}
          />
          <StatCard
            icon={<Zap size={24} />}
            title="Hybrid Programs"
            value={stats.hybridPrograms}
            isLoading={isHybridFetching}
            className={styles.hybridCard}
          />
          <StatCard
            icon={<Building size={24} />}
            title="Offline Programs"
            value={stats.offlinePrograms}
            isLoading={isOfflineFetching}
            className={styles.offlineCard}
          />
        </section>

        <main className={styles.mainContent}>
          <AdminProgramsSection />
        </main>
      </div>
    </>
  );
};

export default AdminProgramsPage;