import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, CheckCircle, CheckCheck, XCircle } from 'lucide-react';
import { useAdminAnalytics } from '../helpers/useAdminData';
import { AdminCounselingSection } from '../components/AdminCounselingSection';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import styles from './admin.counseling-bookings.module.css';

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

const AdminCounselingBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: analyticsData, isFetching: isAnalyticsFetching } = useAdminAnalytics();

  const getStatusCount = (status: string): number => {
    return analyticsData?.bookingStatusDistribution.find(s => s.status === status)?.count ?? 0;
  };

  const stats = {
    totalBookings: analyticsData?.stats.totalBookings,
    pendingBookings: getStatusCount('Pending'),
    confirmedBookings: getStatusCount('Confirmed'),
    completedBookings: getStatusCount('Completed'),
    cancelledBookings: getStatusCount('Cancelled'),
  };

  return (
    <>
      <Helmet>
        <title>Counseling Bookings Management | Edufast Admin</title>
        <meta name="description" content="Manage and track all counseling session bookings." />
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Counseling Bookings Management</h1>
            <p className={styles.subtitle}>Manage and track all counseling session bookings.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </header>

        <section className={styles.statsGrid}>
          <StatCard
            icon={<Calendar size={24} />}
            title="Total Bookings"
            value={stats.totalBookings}
            isLoading={isAnalyticsFetching}
            className={styles.totalCard}
          />
          <StatCard
            icon={<Clock size={24} />}
            title="Pending Bookings"
            value={stats.pendingBookings}
            isLoading={isAnalyticsFetching}
            className={styles.pendingCard}
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            title="Confirmed Bookings"
            value={stats.confirmedBookings}
            isLoading={isAnalyticsFetching}
            className={styles.confirmedCard}
          />
          <StatCard
            icon={<CheckCheck size={24} />}
            title="Completed Bookings"
                        value={stats.completedBookings}
            isLoading={isAnalyticsFetching}
            className={styles.completedCard}
          />
          <StatCard
            icon={<XCircle size={24} />}
            title="Cancelled Bookings"
            value={stats.cancelledBookings}
            isLoading={isAnalyticsFetching}
            className={styles.cancelledCard}
          />
        </section>

        <main className={styles.mainContent}>
          <AdminCounselingSection />
        </main>
      </div>
    </>
  );
};

export default AdminCounselingBookingsPage;