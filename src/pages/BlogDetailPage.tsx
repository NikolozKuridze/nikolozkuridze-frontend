import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Eye, ArrowLeft, Clock, Share2, User } from 'lucide-react';
import { Navigation } from '../components/Navigation/Navigation';
import { Footer } from '../components/Footer/Footer';
import { publicBlogService } from '../services/api.service';
import type { Blog } from '../types/api';
import '../styles/BlogDetailPage.css';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(false);
        const data = await publicBlogService.getBySlug(slug);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title.en,
          text: blog.description.en,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="app">
        <Navigation />
        <main className="blog-detail-page">
          <div className="container">
            <div className="blog-detail-loading">
              <div className="skeleton-hero" />
              <div className="skeleton-header">
                <div className="skeleton-title" />
                <div className="skeleton-meta" />
              </div>
              <div className="skeleton-content">
                <div className="skeleton-text" />
                <div className="skeleton-text" />
                <div className="skeleton-text" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="app">
        <Navigation />
        <main className="blog-detail-page">
          <div className="container">
            <motion.div
              className="blog-error"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Blog post not found</h2>
              <p>The blog post you're looking for doesn't exist or has been removed.</p>
              <button onClick={() => navigate('/blogs')} className="btn btn--primary">
                <ArrowLeft size={20} /> Back to Blogs
              </button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = blog.title[i18n.language as 'en' | 'ka'] || blog.title.en;
  const description = blog.description[i18n.language as 'en' | 'ka'] || blog.description.en;
  const content = blog.content[i18n.language as 'en' | 'ka'] || blog.content.en;

  return (
    <div className="app">
      <Navigation />

      <main className="blog-detail-page">
        {/* Back Button */}
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/blogs" className="back-button">
              <ArrowLeft size={20} />
              <span>Back to Blogs</span>
            </Link>
          </motion.div>
        </div>

        {/* Hero Image */}
        {blog.thumbnail && (
          <motion.div
            className="blog-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img src={blog.thumbnail} alt={title} />
            <div className="blog-hero__overlay" />
          </motion.div>
        )}

        {/* Content */}
        <article className="blog-article">
          <div className="container">
            <motion.header
              className="blog-header"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="blog-header__meta">
                <span className="blog-category">{blog.category}</span>
                {blog.featured && <span className="blog-featured-badge">Featured</span>}
              </div>

              <h1 className="blog-title">{title}</h1>
              <p className="blog-description">{description}</p>

              <div className="blog-info">
                <div className="blog-info__item">
                  <User size={18} />
                  <span>{blog.author?.name || 'Nikoloz Kuridze'}</span>
                </div>
                <div className="blog-info__item">
                  <Calendar size={18} />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="blog-info__item">
                  <Clock size={18} />
                  <span>{estimateReadingTime(content)}</span>
                </div>
                <div className="blog-info__item">
                  <Eye size={18} />
                  <span>{blog.views.toLocaleString()} views</span>
                </div>
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="blog-tags">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.header>

            <motion.div
              className="blog-content-wrapper"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: content }} />

              <div className="blog-footer">
                <button onClick={handleShare} className="share-button">
                  <Share2 size={20} />
                  <span>Share this article</span>
                </button>
              </div>
            </motion.div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
