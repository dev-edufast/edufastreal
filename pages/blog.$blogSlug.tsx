import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronRight, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../helpers/blogData';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import styles from './blog.$blogSlug.module.css';

export default function BlogPostPage() {
  const { blogSlug } = useParams<{ blogSlug: string }>();

  // Find the exact post by slug
  const post = useMemo(() => {
    return blogPosts.find((p) => p.slug === blogSlug);
  }, [blogSlug]);

  // Find related posts in the same category
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.category === post.category && p.slug !== post.slug)
      .slice(0, 3);
  }, [post]);

  // Not found state
  if (!post) {
    return (
      <div className={styles.notFoundContainer}>
        <Helmet>
          <title>Article Not Found | Edufast Blog</title>
        </Helmet>
        <h2 className={styles.notFoundTitle}>Article Not Found</h2>
        <p className={styles.notFoundText}>
          The article you are looking for does not exist or may have been moved.
        </p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.publicationDate));

  // Parses content block. Subheadings start and end with **
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return (
          <h2 key={index} className={styles.subheading}>
            {trimmed.slice(2, -2)}
          </h2>
        );
      }

      return (
        <p key={index} className={styles.paragraph}>
          {trimmed}
        </p>
      );
    });
  };

  return (
    <main className={styles.pageContainer}>
      <Helmet>
        <title>{post.title} | Edufast Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link to="/blog" className={styles.breadcrumbLink}>
              Blog
            </Link>
            <ChevronRight size={16} className={styles.breadcrumbIcon} />
            <span className={styles.breadcrumbCurrent}>{post.title}</span>
          </div>

          <Badge variant="outline" className={styles.categoryBadge}>
            {post.category}
          </Badge>

          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className={styles.metaItem}>
              <Calendar size={16} />
              <span>{formattedDate}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </header>

        <figure className={styles.heroImageWrapper}>
          <img
            src={post.imageUrl}
            alt={post.title}
            className={styles.heroImage}
          />
        </figure>

        <div className={styles.contentBody}>
          {renderContent(post.content)}
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>Related Articles</h3>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                to={`/blog/${related.slug}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedImageWrapper}>
                  <img
                    src={related.imageUrl}
                    alt={related.title}
                    className={styles.relatedImage}
                  />
                </div>
                <div className={styles.relatedCardContent}>
                  <h4 className={styles.relatedCardTitle}>{related.title}</h4>
                  <div className={styles.relatedCardMeta}>
                    <Clock size={14} />
                    <span>{related.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
        <p className={styles.ctaText}>
          Apply now or book a free counseling session to discover how Edufast
          can help you achieve your goals in just 6 months.
        </p>
        <div className={styles.ctaButtons}>
          <Button asChild size="lg">
            <Link to="/apply-now">Apply Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/book-counseling">
              Book Free Counseling <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}