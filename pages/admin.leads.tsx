import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, UserPlus, Flame, TrendingUp } from 'lucide-react';
import { useAdminAnalytics, useAdminLeads } from '../helpers/useAdminData';
import { AdminLeadsSection } from '../components/AdminLeadsSection';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import styles from './admin.leads.module.css';

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

const AdminLeadsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: analyticsData, isFetching: isAnalyticsFetching } = useAdminAnalytics();
    const { data: hotLeadsData, isFetching: isHotLeadsFetching } = useAdminLeads({ 
    priority: 'High', 
    pageSize: 1,
    page: 1,
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });

  const stats = {
    totalLeads: analyticsData?.stats.totalLeads,
    newLeads: analyticsData?.leadStatusDistribution.find(s => s.status === 'New')?.count ?? 0,
    convertedLeads: analyticsData?.leadStatusDistribution.find(s => s.status === 'Converted')?.count ?? 0,
    hotLeads: hotLeadsData?.total,
  };

  return (
    <>
      <Helmet>
        <title>Lead Management | Edufast Admin</title>
        <meta name="description" content="Track, assess, and convert leads into successful enrollments." />
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Lead Management & Assessment</h1>
            <p className={styles.subtitle}>Track, assess, and convert leads into successful enrollments.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/admin/analytics')}>
            <ArrowLeft size={16} />
            Back to Analytics
          </Button>
        </header>

        <section className={styles.statsGrid}>
          <StatCard
            icon={<Users size={24} />}
            title="Total Leads"
            value={stats.totalLeads}
            isLoading={isAnalyticsFetching}
            className={styles.totalLeadsCard}
          />
          <StatCard
            icon={<UserPlus size={24} />}
            title="New Leads"
            value={stats.newLeads}
            isLoading={isAnalyticsFetching}
            className={styles.newLeadsCard}
          />
          <StatCard
            icon={<Flame size={24} />}
            title="Hot Leads"
            value={stats.hotLeads}
            isLoading={isHotLeadsFetching}
            className={styles.hotLeadsCard}
          />
          <StatCard
            icon={<TrendingUp size={24} />}
            title="Converted Leads"
            value={stats.convertedLeads}
            isLoading={isAnalyticsFetching}
            className={styles.convertedLeadsCard}
          />
        </section>

        <main className={styles.mainContent}>
          <AdminLeadsSection />
        </main>
      </div>
    </>
  );
};

export default AdminLeadsPage;