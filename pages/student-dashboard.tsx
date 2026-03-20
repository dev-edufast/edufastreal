import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '../helpers/useAuth';
import { useStudentPrograms, useStudentAnnouncements, useStudentDeadlines } from '../helpers/useStudentDashboard';
import { Button } from '../components/Button';
import { Progress } from '../components/Progress';
import { Badge } from '../components/Badge';
import { Skeleton } from '../components/Skeleton';
import { ELearningCoursesCard } from '../components/ELearningCoursesCard';
import {
  LayoutDashboard,
  BookOpen,
  Megaphone,
  CalendarClock,
  BarChart3,
  Settings,
  AlertCircle,
  FileText,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '../components/Chart';
import styles from './student-dashboard.module.css';

const WelcomeHeader: React.FC = () => {
  const { authState } = useAuth();

  if (authState.type !== 'authenticated') {
    return (
      <div className={styles.welcomeHeader}>
        <Skeleton style={{ width: '300px', height: '2.5rem', marginBottom: 'var(--spacing-2)' }} />
        <Skeleton style={{ width: '400px', height: '1.25rem' }} />
      </div>
    );
  }

  return (
    <div className={styles.welcomeHeader}>
      <h1 className={styles.welcomeTitle}>Welcome back, {authState.user.displayName}!</h1>
      <p className={styles.welcomeSubtitle}>Here’s your academic snapshot. Let's make today productive.</p>
    </div>
  );
};

const EnrolledPrograms: React.FC = () => {
  const { data: programs, isFetching, error } = useStudentPrograms();

  if (isFetching) {
    return (
      <div className={`${styles.card} ${styles.programsCard}`}>
        <div className={styles.cardHeader}>
          <BookOpen size={20} />
          <h2 className={styles.cardTitle}>My Programs</h2>
        </div>
        <div className={styles.programList}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className={styles.programItemSkeleton}>
              <div className={styles.programInfo}>
                <Skeleton style={{ width: '250px', height: '1.5rem', marginBottom: 'var(--spacing-2)' }} />
                <Skeleton style={{ width: '150px', height: '1rem' }} />
              </div>
              <Skeleton style={{ width: '100%', height: '0.75rem' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.card} ${styles.errorCard}`}>
        <AlertCircle size={24} />
        <p>Could not load your programs. Please try again later.</p>
      </div>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <div className={`${styles.card} ${styles.programsCard}`}>
        <div className={styles.cardHeader}>
          <BookOpen size={20} />
          <h2 className={styles.cardTitle}>My Programs</h2>
        </div>
        <div className={styles.emptyState}>
          <p>You are not enrolled in any programs yet.</p>
          <Button asChild size="sm">
            <Link to="/programs">Explore Programs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.card} ${styles.programsCard}`}>
      <div className={styles.cardHeader}>
        <BookOpen size={20} />
        <h2 className={styles.cardTitle}>My Programs</h2>
      </div>
      <div className={styles.programList}>
        {programs.map(program => (
          <div key={program.id} className={styles.programItem}>
            <div className={styles.programInfo}>
              <h3 className={styles.programTitle}>{program.title}</h3>
              <div className={styles.programMeta}>
                <Badge variant="secondary">{program.category}</Badge>
                {program.registrationStatus && <Badge variant={program.registrationStatus === 'Enrolled' ? 'success' : 'default'}>{program.registrationStatus}</Badge>}
              </div>
            </div>
            <div className={styles.progressWrapper}>
              <Progress value={program.progress} />
              <span className={styles.progressLabel}>{program.progress}% Complete</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Announcements: React.FC = () => {
  const { data: announcements, isFetching, error } = useStudentAnnouncements();

  return (
    <div className={`${styles.card} ${styles.announcementsCard}`}>
      <div className={styles.cardHeader}>
        <Megaphone size={20} />
        <h2 className={styles.cardTitle}>Announcements</h2>
      </div>
      <div className={styles.announcementList}>
        {isFetching ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className={styles.announcementItemSkeleton}>
              <Skeleton style={{ width: '80%', height: '1.25rem', marginBottom: 'var(--spacing-2)' }} />
              <Skeleton style={{ width: '50%', height: '0.875rem' }} />
            </div>
          ))
        ) : error ? (
          <div className={styles.errorState}>
            <AlertCircle size={20} />
            <p>Failed to load announcements.</p>
          </div>
        ) : !announcements || announcements.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No new announcements.</p>
          </div>
        ) : (
          announcements.slice(0, 4).map(announcement => (
            <div key={announcement.id} className={styles.announcementItem}>
              <div className={styles.announcementIcon}>
                <Badge variant={announcement.category === 'Academic' ? 'default' : announcement.category === 'Event' ? 'secondary' : 'default'}>
                  {announcement.category.charAt(0)}
                </Badge>
              </div>
              <div className={styles.announcementContent}>
                <h4 className={styles.announcementTitle}>{announcement.title}</h4>
                <p className={styles.announcementDate}>{new Date(announcement.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Deadlines: React.FC = () => {
  const { data: deadlines, isFetching, error } = useStudentDeadlines();

  const getDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={`${styles.card} ${styles.deadlinesCard}`}>
      <div className={styles.cardHeader}>
        <CalendarClock size={20} />
        <h2 className={styles.cardTitle}>Upcoming Deadlines</h2>
      </div>
      <div className={styles.deadlineList}>
        {isFetching ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className={styles.deadlineItemSkeleton}>
              <Skeleton style={{ width: '70%', height: '1.25rem', marginBottom: 'var(--spacing-2)' }} />
              <Skeleton style={{ width: '40%', height: '0.875rem' }} />
            </div>
          ))
        ) : error ? (
          <div className={styles.errorState}>
            <AlertCircle size={20} />
            <p>Failed to load deadlines.</p>
          </div>
        ) : !deadlines || deadlines.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No upcoming deadlines. Great job!</p>
          </div>
        ) : (
          deadlines.slice(0, 4).map(deadline => {
            const daysLeft = getDaysLeft(deadline.dueDate);
            return (
              <div key={deadline.id} className={styles.deadlineItem}>
                <div className={styles.deadlineInfo}>
                  <h4 className={styles.deadlineTitle}>{deadline.title}</h4>
                  <p className={styles.deadlineProgram}>{deadline.programTitle}</p>
                </div>
                <div className={styles.deadlineDate}>
                  <span className={daysLeft <= 3 ? styles.dateUrgent : daysLeft <= 7 ? styles.dateWarning : ''}>
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Due Today'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const ProgressChart: React.FC = () => {
  const { data: programs, isFetching } = useStudentPrograms();

  const chartData = programs?.map(p => ({
    name: p.title.split(' ').slice(0, 2).join(' '),
    progress: p.progress,
  })) || [];

  const chartConfig = {
    progress: {
      label: "Progress",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className={`${styles.card} ${styles.chartCard}`}>
      <div className={styles.cardHeader}>
        <BarChart3 size={20} />
        <h2 className={styles.cardTitle}>Overall Progress</h2>
      </div>
      <div className={styles.chartContainer}>
        {isFetching ? (
          <Skeleton style={{ height: '100%', width: '100%' }} />
        ) : (
          <ChartContainer config={chartConfig}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis unit="%" tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip
                cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="var(--color-progress)"
                fill="var(--color-progress)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};

const QuickActions: React.FC = () => (
  <div className={`${styles.card} ${styles.actionsCard}`}>
    <div className={styles.cardHeader}>
      <LayoutDashboard size={20} />
      <h2 className={styles.cardTitle}>Quick Actions</h2>
    </div>
    <div className={styles.actionButtons}>
      <Button asChild variant="outline">
        <Link to="/programs">
          <FileText size={16} /> Apply to Program
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/contact#counseling">
          <MessageSquare size={16} /> Book Counseling
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/contact">
          <Phone size={16} /> Contact Support
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/student-dashboard/settings">
          <Settings size={16} /> Account Settings
        </Link>
      </Button>
    </div>
  </div>
);

const StudentDashboardPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Student Dashboard - Edufast</title>
        <meta name="description" content="Your personal dashboard for managing your programs, deadlines, and resources at Edufast." />
      </Helmet>
      <div className={styles.dashboardContainer}>
        <WelcomeHeader />
        <div className={styles.dashboardGrid}>
          <EnrolledPrograms />
          <ELearningCoursesCard className={styles.elearningCard} />
          <Announcements />
          <Deadlines />
          <ProgressChart />
          <QuickActions />
        </div>
      </div>
    </>
  );
};

export default StudentDashboardPage;