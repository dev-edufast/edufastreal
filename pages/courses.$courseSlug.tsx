import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { useCourseDetail } from '../helpers/useUniversitySearch';
import { Skeleton } from '../components/Skeleton';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../components/Breadcrumb';
import { Clock, Monitor, DollarSign, GraduationCap, CheckCircle2, TrendingUp, Building2 } from 'lucide-react';
import { Badge } from '../components/Badge';
import { StrongCTA } from '../components/StrongCTA';
import { Button } from '../components/Button';
import { CourseCard } from '../components/CourseCard';
import styles from './courses.$courseSlug.module.css';

export default function CourseDetailPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { data, isFetching, error } = useCourseDetail(courseSlug || '');

  if (isFetching) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumbSkeleton}><Skeleton style={{ width: '250px', height: '24px' }} /></div>
        <Skeleton className={styles.heroSkeleton} />
        <div className={styles.contentSkeleton}>
          <Skeleton style={{ height: '200px', width: '100%' }} />
          <Skeleton style={{ height: '300px', width: '100%' }} />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.errorContainer}>
        <h2>Course Not Found</h2>
        <p>The course you are looking for does not exist or has been removed.</p>
        <Button asChild><Link to="/programs">Explore Programs</Link></Button>
      </div>
    );
  }

  const { university, relatedCourses, ...course } = data;

  return (
    <>
      <SEOHead
        title={`${course.courseName} at ${university.name} | Edufast`}
        description={course.description || `Fast-track your career with a ${course.courseName} from ${university.name}. Graduation in ${course.durationMonths} months.`}
        canonicalUrl={`/courses/${course.slug}`}
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
                <BreadcrumbLink asChild><Link to={`/universities/${university.slug}`}>{university.name}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{course.courseName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroHeader}>
              <Badge variant="primary" className={styles.categoryBadge}>{course.category}</Badge>
              {course.courseAbbreviation && (
                <span className={styles.abbreviation}>{course.courseAbbreviation}</span>
              )}
            </div>
            
            <h1 className={styles.title}>{course.courseName}</h1>
            
            <Link to={`/universities/${university.slug}`} className={styles.universityLink}>
              <Building2 size={20} />
              <span>{university.name}</span>
            </Link>
          </div>
        </section>

        <section className={styles.keyInfo}>
          <div className={styles.infoCard}>
            <div className={styles.infoIconWrapper}><Clock size={24} /></div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Duration</span>
              <span className={styles.infoValue}>{course.durationMonths} Months</span>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIconWrapper}><Monitor size={24} /></div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Delivery Mode</span>
              <span className={styles.infoValue}>{course.deliveryMode}</span>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIconWrapper}><DollarSign size={24} /></div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Program Fee</span>
              <span className={styles.infoValue}>{course.feeAmount || 'Contact us'}</span>
            </div>
          </div>
          <div className={`${styles.infoCard} ${course.scholarshipAvailable ? styles.infoCardHighlight : ''}`}>
            <div className={styles.infoIconWrapper}><GraduationCap size={24} /></div>
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>Scholarships</span>
              <span className={styles.infoValue}>{course.scholarshipAvailable ? 'Available' : 'Not Available'}</span>
            </div>
          </div>
        </section>

        <div className={styles.layout}>
          <main className={styles.mainContent}>
            {course.description && (
              <section className={styles.contentSection}>
                <h3>Course Overview</h3>
                <div className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: course.description.replace(/\n/g, '<br/>') }} />
              </section>
            )}

            {course.eligibility && (
              <section className={styles.contentSection}>
                <h3>Eligibility Requirements</h3>
                <div className={styles.eligibilityBox}>
                  <CheckCircle2 size={24} className={styles.checkIconLarge} />
                  <p>{course.eligibility}</p>
                </div>
              </section>
            )}

            {course.careerOutcomes && course.careerOutcomes.length > 0 && (
              <section className={styles.contentSection}>
                <h3>Career Outcomes</h3>
                <ul className={styles.outcomesList}>
                  {course.careerOutcomes.map((outcome, idx) => (
                    <li key={idx}>
                      <TrendingUp size={18} className={styles.outcomeIcon} />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {course.specializations && course.specializations.length > 0 && (
              <section className={styles.contentSection}>
                <h3>Available Specializations</h3>
                <div className={styles.specializationsGrid}>
                  {course.specializations.map((spec, idx) => (
                    <Badge key={idx} variant="secondary" className={styles.specBadge}>{spec}</Badge>
                  ))}
                </div>
              </section>
            )}

            <section className={styles.ctaSection}>
              <div className={styles.ctaBox}>
                <h2>Ready to enroll in {course.courseAbbreviation || course.courseName}?</h2>
                <p>Take the next step in your career journey. Apply now or speak to our counselors to understand the process.</p>
                <StrongCTA actions={['apply', 'counseling']} layout="horizontal" />
              </div>
            </section>
          </main>

          <aside className={styles.sidebar}>
            {relatedCourses && relatedCourses.length > 0 && (
              <div className={styles.relatedSection}>
                <h3>Other courses at {university.name}</h3>
                <div className={styles.relatedGrid}>
                  {relatedCourses.map(related => (
                    <CourseCard 
                      key={related.id} 
                      course={related} 
                      universityName={university.name}
                      universitySlug={university.slug}
                    />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}