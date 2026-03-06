import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { useUniversitiesList } from '../helpers/useUniversitySearch';
import { useUniversitiesFilter } from '../helpers/useUniversitiesFilter';
import { UniversityCard } from '../components/UniversityCard';
import { Skeleton } from '../components/Skeleton';
import { UniversitiesFilterBar } from '../components/UniversitiesFilterBar';
import { Building2, GraduationCap, LibraryBig, Star } from 'lucide-react';
import styles from './universities.module.css';

export default function UniversitiesPage() {
  const { universities, isLoading } = useUniversitiesList();
  
  const {
    filters,
    setSearchQuery,
    setSelectedLocation,
    setSelectedProgram,
    clearFilters,
    filteredUniversities,
    locations,
    programs,
  } = useUniversitiesFilter(universities);

  const totalUniversities = universities?.length || 0;
  const totalCourses = universities?.reduce((acc, uni) => acc + (uni.programs?.length || 0), 0) || 0;
  
  const featuredUniversities = filteredUniversities.filter(u => u.isFeatured);
  const regularUniversities = filteredUniversities.filter(u => !u.isFeatured);

  return (
    <>
      <SEOHead
        title="Our Partner Universities | Fast-Track Your Degree"
        description="Explore our network of accredited partner universities. Get your recognized degree in just 6 months from top institutions worldwide."
        canonicalUrl="/universities"
      />

      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Our Partner Universities</h1>
            <p className={styles.subtitle}>
              We partner with prestigious, fully accredited institutions worldwide to bring you accelerated degree programs that are recognized globally.
            </p>
            
            {!isLoading && totalUniversities > 0 && (
              <div className={styles.statsContainer}>
                <div className={styles.statCard}>
                  <Building2 size={24} className={styles.statIcon} />
                  <div className={styles.statValue}>{totalUniversities}+</div>
                  <div className={styles.statLabel}>Partner Universities</div>
                </div>
                <div className={styles.statCard}>
                  <GraduationCap size={24} className={styles.statIcon} />
                  <div className={styles.statValue}>{totalCourses}+</div>
                  <div className={styles.statLabel}>Accredited Programs</div>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className={styles.stickyFilterContainer}>
          <UniversitiesFilterBar 
            searchQuery={filters.searchQuery}
            onSearchChange={setSearchQuery}
            selectedLocation={filters.selectedLocation}
            onLocationChange={setSelectedLocation}
            selectedProgram={filters.selectedProgram}
            onProgramChange={setSelectedProgram}
            locations={locations}
            programs={programs}
          />
        </div>

        <section className={styles.main}>
          {isLoading ? (
            <div className={styles.grid}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <Skeleton className={styles.skeletonHeader} />
                  <Skeleton className={styles.skeletonBody1} />
                  <Skeleton className={styles.skeletonBody2} />
                  <Skeleton className={styles.skeletonFooter} />
                </div>
              ))}
            </div>
          ) : filteredUniversities.length > 0 ? (
            <div className={styles.resultsContainer}>
              {featuredUniversities.length > 0 && (
                <div className={styles.featuredSection}>
                  <h2 className={styles.sectionTitle}>
                    <Star className={styles.featuredIcon} size={24} fill="currentColor" /> 
                    Featured Partners
                  </h2>
                  <div className={styles.grid}>
                    {featuredUniversities.map((uni) => (
                      <UniversityCard key={uni.id} university={uni} />
                    ))}
                  </div>
                </div>
              )}
              
              {regularUniversities.length > 0 && (
                <div className={styles.regularSection}>
                  {featuredUniversities.length > 0 && (
                    <h2 className={styles.sectionTitle}>
                      <LibraryBig className={styles.regularIcon} size={24} />
                      All Universities
                    </h2>
                  )}
                  <div className={styles.grid}>
                    {regularUniversities.map((uni) => (
                      <UniversityCard key={uni.id} university={uni} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Building2 size={48} />
              </div>
              <h2>No Universities Found</h2>
              <p>Check back later as we are continuously expanding our partner network.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}