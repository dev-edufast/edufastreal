import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { useUniversityDetail } from '../helpers/useUniversitySearch';
import { Skeleton } from '../components/Skeleton';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../components/Breadcrumb';
import { MapPin, Building, Award, Calendar, ExternalLink, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/Badge';
import { CourseCard } from '../components/CourseCard';
import { StrongCTA } from '../components/StrongCTA';
import { Button } from '../components/Button';
import styles from './universities.$universitySlug.module.css';

export default function UniversityDetailPage() {
  const { universitySlug } = useParams<{ universitySlug: string }>();
  const { data, isFetching, error } = useUniversityDetail(universitySlug || '');

  if (isFetching) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumbSkeleton}><Skeleton style={{ width: '250px', height: '24px' }} /></div>
        <Skeleton className={styles.heroSkeleton} />
        <div className={styles.contentSkeleton}>
          <Skeleton style={{ height: '200px', width: '100%' }} />
          <Skeleton style={{ height: '400px', width: '100%' }} />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.errorContainer}>
        <h2>University Not Found</h2>
        <p>The university you are looking for does not exist or has been removed.</p>
        <Button asChild><Link to="/universities">Back to Universities</Link></Button>
      </div>
    );
  }

  const { courses, ...university } = data;

  return (
    <>
      <SEOHead
        title={`${university.name} | Fast-Track Your Degree`}
        description={university.description || `Explore accelerated degree programs at ${university.name}.`}
        canonicalUrl={`/universities/${university.slug}`}
      />

      <div className={styles.container}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/universities">Universities</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{university.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <section className={styles.hero}>
          {university.coverImageUrl && (
            <div 
              className={styles.heroBackground} 
              style={{ backgroundImage: `url(${university.coverImageUrl})` }} 
            />
          )}
          <div className={styles.heroContent}>
            <div className={styles.heroLogoContainer}>
              {university.logoUrl ? (
                <img src={university.logoUrl} alt={`${university.name} logo`} className={styles.heroLogo} />
              ) : (
                <Building size={48} className={styles.placeholderLogo} />
              )}
            </div>
            
            <div className={styles.heroText}>
              <h1 className={styles.title}>{university.name}</h1>
              {university.shortName && <h2 className={styles.shortName}>({university.shortName})</h2>}
              
              <div className={styles.metaInfo}>
                {university.location && (
                  <span className={styles.metaItem}><MapPin size={16} /> {university.location}</span>
                )}
                {university.establishedYear && (
                  <span className={styles.metaItem}><Calendar size={16} /> Est. {university.establishedYear}</span>
                )}
                {university.universityType && (
                  <span className={styles.metaItem}><Building size={16} /> {university.universityType}</span>
                )}
              </div>

              <div className={styles.badges}>
                {university.naacGrade && (
                  <Badge variant="primary" className={styles.heroBadge}>
                    <Award size={14} className={styles.badgeIcon} /> NAAC Grade {university.naacGrade}
                  </Badge>
                )}
                {university.isFeatured && (
                  <Badge variant="success" className={styles.heroBadge}>Featured Partner</Badge>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className={styles.layout}>
          <main className={styles.mainContent}>
            {university.description && (
              <section className={styles.contentSection}>
                <h3>About the University</h3>
                <div className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: university.description.replace(/\n/g, '<br/>') }} />
              </section>
            )}

            {university.highlights && university.highlights.length > 0 && (
              <section className={styles.contentSection}>
                <h3>Key Highlights</h3>
                <ul className={styles.highlightsList}>
                  {university.highlights.map((highlight, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={18} className={styles.checkIcon} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(university.accreditationDetails || university.approvalBody) && (
              <section className={styles.contentSection}>
                <h3>Accreditations & Approvals</h3>
                <div className={styles.accreditationBox}>
                  {university.approvalBody && (
                    <div className={styles.accItem}>
                      <strong>Approval Body:</strong> {university.approvalBody}
                    </div>
                  )}
                  {university.accreditationDetails && (
                    <div className={styles.accItem}>
                      <strong>Details:</strong> {university.accreditationDetails}
                    </div>
                  )}
                </div>
              </section>
            )}

            <section className={styles.contentSection}>
              <h3>Available Fast-Track Courses</h3>
              {courses && courses.length > 0 ? (
                <div className={styles.coursesGrid}>
                  {courses.map(course => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      universityName={university.name}
                      universitySlug={university.slug}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.noCourses}>
                  <p>No courses are currently listed for this university.</p>
                </div>
              )}
            </section>
          </main>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3>Interested in {university.shortName || 'this university'}?</h3>
              <p>Get your degree in just 6 months. Apply now or speak with an expert counselor to see if you qualify.</p>
              <StrongCTA actions={['apply', 'counseling']} layout="vertical" className={styles.sidebarCta} />
            </div>

            {(university.websiteUrl || university.contactEmail || university.contactPhone) && (
              <div className={styles.sidebarCard}>
                <h3>Contact Info</h3>
                <div className={styles.contactList}>
                  {university.websiteUrl && (
                    <a href={university.websiteUrl} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                      <ExternalLink size={16} /> Official Website
                    </a>
                  )}
                  {university.contactEmail && (
                    <a href={`mailto:${university.contactEmail}`} className={styles.contactItem}>
                      <Mail size={16} /> {university.contactEmail}
                    </a>
                  )}
                  {university.contactPhone && (
                    <a href={`tel:${university.contactPhone}`} className={styles.contactItem}>
                      <Phone size={16} /> {university.contactPhone}
                    </a>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}