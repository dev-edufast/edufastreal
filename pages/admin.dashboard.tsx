import React from 'react';
import { Helmet } from 'react-helmet';
import { AdminPageLayout } from '../components/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import { AdminUsersSection } from '../components/AdminUsersSection';
import { AdminLeadsSection } from '../components/AdminLeadsSection';
import { AdminProgramsSection } from '../components/AdminProgramsSection';
import { AdminCoursesSection } from '../components/AdminCoursesSection';
import { AdminTestimonialsSection } from '../components/AdminTestimonialsSection';
import { AdminRegistrationsSection } from '../components/AdminRegistrationsSection';
import { AdminCounselingSection } from '../components/AdminCounselingSection';
import { SuperAdminSettings } from '../components/SuperAdminSettings';
import { AdminAnalyticsDashboard } from '../components/AdminAnalyticsDashboard';
import styles from './admin.dashboard.module.css';

const AdminDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Super Admin Dashboard | Edufast</title>
        <meta name="description" content="Comprehensive dashboard for super administrators to manage all aspects of the Edufast platform." />
      </Helmet>
      <AdminPageLayout
        title="Super Admin Dashboard"
        subtitle="Complete control over all website data, user management, and system settings. Use these tools with care."
      >
        <div className={styles.container}>
          <Tabs defaultValue="overview" className={styles.tabs}>
            <TabsList className={styles.tabsList}>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="registrations">Registrations</TabsTrigger>
              <TabsTrigger value="counseling">Counseling</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="courses">E-Learning</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className={styles.tabContent}>
              <AdminAnalyticsDashboard />
            </TabsContent>
            <TabsContent value="users" className={styles.tabContent}>
              <AdminUsersSection />
            </TabsContent>
            <TabsContent value="leads" className={styles.tabContent}>
              <AdminLeadsSection />
            </TabsContent>
            <TabsContent value="registrations" className={styles.tabContent}>
              <AdminRegistrationsSection />
            </TabsContent>
            <TabsContent value="counseling" className={styles.tabContent}>
              <AdminCounselingSection />
            </TabsContent>
            <TabsContent value="programs" className={styles.tabContent}>
              <AdminProgramsSection />
            </TabsContent>
            <TabsContent value="courses" className={styles.tabContent}>
              <AdminCoursesSection />
            </TabsContent>
            <TabsContent value="testimonials" className={styles.tabContent}>
              <AdminTestimonialsSection />
            </TabsContent>
            <TabsContent value="settings" className={styles.tabContent}>
              <SuperAdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </AdminPageLayout>
    </>
  );
};

export default AdminDashboardPage;