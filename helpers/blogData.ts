export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "accelerated-degree-programs",
    title: "The Future of Education: Accelerated Degree Programs",
    excerpt: "Discover how accelerated degree programs are transforming higher education and helping students achieve their career goals faster.",
    content: `
      <p>Accelerated degree programs are revolutionizing the way students approach higher education. By condensing traditional four-year curricula into intensive 6-month programs, institutions like Edufast are making quality education more accessible and efficient.</p>
      
      <h2>Why Choose an Accelerated Program?</h2>
      <p>The benefits of accelerated learning extend far beyond just saving time. Students who complete these programs often report:</p>
      <ul>
        <li>Higher retention rates due to immersive learning</li>
        <li>Better career prospects with faster entry into the workforce</li>
        <li>Reduced educational costs</li>
        <li>More focused, industry-relevant curriculum</li>
      </ul>
      
      <h2>Our Approach</h2>
      <p>At Edufast, we've designed our programs to maximize learning efficiency without compromising on quality. Our hybrid learning model combines online flexibility with in-person support, ensuring students get the best of both worlds.</p>
    `,
    author: "Dr. Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min",
    category: "Education",
    tags: ["accelerated learning", "higher education", "career development"]
  },
  {
    id: "2",
    slug: "career-change-guide",
    title: "Complete Guide to Changing Careers in 2024",
    excerpt: "A comprehensive guide to successfully transitioning to a new career, including tips on upskilling and networking.",
    content: `
      <p>Changing careers can be both exciting and daunting. Whether you're looking to switch industries or advance in your current field, having a clear strategy is essential for success.</p>
      
      <h2>Step 1: Self-Assessment</h2>
      <p>Before making any moves, take time to understand your strengths, interests, and values. What drives you? What skills do you enjoy using?</p>
      
      <h2>Step 2: Research and Planning</h2>
      <p>Investigate your target industry thoroughly. Understand the required skills, typical career paths, and market demand.</p>
      
      <h2>Step 3: Skill Development</h2>
      <p>Identify skill gaps and create a learning plan. This might include formal education, online courses, or self-study.</p>
    `,
    author: "Michael Chen",
    date: "2024-01-10",
    readTime: "8 min",
    category: "Career",
    tags: ["career change", "professional development", "job search"]
  },
  {
    id: "3",
    slug: "online-learning-tips",
    title: "10 Tips for Successful Online Learning",
    excerpt: "Master the art of online education with these proven strategies for staying motivated and achieving your goals.",
    content: `
      <p>Online learning offers incredible flexibility, but it also requires discipline and the right approach. Here are our top tips for success:</p>
      
      <h2>1. Create a Dedicated Study Space</h2>
      <p>Having a specific area for learning helps your brain switch into 'study mode' and minimizes distractions.</p>
      
      <h2>2. Establish a Routine</h2>
      <p>Set regular study hours and stick to them. Consistency is key in online learning environments.</p>
      
      <h2>3. Stay Connected</h2>
      <p>Engage with instructors and fellow students through forums, video calls, and group projects.</p>
    `,
    author: "Emily Rodriguez",
    date: "2024-01-05",
    readTime: "6 min",
    category: "Learning",
    tags: ["online learning", "study tips", "productivity"]
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}
