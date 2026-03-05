import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { getCoursePreview } from '../endpoints/course/preview_GET.schema';
import { getStudentElearningCourses } from '../endpoints/student/elearningcourses_GET.schema';
import { useAuth } from '../helpers/useAuth';
import { useGoogleDriveAccess } from '../helpers/useGoogleDriveAccess';
import { CourseFilesDisplay } from '../components/CourseFilesDisplay';
import { CoursePurchaseButton } from '../components/CoursePurchaseButton';
import { Skeleton } from '../components/Skeleton';
import { AlertCircle, CheckCircle, FolderKanban, ExternalLink, Info, ArrowLeft, BookOpen } from 'lucide-react';
import styles from './e-learning.course.$courseId.module.css';
import { Link } from 'react-router-dom';

const CourseDetailSkeleton: React.FC = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <Skeleton style={{ height: '2.5rem', width: '60%', marginBottom: 'var(--spacing-2)' }} />
      <Skeleton style={{ height: '1rem', width: '80%' }} />
      <Skeleton style={{ height: '1rem', width: '70%', marginTop: 'var(--spacing-1)' }} />
    </header>
    <div className={styles.mainContent}>
      <div className={styles.accessSection}>
        <Skeleton style={{ aspectRatio: '16 / 9', width: '100%', height: 'auto' }} />
      </div>
      <div className={styles.sidebar}>
        <Skeleton style={{ height: '2rem', width: '100%', marginBottom: 'var(--spacing-4)' }} />
        <Skeleton style={{ height: '1.5rem', width: '50%', marginBottom: 'var(--spacing-2)' }} />
        <Skeleton style={{ height: '1rem', width: '100%' }} />
        <Skeleton style={{ height: '1rem', width: '100%', marginTop: 'var(--spacing-1)' }} />
        <Skeleton style={{ height: '1rem', width: '80%', marginTop: 'var(--spacing-1)' }} />
      </div>
    </div>
  </div>
);

const ErrorDisplay: React.FC<{ 
  type: 'not-found' | 'invalid-id' | 'generic';
  message: string;
}> = ({ type, message }) => (
  <div className={styles.errorContainer}>
    {type === 'not-found' ? (
      <>
        <BookOpen size={48} className={styles.notFoundIcon} />
        <h2 className={styles.errorTitle}>Course Not Found</h2>
        <p className={styles.errorMessage}>
          The course you're looking for doesn't exist or may have been removed.
        </p>
        <div className={styles.errorActions}>
          <Link to="/e-learning" className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Courses
          </Link>
        </div>
      </>
    ) : type === 'invalid-id' ? (
      <>
        <AlertCircle size={48} className={styles.errorIcon} />
        <h2 className={styles.errorTitle}>Invalid Course</h2>
        <p className={styles.errorMessage}>
          The course link appears to be invalid. Please check the URL or browse our available courses.
        </p>
        <div className={styles.errorActions}>
          <Link to="/e-learning" className={styles.backButton}>
            <ArrowLeft size={20} />
            Browse Courses
          </Link>
        </div>
      </>
    ) : (
      <>
        <AlertCircle size={48} className={styles.errorIcon} />
        <h2 className={styles.errorTitle}>Something went wrong</h2>
        <p className={styles.errorMessage}>{message}</p>
        <div className={styles.errorActions}>
          <Link to="/e-learning" className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Courses
          </Link>
        </div>
      </>
    )}
  </div>
);

export default function CourseDetailPage() {
  const { courseId: courseIdParam } = useParams();
  const courseId = Number(courseIdParam);
  const { authState } = useAuth();
  const { handleGoogleDriveAccess } = useGoogleDriveAccess();

  const { data: previewData, isFetching: isPreviewFetching, error: previewError } = useQuery({
    queryKey: ['coursePreview', courseId],
    queryFn: () => getCoursePreview({ courseId }),
    enabled: !!courseId,
  });

  const { data: enrolledCourses, isFetching: isEnrolledFetching } = useQuery({
    queryKey: ['studentElearningCourses'],
    queryFn: getStudentElearningCourses,
    enabled: authState.type === 'authenticated',
  });

  if (!courseId || isNaN(courseId) || courseId <= 0) {
    return <ErrorDisplay type="invalid-id" message="Course ID is missing or invalid in the URL." />;
  }

  if (isPreviewFetching || (authState.type === 'authenticated' && isEnrolledFetching)) {
    return <CourseDetailSkeleton />;
  }

  if (previewError) {
    const errorMessage = previewError instanceof Error ? previewError.message : 'Could not load course preview.';
    
    // Check if it's a 404/not found error
    if (errorMessage.toLowerCase().includes('not found') || 
        errorMessage.toLowerCase().includes('404') ||
        errorMessage.toLowerCase().includes('does not exist')) {
      return <ErrorDisplay type="not-found" message={errorMessage} />;
    }
    
    return <ErrorDisplay type="generic" message={errorMessage} />;
  }

  if (!previewData || 'error' in previewData) {
    const errorMessage = previewData?.error || 'Course not found or is not available.';
    
    // Check if it's a not found error from the API response
    if (errorMessage.toLowerCase().includes('not found') || 
        errorMessage.toLowerCase().includes('does not exist')) {
      return <ErrorDisplay type="not-found" message={errorMessage} />;
    }
    
    return <ErrorDisplay type="generic" message={errorMessage} />;
  }

  const enrolledCourse = enrolledCourses?.find(c => c.id === courseId);
  const isEnrolled = !!enrolledCourse;

  const googleDriveLink = isEnrolled && enrolledCourse?.googleDriveLink ? enrolledCourse.googleDriveLink : previewData.googleDriveLink;

  return (
    <>
      <Helmet>
        <title>{`${previewData.title} | Edufast`}</title>
        <meta name="description" content={previewData.description || 'Learn more about this course on Edufast.'} />
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.courseTitle}>{previewData.title}</h1>
          <p className={styles.courseDescription}>{previewData.description}</p>
        </header>

        <div className={styles.mainContent}>
          <main className={styles.accessSection}>
            <div className={styles.driveAccessCard}>
              <div className={styles.driveAccessHeader}>
                <ExternalLink size={32} className={styles.driveIcon} />
                <div>
                  <h2>Course Materials Access</h2>
                  <p>Access all course materials, resources, and assignments through Google Drive.</p>
                </div>
              </div>
              {isEnrolled && googleDriveLink ? (
                <button 
                  onClick={() => handleGoogleDriveAccess(googleDriveLink, { 
                    courseTitle: previewData.title, 
                    linkType: 'course' 
                  })}
                  className={styles.driveAccessButton}
                >
                  <ExternalLink size={20} />
                  Access Course Materials
                </button>
              ) : (
                <div className={styles.driveAccessLocked}>
                  <p>Enroll in this course to access all materials and resources.</p>
                </div>
              )}
            </div>
          </main>

          <aside className={styles.sidebar}>
            {!isEnrolled && (
              <div className={styles.purchaseCard}>
                <h3>Get Full Access</h3>
                <p>Enroll now to unlock all course materials, videos, and get your certificate.</p>
                <CoursePurchaseButton
                  courseId={courseId}
                  title={previewData.title}
                  isFree={previewData.isFree}
                  price={previewData.price}
                />
              </div>
            )}

            {isEnrolled && enrolledCourse && (
              <div className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <FolderKanban size={20} />
                  <h3>Your Progress</h3>
                </div>
                <div className={styles.progressInfo}>
                  <span>{enrolledCourse.progressPercentage}% Complete</span>
                  <progress value={enrolledCourse.progressPercentage} max="100" />
                </div>
                <div className={styles.statusInfo}>
                  <Info size={16} />
                  <span>Status: {enrolledCourse.status}</span>
                </div>
                {enrolledCourse.googleDriveLink && (
                  <button 
                    onClick={() => handleGoogleDriveAccess(enrolledCourse.googleDriveLink, { 
                      courseTitle: previewData.title, 
                      linkType: 'materials' 
                    })}
                    className={styles.driveLink}
                  >
                    <ExternalLink size={16} />
                    Download All Materials (Google Drive)
                  </button>
                )}
              </div>
            )}
          </aside>
        </div>

        <section className={styles.materialsSection}>
          {isEnrolled ? (
            <CourseFilesDisplay courseId={courseId} courseTitle={previewData.title} />
          ) : (
            <div className={styles.lockedContent}>
              <CheckCircle size={32} className={styles.lockedIcon} />
              <h3>Course Materials</h3>
              <p>Enroll in this course to access all supplementary materials and downloadable resources.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}