import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/Breadcrumb';
import { CourseLevel } from '../helpers/schema';
import { 
  BookOpen, 
  ChevronRight,
  Clock,
  Users,
  Award,
  ArrowRight,
  Search,
  Filter,
  Star,
  Play,
  ShoppingCart,
  Eye
} from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { SectionHeader } from '../components/SectionHeader';
import { Skeleton } from '../components/Skeleton';
import { CoursePreviewModal } from '../components/CoursePreviewModal';
import { CoursePurchaseButton } from '../components/CoursePurchaseButton';
import { StrongCTA } from '../components/StrongCTA';
import { useELearningCourses } from '../helpers/useELearningCourses';
import { useAuth } from '../helpers/useAuth';
import { toast } from 'sonner';
import styles from './e-learning.module.css';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string | null;
    category: string | null;
    price: number;
    thumbnailUrl: string | null;
    durationHours: number;
    level: string | null;
    instructorName: string | null;
    learningObjectives: string[] | null;
    isFree: boolean;
  };
  onPreview: (courseId: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onPreview }) => {
  const isFree = course.isFree || course.price === 0;

  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImageContainer}>
        {course.thumbnailUrl ? (
          <img 
            src={course.thumbnailUrl} 
            alt={course.title}
            className={styles.courseImage}
          />
        ) : (
          <div className={styles.coursePlaceholder}>
            <BookOpen size={48} />
          </div>
        )}
        <div className={styles.previewOverlay} onClick={() => onPreview(course.id)}>
          <div className={styles.playButton}>
            <Play size={24} />
          </div>
          <span className={styles.previewText}>Preview Course</span>
        </div>
      </div>
      
      <div className={styles.courseContent}>
        <div className={styles.courseMeta}>
          <Badge variant="outline" className={styles.courseCategory}>
            {course.category || 'General'}
          </Badge>
          <Badge variant="secondary" className={styles.courseLevel}>
            {course.level || 'Beginner'}
          </Badge>
          <Badge variant={isFree ? 'success' : 'primary'} className={styles.priceBadge}>
            {isFree ? 'Free' : `₹${course.price}`}
          </Badge>
        </div>
        
        <h3 className={styles.courseTitle}>{course.title}</h3>
        
        {course.description && (
          <p className={styles.courseDescription}>{course.description}</p>
        )}
        
        <div className={styles.courseDetails}>
          <div className={styles.courseDetail}>
            <Clock size={16} />
            <span>{course.durationHours}h</span>
          </div>
          {course.instructorName && (
            <div className={styles.courseDetail}>
              <Users size={16} />
              <span>{course.instructorName}</span>
            </div>
          )}
        </div>
        
        {course.learningObjectives && course.learningObjectives.length > 0 && (
          <div className={styles.learningObjectives}>
            <h4>What you'll learn:</h4>
            <ul>
              {course.learningObjectives.slice(0, 3).map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className={styles.courseFooter}>
          <Button 
            variant="outline"
            onClick={() => onPreview(course.id)}
            className={styles.previewButton}
          >
            <Eye size={16} />
            Preview
          </Button>
          <CoursePurchaseButton
            courseId={course.id}
            title={course.title}
            isFree={isFree}
            price={course.price}
            onEnrollSuccess={() => {
              toast.success('Course enrolled successfully! Check your dashboard.');
            }}
          />
        </div>
      </div>
    </div>
  );
};

const CourseSkeleton: React.FC = () => (
  <div className={styles.courseCard}>
    <Skeleton className={styles.skeletonImage} />
    <div className={styles.courseContent}>
      <div className={styles.courseMeta}>
        <Skeleton style={{ width: '80px', height: '20px' }} />
        <Skeleton style={{ width: '60px', height: '20px' }} />
      </div>
      <Skeleton style={{ width: '100%', height: '24px', marginBottom: 'var(--spacing-2)' }} />
      <Skeleton style={{ width: '100%', height: '60px', marginBottom: 'var(--spacing-3)' }} />
      <div className={styles.courseDetails}>
        <Skeleton style={{ width: '60px', height: '16px' }} />
        <Skeleton style={{ width: '80px', height: '16px' }} />
      </div>
      <div className={styles.courseFooter}>
        <Skeleton style={{ width: '60px', height: '24px' }} />
        <Skeleton style={{ width: '100px', height: '36px' }} />
      </div>
    </div>
  </div>
);

const ELearningPage: React.FC = () => {
  const { data: courses, isLoading, error } = useELearningCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [previewCourseId, setPreviewCourseId] = useState<number | null>(null);

  // Get unique categories and levels
  const categories = useMemo(() => {
    if (!courses) return [];
    const uniqueCategories = [...new Set(courses.map(course => course.category).filter((category): category is string => category !== null))];
    return uniqueCategories;
  }, [courses]);

  const levels = useMemo(() => {
    if (!courses) return [];
    const uniqueLevels = [...new Set(courses.map(course => course.level).filter((level): level is CourseLevel => level !== null))];
    return uniqueLevels;
  }, [courses]);

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const isFree = course.isFree || course.price === 0;
      const matchesPrice = selectedPrice === 'all' || 
                          (selectedPrice === 'free' && isFree) ||
                          (selectedPrice === 'paid' && !isFree);
      
      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedPrice]);

  const handlePreview = (courseId: number) => {
    setPreviewCourseId(courseId);
  };

  const handleClosePreview = () => {
    setPreviewCourseId(null);
  };

  const hasCourses = courses && courses.length > 0;

  return (
    <>
      <Helmet>
        <title>{hasCourses ? 'E-Learning Courses' : 'E-Learning Platform - Coming Soon'} | Edufast</title>
        <meta name="description" content={hasCourses ? 
          'Browse our comprehensive e-learning courses designed for accelerated learning and career advancement.' :
          'Our comprehensive e-learning platform is coming soon. Get ready to access professional online courses designed for accelerated learning and career advancement.'
        } />
        <meta name="keywords" content="e-learning, online courses, professional development, edufast courses, skill development" />
      </Helmet>

      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>E-Learning</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className={styles.title}>E-Learning Platform</h1>
          <p className={styles.subtitle}>
            {hasCourses ? 
              'Explore our comprehensive online courses designed to accelerate your career growth.' :
              'Our comprehensive online learning platform is coming soon. Get ready for expert-designed courses that will accelerate your career growth.'
            }
          </p>
        </header>

        {/* Strong CTA after header section */}
        <div className={styles.headerCTA}>
          <StrongCTA actions={['apply', 'counseling', 'brochure']} />
        </div>

        <main className={styles.mainContent}>
          {error ? (
            <div className={styles.errorState}>
              <p>Failed to load courses. Please try again later.</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : isLoading ? (
            <div className={styles.coursesContainer}>
              <div className={styles.courseGrid}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <CourseSkeleton key={index} />
                ))}
              </div>
            </div>
          ) : hasCourses ? (
            <div className={styles.coursesContainer}>
              {/* Search and Filters */}
              <div className={styles.filtersContainer}>
                <div className={styles.searchContainer}>
                  <Search size={20} className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
                
                <div className={styles.filterControls}>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Levels</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">All Prices</option>
                    <option value="free">Free Only</option>
                    <option value="paid">Paid Only</option>
                  </select>
                </div>
              </div>

              {/* Mid-page CTA between search filters and course grid */}
              <div className={styles.midPageCTA}>
                <StrongCTA actions={['counseling', 'brochure']} />
              </div>

              {/* Results Count */}
              <div className={styles.resultsCount}>
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </div>

              {/* Course Grid */}
              <div className={styles.courseGrid}>
                {filteredCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onPreview={handlePreview}
                  />
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className={styles.noResults}>
                  <BookOpen size={64} className={styles.noResultsIcon} />
                  <h3>No courses found</h3>
                  <p>Try adjusting your search terms or filters.</p>
                </div>
              )}
            </div>
          ) : (
            /* Coming Soon Section */
            <div className={styles.comingSoonSection}>
              <div className={styles.iconContainer}>
                <BookOpen size={64} className={styles.mainIcon} />
              </div>
              
              <h2 className={styles.comingSoonTitle}>
                E-Learning Courses Coming Soon
              </h2>
              
              <p className={styles.comingSoonText}>
                We're working hard to bring you an exceptional online learning experience. 
                Our platform will feature expert-designed courses, interactive content, 
                and practical projects to accelerate your professional development.
              </p>

              <div className={styles.featuresPreview}>
                <div className={styles.feature}>
                  <Clock className={styles.featureIcon} />
                  <h3>Self-Paced Learning</h3>
                  <p>Learn at your own speed with flexible scheduling</p>
                </div>
                
                <div className={styles.feature}>
                  <Users className={styles.featureIcon} />
                  <h3>Expert Instructors</h3>
                  <p>Learn from industry professionals and thought leaders</p>
                </div>
                
                <div className={styles.feature}>
                  <Award className={styles.featureIcon} />
                  <h3>Certified Programs</h3>
                  <p>Earn recognized certificates upon course completion</p>
                </div>
              </div>

              <div className={styles.placeholder}>
                <div className={styles.placeholderGrid}>
                  <div className={styles.placeholderCard}>
                    <div className={styles.placeholderImage}></div>
                    <div className={styles.placeholderContent}>
                      <div className={styles.placeholderLine}></div>
                      <div className={styles.placeholderLine}></div>
                      <div className={styles.placeholderButton}></div>
                    </div>
                  </div>
                  
                  <div className={styles.placeholderCard}>
                    <div className={styles.placeholderImage}></div>
                    <div className={styles.placeholderContent}>
                      <div className={styles.placeholderLine}></div>
                      <div className={styles.placeholderLine}></div>
                      <div className={styles.placeholderButton}></div>
                    </div>
                  </div>
                  
                  <div className={styles.placeholderCard}>
                    <div className={styles.placeholderImage}></div>
                    <div className={styles.placeholderContent}>
                      <div className={styles.placeholderLine}></div>
                      <div className={styles.placeholderLine}></div>
                      <div className={styles.placeholderButton}></div>
                    </div>
                  </div>
                </div>
                
                <p className={styles.placeholderText}>
                  Course preview - Available soon
                </p>
              </div>

              <div className={styles.callToAction}>
                <p className={styles.ctaText}>
                  Interested in our upcoming courses? Get in touch to learn more about our programs.
                </p>
                <StrongCTA actions={['apply', 'counseling', 'brochure']} layout="vertical" />
              </div>
            </div>
          )}
        </main>
        
        {/* Preview Modal */}
        {previewCourseId && (
          <CoursePreviewModal
            courseId={previewCourseId}
            isOpen={true}
            onClose={handleClosePreview}
          />
        )}
      </div>
    </>
  );
};

export default ELearningPage;