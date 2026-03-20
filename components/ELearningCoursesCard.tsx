import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Badge } from './Badge';
import { Progress } from './Progress';
import { Play, Clock, Award, ChevronRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  instructor: string;
  certificateAvailable: boolean;
  lastAccessed?: string;
}

interface ELearningCoursesCardProps {
  courses?: Course[];
  isLoading?: boolean;
  onContinueLearning?: (courseId: string) => void;
  className?: string;
}

const defaultCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn HTML, CSS, and JavaScript fundamentals',
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    duration: '8 hours',
    instructor: 'Dr. Sarah Johnson',
    certificateAvailable: true,
    lastAccessed: '2 days ago',
  },
  {
    id: '2',
    title: 'Data Structures & Algorithms',
    description: 'Master fundamental computer science concepts',
    progress: 30,
    totalLessons: 40,
    completedLessons: 12,
    duration: '24 hours',
    instructor: 'Prof. Michael Chen',
    certificateAvailable: true,
    lastAccessed: '1 week ago',
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Create beautiful and intuitive user interfaces',
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    duration: '6 hours',
    instructor: 'Emily Rodriguez',
    certificateAvailable: false,
  },
];

export function ELearningCoursesCard({ 
  courses = defaultCourses, 
  isLoading = false,
  onContinueLearning,
  className = ''
}: ELearningCoursesCardProps) {
  if (isLoading) {
    return (
      <div className="elearning-courses-card">
        <div className="card-header">
          <h3>My E-Learning Courses</h3>
        </div>
        <div className="courses-list">
          {[1, 2, 3].map((i) => (
            <div key={i} className="course-item skeleton">
              <div className="course-thumbnail skeleton-pulse" />
              <div className="course-info">
                <div className="skeleton-line" style={{ width: '60%' }} />
                <div className="skeleton-line" style={{ width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="elearning-courses-card">
        <div className="card-header">
          <h3>My E-Learning Courses</h3>
        </div>
        <div className="empty-state">
          <p>You haven't enrolled in any e-learning courses yet.</p>
          <Link to="/e-learning">
            <Button variant="outline">Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="elearning-courses-card">
      <div className="card-header">
        <h3>My E-Learning Courses</h3>
        <Link to="/e-learning" className="view-all">
          View All <ChevronRight size={16} />
        </Link>
      </div>
      <div className="courses-list">
        {courses.slice(0, 3).map((course) => (
          <div key={course.id} className="course-item">
            <div 
              className="course-thumbnail"
              style={course.thumbnailUrl ? { backgroundImage: `url(${course.thumbnailUrl})` } : undefined}
            >
              {!course.thumbnailUrl && <Play size={24} />}
              {course.certificateAvailable && (
                <Badge variant="secondary" className="certificate-badge">
                  <Award size={12} /> Certificate
                </Badge>
              )}
            </div>
            <div className="course-info">
              <h4 className="course-title">{course.title}</h4>
              <p className="course-instructor">{course.instructor}</p>
              
              <div className="course-meta">
                <span className="meta-item">
                  <Clock size={14} />
                  {course.duration}
                </span>
                <span className="meta-item">
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
              </div>

              <div className="course-progress">
                <Progress value={course.progress} size="sm" />
                <span className="progress-text">{course.progress}%</span>
              </div>

              {course.lastAccessed && (
                <p className="last-accessed">Last accessed: {course.lastAccessed}</p>
              )}
            </div>
            <Button 
              size="sm" 
              variant={course.progress > 0 ? "primary" : "outline"}
              onClick={() => onContinueLearning?.(course.id)}
            >
              {course.progress > 0 ? 'Continue' : 'Start'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ELearningCoursesCard;
