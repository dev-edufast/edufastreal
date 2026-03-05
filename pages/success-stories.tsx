import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  PlayCircle,
  Shuffle,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { useTestimonials } from '../helpers/useTestimonials';
import { Button } from '../components/Button';
import { Separator } from '../components/Separator';
import { VideoModal } from '../components/VideoModal';
import { StoryCard } from '../components/StoryCard';
import { StoryFilters } from '../components/StoryFilters';
import { SuccessMetrics } from '../components/SuccessMetrics';
import { AlumniSuccessHub } from '../components/AlumniSuccessHub';
import { InstantBooking } from '../components/InstantBooking';
import { SmartCTA } from '../components/SmartCTA';
import { StrongCTA } from '../components/StrongCTA';
import styles from './success-stories.module.css';

const storyCategories = [
  'All Stories',
  'Career Change',
  'Promotion',
  'Salary Boost',
  'Industry Switch',
  'Skill Upgrade',
  'First Job',
];

const videoTestimonials = [
  {
    id: 1,
    studentName: 'Maria Rodriguez',
    programTitle: 'B.S. in Healthcare Management',
    title: 'From Nurse to Hospital Administrator in 6 Months',
    thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Maria shares how she transformed her nursing career into healthcare leadership.',
  },
  {
    id: 2,
    studentName: 'David Chen',
    programTitle: 'M.S. in Information Technology',
    title: 'Breaking Into Tech Without a Computer Science Background',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'David reveals how he pivoted from retail to becoming a software architect.',
  },
  {
    id: 3,
    studentName: 'Sarah Johnson',
    programTitle: 'Accelerated MBA',
    title: 'Doubling My Salary While Working Full-Time',
    thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616b332c5c0?q=80&w=500',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Sarah explains how she balanced work, family, and studies to achieve career success.',
  }
];

const successMetrics = {
  graduatesPlaced: 2847,
  averageSalaryIncrease: 68,
  companiesHiring: 450,
  successRate: 94,
};

const inspirationalStories = [
  {
    id: 1,
    studentName: 'Alex Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250',
    programTitle: 'Fast-Track Business Analytics',
    category: 'Career Change',
    previousRole: 'Restaurant Manager',
    currentRole: 'Senior Data Analyst at Fortune 500',
    storyHook: 'From flipping burgers to flipping data tables',
    personalJourney: 'I was stuck managing a restaurant for 8 years, working 60-hour weeks for $45K. I always loved numbers but never knew how to turn that into a career. My wife kept saying "Alex, you\'re brilliant with spreadsheets, there has to be something out there for you." That\'s when I found Edufast.',
    transformation: 'The program wasn\'t just about learning SQL and Python - it was about discovering I could actually think like a data scientist. My instructors believed in me when I didn\'t believe in myself. Six months later, I was analyzing customer behavior for a company I used to only dream about working for.',
    currentImpact: 'Now I help companies make million-dollar decisions based on data insights. My teenager tells her friends her dad is a "data wizard" - and honestly? That never gets old. Sometimes I look at my paycheck ($95K!) and pinch myself.',
    advice: 'If you\'re working a job that drains your soul, you owe it to yourself to try. I thought I was too old at 35. I thought I wasn\'t smart enough. I was wrong on both counts.',
    metrics: {
      salaryIncrease: '111%',
      monthsToPromotion: 4,
      newOpportunities: 12,
    },
  },
  {
    id: 2,
    studentName: 'Priya Patel',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250',
    programTitle: 'Accelerated Software Engineering',
    category: 'Industry Switch',
    previousRole: 'Marketing Coordinator',
    currentRole: 'Full-Stack Developer',
    storyHook: 'She went from creating campaigns to creating code',
    personalJourney: 'Marketing felt like shouting into the void. I spent my days writing copy and scheduling posts, but I craved building something real, something that solved problems. My brother (a developer) kept joking that I\'d make a great programmer because I was so detail-oriented.',
    transformation: 'Edufast\'s program was intense - I won\'t sugarcoat it. But every late night coding session felt like solving a puzzle. When I built my first full-stack application, I literally cried. It was a simple to-do app, but I had created something from nothing.',
    currentImpact: 'I now build web applications that thousands of people use daily. Last month, a user sent feedback saying our app helped them organize their entire business. That feeling of creating something that matters? Marketing never gave me that.',
    advice: 'Don\'t listen to people who say you need to be a "natural" at coding. I failed algebra in high school! What you need is persistence and a program that actually prepares you for the real world.',
    metrics: {
      salaryIncrease: '78%',
      monthsToPromotion: 3,
      newOpportunities: 8,
    },
  },
  {
    id: 3,
    studentName: 'Marcus Thompson',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250',
    programTitle: 'Healthcare Management',
    category: 'Promotion',
    previousRole: 'Medical Assistant',
    currentRole: 'Operations Director',
    storyHook: 'From taking vitals to vital decisions',
    personalJourney: 'I loved patient care but felt stuck in the same role for 6 years. I saw problems in our clinic every day - scheduling disasters, supply shortages, staff burnout - but had no authority to fix them. I wanted to help heal the system, not just the patients.',
    transformation: 'The program showed me that healthcare isn\'t just about medicine - it\'s about people, processes, and leadership. I learned to see the hospital as an ecosystem where small changes could save lives AND money. My final project redesigned our entire patient flow system.',
    currentImpact: 'I now oversee operations for three medical facilities. We\'ve reduced patient wait times by 40% and increased staff satisfaction scores by 60%. Most importantly, we\'re delivering better care because our systems actually work.',
    advice: 'If you see problems in your workplace and think "someone should fix this" - maybe that someone is you. Leadership isn\'t about having a title; it\'s about having solutions.',
    metrics: {
      salaryIncrease: '125%',
      monthsToPromotion: 2,
      newOpportunities: 5,
    },
  }
];

const SuccessStoriesPage: React.FC = () => {
  const { data: testimonials, isFetching } = useTestimonials();
  const [categoryFilter, setCategoryFilter] = useState<string>('All Stories');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [bookmarkedStories, setBookmarkedStories] = useState<Set<number>>(new Set());
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showRandomStory, setShowRandomStory] = useState<number | null>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up intersection observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-animate-id');
            if (elementId) {
              setVisibleElements(prev => new Set(prev).add(elementId));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px 0px -100px 0px' }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const filteredStories = useMemo(() => {
    let filtered = inspirationalStories;
    
    if (categoryFilter !== 'All Stories') {
      filtered = filtered.filter(story => story.category === categoryFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(story => 
        story.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.programTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.personalJourney.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.currentRole.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [categoryFilter, searchTerm]);

  const handleRandomStory = () => {
    const randomIndex = Math.floor(Math.random() * inspirationalStories.length);
    const randomStory = inspirationalStories[randomIndex];
    setShowRandomStory(randomStory.id);
    setExpandedStory(randomStory.id);
    
    // Scroll to the story
    setTimeout(() => {
      const element = document.getElementById(`story-${randomStory.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    // Clear the highlight after animation
    setTimeout(() => setShowRandomStory(null), 3000);
  };

  const toggleBookmark = (storyId: number) => {
    setBookmarkedStories(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(storyId)) {
        newBookmarks.delete(storyId);
      } else {
        newBookmarks.add(storyId);
      }
      return newBookmarks;
    });
  };

  const shareStory = async (story: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${story.studentName}'s Success Story`,
          text: story.storyHook,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share canceled');
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `Check out ${story.studentName}'s inspiring transformation: ${story.storyHook}`;
      navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`);
      // You could add a toast notification here
    }
  };

  // Set up animation observers when stories change
  useEffect(() => {
    const elementsToObserve = document.querySelectorAll('[data-animate-id]');
    elementsToObserve.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });
  }, [filteredStories]);

  return (
    <>
      <Helmet>
        <title>Real Success Stories That'll Make You Believe | Edufast</title>
        <meta name="description" content="These aren't just testimonials - they're proof that ordinary people can achieve extraordinary things in just 6 months. Read their journeys and start writing your own." />
      </Helmet>
      <div className={styles.pageContainer}>
        {/* Animated Background Elements */}
        <div className={styles.backgroundElements}>
          <div className={styles.floatingShape} style={{ '--delay': '0s' } as React.CSSProperties}></div>
          <div className={styles.floatingShape} style={{ '--delay': '4s' } as React.CSSProperties}></div>
          <div className={styles.floatingShape} style={{ '--delay': '8s' } as React.CSSProperties}></div>
          <div className={styles.celebrationParticles}></div>
        </div>

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent} data-animate-id="hero">
            <div className={styles.sparkleIcon}>
              <Sparkles size={32} />
            </div>
            <h1 className={styles.headline}>
              Wait Till You See What <span className={styles.highlight}>These Amazing Humans</span> Accomplished!
            </h1>
            <p className={styles.subHeadline}>
              Forget boring testimonials. These are real stories from real people who decided to bet on themselves - and totally crushed it. Fair warning: you might get goosebumps (and serious motivation).
            </p>
            <div className={styles.heroActions}>
              <Button size="lg" onClick={handleRandomStory} className={styles.randomButton}>
                <Shuffle size={20} />
                Surprise Me With a Story!
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">I Want This Too <ArrowRight size={20} /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA after hero section */}
        <section className={styles.heroCTASection} data-animate-id="hero-cta">
          <div className={styles.heroCTAContent}>
            <h3>Ready to Write Your Success Story?</h3>
            <p>Join thousands who've transformed their careers in just 6 months. Your journey starts with one decision.</p>
            <StrongCTA actions={['apply', 'counseling']} layout="horizontal" />
          </div>
        </section>

        {/* Success Metrics */}
        <SuccessMetrics metrics={successMetrics} />

        {/* Alumni Success Showcase */}
        <section className={styles.alumniSection} data-animate-id="alumni">
          <div className={styles.sectionHeader}>
            <h2>Real Career Transformations, Real Results</h2>
            <p>These aren't just stories - they're documented career progressions with real salary data, LinkedIn profiles, and measurable outcomes. See exactly how our graduates transformed their professional lives.</p>
          </div>
          <AlumniSuccessHub className={styles.alumniHub} />
          <div className={styles.alumniCTA}>
            <SmartCTA userBehavior="scrolled_deep" />
          </div>
        </section>

        <Separator />

        {/* Video Testimonials */}
        <section className={styles.videoSection} data-animate-id="videos">
          <div className={styles.sectionHeader}>
            <h2>Watch Their Journeys Unfold</h2>
            <p>Sometimes you just need to hear it straight from the source. Grab some tissues - these might make you emotional.</p>
          </div>
          <div className={styles.videoGrid}>
            {videoTestimonials.map((video, index) => (
              <div 
                key={video.id} 
                className={`${styles.videoCard} ${visibleElements.has('videos') ? styles.videoVisible : ''}`}
                style={{ '--video-delay': `${index * 0.2}s` } as React.CSSProperties}
                onClick={() => setSelectedVideo(video)}
              >
                <div className={styles.videoThumbnail}>
                  <img src={video.thumbnail} alt={video.title} />
                  <div className={styles.videoOverlay}>
                    <div className={styles.playButton}>
                      <PlayCircle size={48} />
                    </div>
                  </div>
                </div>
                <div className={styles.videoInfo}>
                  <h3>{video.title}</h3>
                  <p className={styles.videoMeta}>{video.studentName} • {video.programTitle}</p>
                  <p className={styles.videoDescription}>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* CTA between story sections */}
        <section className={styles.midStoryCTASection} data-animate-id="mid-story-cta">
          <div className={styles.midStoryCTAContent}>
            <h3>Inspired by These Stories?</h3>
            <p>Don't just read about success – become the next success story. Every transformation starts with taking action.</p>
            <StrongCTA actions={['brochure', 'counseling']} layout="horizontal" />
          </div>
        </section>

        <Separator />

        {/* Interactive Story Section */}
        <section className={styles.storiesSection} data-animate-id="stories">
          <div className={styles.sectionHeader}>
            <h2>Stories That'll Give You Chills (The Good Kind)</h2>
            <p>These aren't just career changes - they're life transformations. Each story shows what's possible when you stop making excuses and start making moves.</p>
          </div>

          {/* Search and Filters */}
          <StoryFilters
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            storyCategories={storyCategories}
            onSearchChange={setSearchTerm}
            onCategoryChange={setCategoryFilter}
          />

          {/* Story Cards */}
          <div className={styles.storyGrid}>
            {filteredStories.map((story, index) => (
              <StoryCard
                key={story.id}
                story={story}
                isExpanded={expandedStory === story.id}
                isBookmarked={bookmarkedStories.has(story.id)}
                isHighlighted={showRandomStory === story.id}
                animationDelay={`${index * 0.1}s`}
                onToggleExpand={(storyId) => setExpandedStory(expandedStory === storyId ? null : storyId)}
                onToggleBookmark={toggleBookmark}
                onShare={shareStory}
              />
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>No stories match your search</h3>
              <p>Try a different search term or category - there's inspiration waiting for you!</p>
              <Button onClick={() => { setSearchTerm(''); setCategoryFilter('All Stories'); }}>
                Show All Stories
              </Button>
            </div>
          )}
        </section>

        {/* Instant Booking Section */}
        <section className={styles.bookingSection} data-animate-id="booking">
          <div className={styles.sectionHeader}>
            <h2>Inspired? Let's Talk About Your Transformation</h2>
            <p>Ready to write your own success story? Book an instant counseling session with our experts. No waiting, no forms - just real advice from people who've helped thousands achieve their career goals.</p>
          </div>
          <InstantBooking className={styles.instantBooking} />
          <div className={styles.bookingFooter}>
            <p className={styles.bookingNote}>
              💡 <strong>Pro Tip:</strong> The best time to start is now. Our most successful graduates are the ones who took action immediately after feeling inspired.
            </p>
          </div>
        </section>

        <Separator />

        {/* CTA Section */}
        <section className={styles.ctaSection} data-animate-id="cta">
          <div className={styles.ctaContent}>
            <h2>Your Story Could Be Next</h2>
            <p>
              Every single person you just read about started exactly where you are right now. They had doubts, fears, and excuses. 
              The only difference? They decided to bet on themselves anyway.
            </p>
            <p className={styles.ctaEmphasis}>
              What's your excuse going to be six months from now?
            </p>
            <div className={styles.ctaButtons}>
              <StrongCTA actions={['apply', 'brochure', 'counseling']} layout="horizontal" />
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {selectedVideo && (
          <VideoModal
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            videoSrc={selectedVideo.videoSrc}
            title={selectedVideo.title}
            studentName={selectedVideo.studentName}
            programTitle={selectedVideo.programTitle}
          />
        )}
      </div>
    </>
  );
};

export default SuccessStoriesPage;