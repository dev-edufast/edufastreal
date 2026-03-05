import React from 'react';
import { Helmet } from 'react-helmet';
import { SectionHeader } from '../components/SectionHeader';
import { ProgramComparison } from '../components/ProgramComparison';
import { StrongCTA } from '../components/StrongCTA';
import styles from './compare-programs.module.css';

const CompareProgramsPage = () => {
  return (
    <>
      <Helmet>
        <title>Compare Programs | Edufast</title>
        <meta
          name="description"
          content="Compare Edufast's fast-track degree programs side-by-side. Analyze duration, fees, eligibility, and career outcomes to find the perfect fit for your goals."
        />
      </Helmet>
      <div className={styles.pageContainer}>
        <SectionHeader
          title="Compare Our Programs"
          subtitle="Use our interactive tool to compare up to four programs at once. Make an informed decision about your future by analyzing key details side-by-side."
        />
        <StrongCTA actions={['apply', 'counseling']} className={styles.headerCta} />
        <div className={styles.comparisonWrapper}>
          <ProgramComparison />
        </div>
        <StrongCTA actions={['apply', 'brochure', 'counseling']} className={styles.footerCta} />
      </div>
    </>
  );
};

export default CompareProgramsPage;