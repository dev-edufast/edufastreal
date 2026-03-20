import React, { useMemo, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../helpers/useAuth';
import {
  UsersIcon,
  ClipboardList,
  CalendarCheck,
  FileCheck2,
  BarChart3,
  BookOpen,
  UserCog,
  AlertCircle,
  GraduationCap,
  Building2,
  Star,
  Settings,
  TrendingUp,
} from 'lucide-react';
import { useAdminAnalytics } from '../helpers/useAdminData';
import { Skeleton } from '../components/Skeleton';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import { AdminLeadsSection } from '../components/AdminLeadsSection';
import { AdminUsersSection } from '../components/AdminUsersSection';
import { AdminCoursesSection } from '../components/AdminCoursesSection';
import { AdminRegistrationsSection } from '../components/AdminRegistrationsSection';
import { AdminCounselingSection } from '../components/AdminCounselingSection';
import { AdminProgramsSection } from '../components/AdminProgramsSection';
import { AdminUniversitiesSection } from '../components/AdminUniversitiesSection';
import { AdminTestimonialsSection } from '../components/AdminTestimonialsSection';
import { SuperAdminSettings } from '../components/SuperAdminSettings';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../components/Chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import styles from './admin.module.css';

const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  isLoading: boolean;
}> = ({ title, value, icon, isLoading }) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statContent}>
      <h3 className={styles.statTitle}>{title}</h3>
      {isLoading ? (
        <Skeleton style={{ width: '80px', height: '2rem' }} />
      ) : (
        <p className={styles.statValue}>{value}</p>
      )}
    </div>
  </div>
);

const DashboardOverview: React.FC = () => {
  const { data, isFetching, error } = useAdminAnalytics();

  const stats = [
    {
      title: 'Total Leads',
      value: data?.stats.totalLeads,
      icon: <UsersIcon size={24} />,
    },
    {
      title: 'Total Registrations',
      value: data?.stats.totalRegistrations,
      icon: <ClipboardList size={24} />,
    },
    {
      title: 'Counseling Bookings',
      value: data?.stats.totalBookings,
      icon: <CalendarCheck size={24} />,
    },
    {
      title: 'Eligibility Checks',
      value: data?.stats.totalEligibilityChecks,
      icon: <FileCheck2 size={24} />,
    },
  ];

  const leadChartConfig = {
    count: { label: 'Leads', color: 'var(--primary)' },
  };
  const regChartConfig = {
    count: { label: 'Registrations', color: 'var(--secondary)' },
  };

  if (error) {
    return (
      <div className={`${styles.card} ${styles.errorCard}`}>
        <AlertCircle size={24} />
        <p>Could not load dashboard analytics.</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContent}>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value ?? 0}
            icon={stat.icon}
            isLoading={isFetching}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <BarChart3 size={20} />
            <h2 className={styles.cardTitle}>Lead Status Distribution</h2>
          </div>
          {isFetching ? (
            <Skeleton style={{ height: '300px' }} />
          ) : (
            <div className={styles.chartContainer}>
              <ChartContainer config={leadChartConfig}>
                <BarChart data={data?.leadStatusDistribution}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="status"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <BarChart3 size={20} />
            <h2 className={styles.cardTitle}>Registration Status Distribution</h2>
          </div>
          {isFetching ? (
            <Skeleton style={{ height: '300px' }} />
          ) : (
            <div className={styles.chartContainer}>
              <ChartContainer config={regChartConfig}>
                <BarChart data={data?.registrationStatusDistribution}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="status"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDashboardPage: React.FC = () => {
  const { authState } = useAuth();
  const router = useRouter();

  // Get current user role
  const userRole = authState.type === 'authenticated' ? authState.user.role : null;

    // Redirect super_admin to dashboard
  useEffect(() => {
    if (authState.type === 'authenticated' && userRole === 'super_admin') {
      console.log('Redirecting super admin to super admin dashboard');
      router.push('/admin/dashboard');
    }
  }, [authState.type, userRole, router]);

  // Determine which tabs should be visible based on role
  const canAccessAdminFeatures = useMemo(() => {
    return userRole === 'super_admin' || userRole === 'admin';
  }, [userRole]);

  const isSuperAdmin = useMemo(() => {
    return userRole === 'super_admin';
  }, [userRole]);

  // Format role for display
  const roleLabel = useMemo(() => {
    if (!userRole) return 'Loading...';
    return userRole
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [userRole]);

  // Role badge variant
  const roleBadgeVariant = useMemo(() => {
    if (userRole === 'super_admin') return 'destructive';
    if (userRole === 'admin') return 'primary';
    return 'secondary';
  }, [userRole]);

  if (authState.type === 'loading') {
    return (
      <div className={styles.dashboardContainer}>
        <Skeleton style={{ height: '100px', marginBottom: 'var(--spacing-8)' }} />
        <Skeleton style={{ height: '400px' }} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Edufast</title>
        <meta
          name="description"
          content="Comprehensive admin dashboard for managing leads, registrations, programs, and more."
        />
      </Head>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>Admin Dashboard</h1>
              <p className={styles.subtitle}>
                Comprehensive control panel for managing all aspects of the Edufast platform.
              </p>
            </div>
            <div className={styles.headerActions}>
              {isSuperAdmin && (
                <Link href="/admin/analytics" passHref>
                  <Button asChild variant="secondary" size="lg" className={styles.analyticsButton}>
                    <a>
                      <TrendingUp size={20} />
                      View Analytics Dashboard
                    </a>
                  </Button>
                </Link>
              )}
              {userRole && (
                <Badge variant={roleBadgeVariant} size="lg">
                  {roleLabel}
                </Badge>
              )}
            </div>
          </div>
        </header>

        <Tabs defaultValue="overview" className={styles.mainTabs}>
          <TabsList className={styles.mainTabsList}>
            <TabsTrigger value="overview">
              <BarChart3 size={16} /> Overview
            </TabsTrigger>
            <TabsTrigger value="leads">
              <UsersIcon size={16} /> Leads
            </TabsTrigger>
            <TabsTrigger value="registrations">
              <ClipboardList size={16} /> Registrations
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <CalendarCheck size={16} /> Counseling
            </TabsTrigger>
            {canAccessAdminFeatures && (
              <>
                <TabsTrigger value="courses">
                  <BookOpen size={16} /> Courses
                </TabsTrigger>
                <TabsTrigger value="users">
                  <UserCog size={16} /> Users
                </TabsTrigger>
                <TabsTrigger value="programs">
                  <GraduationCap size={16} /> Programs
                </TabsTrigger>
                <TabsTrigger value="universities">
                  <Building2 size={16} /> Universities
                </TabsTrigger>
                <TabsTrigger value="testimonials">
                  <Star size={16} /> Testimonials
                </TabsTrigger>
              </>
            )}
            {isSuperAdmin && (
              <TabsTrigger value="settings">
                <Settings size={16} /> Settings
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className={styles.tabContent}>
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="leads" className={styles.tabContent}>
            <AdminLeadsSection />
          </TabsContent>

          <TabsContent value="registrations" className={styles.tabContent}>
            <AdminRegistrationsSection />
          </TabsContent>

          <TabsContent value="bookings" className={styles.tabContent}>
            <AdminCounselingSection />
          </TabsContent>

          {canAccessAdminFeatures ? (
            <>
              <TabsContent value="courses" className={styles.tabContent}>
                <AdminCoursesSection />
              </TabsContent>

              <TabsContent value="users" className={styles.tabContent}>
                <AdminUsersSection />
              </TabsContent>

              <TabsContent value="programs" className={styles.tabContent}>
                <AdminProgramsSection />
              </TabsContent>

              <TabsContent value="universities" className={styles.tabContent}>
                <AdminUniversitiesSection />
              </TabsContent>

              <TabsContent value="testimonials" className={styles.tabContent}>
                <AdminTestimonialsSection />
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="courses" className={styles.tabContent}>
                <div className={`${styles.card} ${styles.accessDeniedCard}`}>
                  <AlertCircle size={24} />
                  <div>
                    <h3 className={styles.accessDeniedTitle}>Access Restricted</h3>
                    <p className={styles.accessDeniedText}>
                      This section is only available to administrators. Please contact a super admin if you need access.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="users" className={styles.tabContent}>
                <div className={`${styles.card} ${styles.accessDeniedCard}`}>
                  <AlertCircle size={24} />
                  <div>
                    <h3 className={styles.accessDeniedTitle}>Access Restricted</h3>
                    <p className={styles.accessDeniedText}>
                      User management is only available to administrators. Please contact a super admin if you need access.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="programs" className={styles.tabContent}>
                <div className={`${styles.card} ${styles.accessDeniedCard}`}>
                  <AlertCircle size={24} />
                  <div>
                    <h3 className={styles.accessDeniedTitle}>Access Restricted</h3>
                    <p className={styles.accessDeniedText}>
                      Program management is only available to administrators. Please contact a super admin if you need access.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="universities" className={styles.tabContent}>
                <div className={`${styles.card} ${styles.accessDeniedCard}`}>
                  <AlertCircle size={24} />
                  <div>
                    <h3 className={styles.accessDeniedTitle}>Access Restricted</h3>
                    <p className={styles.accessDeniedText}>
                      University management is only available to administrators. Please contact a super admin if you need access.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="testimonials" className={styles.tabContent}>
                <div className={`${styles.card} ${styles.accessDeniedCard}`}>
                  <AlertCircle size={24} />
                  <div>
                    <h3 className={styles.accessDeniedTitle}>Access Restricted</h3>
                    <p className={styles.accessDeniedText}>
                      Testimonial management is only available to administrators. Please contact a super admin if you need access.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </>
          )}

          {isSuperAdmin ? (
            <TabsContent value="settings" className={styles.tabContent}>
              <SuperAdminSettings />
            </TabsContent>
          ) : (
            <TabsContent value="settings" className={styles.tabContent}>
              <div className={`${styles.card} ${styles.accessDeniedCard}`}>
                <AlertCircle size={24} />
                <div>
                  <h3 className={styles.accessDeniedTitle}>Access Restricted</h3>
                  <p className={styles.accessDeniedText}>
                    System settings are only available to super administrators.
                  </p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboardPage;