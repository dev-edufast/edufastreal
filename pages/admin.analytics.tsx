import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AdminPageLayout } from '../components/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import { AdminAnalyticsDashboard } from '../components/AdminAnalyticsDashboard';
import { AttributionAnalytics } from '../components/AttributionAnalytics';
import { JourneyAnalytics } from '../components/JourneyAnalytics';
import { ConversionFunnels } from '../components/ConversionFunnels';
import { Button } from '../components/Button';
import { TrendingUp, ArrowLeft, Download } from 'lucide-react';
import { toast } from 'sonner';
import styles from './admin.analytics.module.css';

export default function AdminAnalyticsPage() {
  const handleExportData = () => {
    toast.info('Export feature coming soon!', {
      description: 'Data export functionality will be available in a future update.',
    });
  };

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | Edufast Admin</title>
        <meta name="description" content="Comprehensive analytics dashboard for monitoring leads, registrations, conversions, attribution, and user behavior patterns." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
            <AdminPageLayout
                title="Super Admin Dashboard"
        subtitle="Comprehensive insights into leads, registrations, conversions, and user behavior"
      >
        <div className={styles.headerActions}>
          <Button variant="outline" size="md" asChild>
            <Link to="/admin">
              <ArrowLeft size={16} />
              Back to Admin Dashboard
            </Link>
          </Button>
          <Button variant="secondary" size="md" onClick={handleExportData}>
            <Download size={16} />
            Export Data
          </Button>
        </div>

        <Tabs defaultValue="overview" className={styles.tabsContainer}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attribution">Attribution</TabsTrigger>
            <TabsTrigger value="journeys">User Journeys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className={styles.tabContent}>
            <div className={styles.overviewContent}>
              <AdminAnalyticsDashboard />
              <div className={styles.funnelSection}>
                <ConversionFunnels />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="attribution" className={styles.tabContent}>
            <AttributionAnalytics />
          </TabsContent>
          
          <TabsContent value="journeys" className={styles.tabContent}>
            <JourneyAnalytics />
          </TabsContent>
        </Tabs>
      </AdminPageLayout>
    </>
  );
}