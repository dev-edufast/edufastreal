import React from 'react';
import { Helmet } from 'react-helmet';
import SectionHeader from '../components/SectionHeader';
import { LeadMagnet } from '../components/LeadMagnet';
import { useLeadMagnets } from '../helpers/useLeadMagnets';
import { Skeleton } from '../components/Skeleton';
import styles from './resources.module.css';

const ResourcesPage = () => {
  const { data: leadMagnets, isLoading, error } = useLeadMagnets();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <Skeleton style={{ height: '200px', width: '100%' }} />
              <div className={styles.skeletonContent}>
                <Skeleton style={{ height: '1.5rem', width: '80%', marginBottom: 'var(--spacing-2)' }} />
                <Skeleton style={{ height: '1rem', width: '100%' }} />
                <Skeleton style={{ height: '1rem', width: '90%', marginTop: 'var(--spacing-1)' }} />
                <Skeleton style={{ height: '2.5rem', width: '100%', marginTop: 'var(--spacing-6)' }} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.error}>
          <p>Failed to load resources. Please try again later.</p>
        </div>
      );
    }

    if (!leadMagnets || leadMagnets.length === 0) {
      return (
        <div className={styles.empty}>
          <p>No resources available at the moment. Please check back soon!</p>
        </div>
      );
    }

    return (
      <div className={styles.grid}>
        {leadMagnets.map((magnet) => (
          <LeadMagnet
            key={magnet.id}
            id={magnet.id}
            title={magnet.title}
            description={magnet.description}
            thumbnailUrl={magnet.thumbnailUrl}
            fileUrl={magnet.fileUrl}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Free Resources & Guides | Edufast</title>
        <meta
          name="description"
          content="Access exclusive guides, brochures, and assessments from Edufast. Download our free resources to get expert insights into fast-tracking your degree and advancing your career."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        <SectionHeader
          title="Free Resources & Guides"
          subtitle="Download our expert-curated guides, brochures, and checklists to help you on your educational journey. Get valuable insights delivered straight to your inbox."
        />
        {renderContent()}
      </div>
    </>
  );
};

export default ResourcesPage;