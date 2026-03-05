import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Crown, Shield, Briefcase, User } from 'lucide-react';
import { useAdminUsers } from '../helpers/useAdminData';
import { AdminUsersSection } from '../components/AdminUsersSection';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import styles from './admin.users.module.css';

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

const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();

    const { data: totalData, isFetching: isTotalFetching } = useAdminUsers({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc' });
  const { data: superAdminData, isFetching: isSuperAdminFetching } = useAdminUsers({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', role: 'super_admin' });
  const { data: adminData, isFetching: isAdminFetching } = useAdminUsers({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', role: 'admin' });
  const { data: counselorData, isFetching: isCounselorFetching } = useAdminUsers({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', role: 'counselor' });
  const { data: userData, isFetching: isUserFetching } = useAdminUsers({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', role: 'user' });

  const stats = {
    totalUsers: totalData?.total,
    superAdmins: superAdminData?.total,
    admins: adminData?.total,
    counselors: counselorData?.total,
    regularUsers: userData?.total,
  };

  return (
    <>
      <Helmet>
        <title>User Management | Edufast Admin</title>
        <meta name="description" content="Manage all system users, roles, and permissions." />
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>User Management</h1>
            <p className={styles.subtitle}>Manage all system users, roles, and permissions.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </header>

        <section className={styles.statsGrid}>
          <StatCard
            icon={<Users size={24} />}
            title="Total Users"
            value={stats.totalUsers}
            isLoading={isTotalFetching}
            className={styles.totalCard}
          />
          <StatCard
            icon={<Crown size={24} />}
            title="Super Admins"
            value={stats.superAdmins}
            isLoading={isSuperAdminFetching}
            className={styles.superAdminCard}
          />
          <StatCard
            icon={<Shield size={24} />}
            title="Admins"
            value={stats.admins}
            isLoading={isAdminFetching}
            className={styles.adminCard}
          />
          <StatCard
            icon={<Briefcase size={24} />}
            title="Counselors"
            value={stats.counselors}
            isLoading={isCounselorFetching}
            className={styles.counselorCard}
          />
          <StatCard
            icon={<User size={24} />}
            title="Regular Users"
            value={stats.regularUsers}
            isLoading={isUserFetching}
            className={styles.userCard}
          />
        </section>

        <main className={styles.mainContent}>
          <AdminUsersSection />
        </main>
      </div>
    </>
  );
};

export default AdminUsersPage;