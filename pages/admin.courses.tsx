import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Eye, FileText, Archive } from 'lucide-react';
import { useAdminCourses } from '../helpers/useAdminData';
import { AdminCoursesSection } from '../components/AdminCoursesSection';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import styles from './admin.courses.module.css';

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

const AdminCoursesPage: React.FC = () => {
  const navigate = useNavigate();

    const { data: totalData, isFetching: isTotalFetching } = useAdminCourses({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc' });
  const { data: publishedData, isFetching: isPublishedFetching } = useAdminCourses({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', status: 'Published' });
  const { data: draftData, isFetching: isDraftFetching } = useAdminCourses({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', status: 'Draft' });
  const { data: archivedData, isFetching: isArchivedFetching } = useAdminCourses({ page: 1, pageSize: 1, sortBy: 'createdAt', sortDirection: 'desc', status: 'Archived' });

  const stats = {
    totalCourses: totalData?.total,
    publishedCourses: publishedData?.total,
    draftCourses: draftData?.total,
    archivedCourses: archivedData?.total,
  };

  return (
    <>
      <Helmet>
        <title>E-Learning Courses Management | Edufast Admin</title>
        <meta name="description" content="Create, update, and manage all online e-learning courses offered by Edufast." />
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>E-Learning Courses Management</h1>
            <p className={styles.subtitle}>Create, update, and manage all online courses offered by Edufast.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </header>

        <section className={styles.statsGrid}>
          <StatCard
            icon={<BookOpen size={24} />}
            title="Total Courses"
            value={stats.totalCourses}
            isLoading={isTotalFetching}
            className={styles.totalCard}
          />
          <StatCard
            icon={<Eye size={24} />}
            title="Published Courses"
            value={stats.publishedCourses}
            isLoading={isPublishedFetching}
            className={styles.publishedCard}
          />
          <StatCard
            icon={<FileText size={24} />}
            title="Draft Courses"
            value={stats.draftCourses}
            isLoading={isDraftFetching}
            className={styles.draftCard}
          />
          <StatCard
            icon={<Archive size={24} />}
            title="Archived Courses"
            value={stats.archivedCourses}
            isLoading={isArchivedFetching}
            className={styles.archivedCard}
          />
        </section>

        <main className={styles.mainContent}>
          <AdminCoursesSection />
        </main>
      </div>
    </>
  );
};

export default AdminCoursesPage;