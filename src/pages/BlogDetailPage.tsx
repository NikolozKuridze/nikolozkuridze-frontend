import { useEffect, useState, useRef } from 'react';
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
  const contentRef = useRef<HTMLDivElement>(null);

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add toast notification here
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  // Enhance code blocks with copy button and language label
  useEffect(() => {
    if (!contentRef.current || !blog) return;

    const enhanceCodeBlocks = () => {
      const codeBlocks = contentRef.current?.querySelectorAll('pre');

      codeBlocks?.forEach((pre) => {
        // Skip if already enhanced
        if (pre.parentElement?.classList.contains('enhanced-code-block')) return;

        // Detect language from classes or attributes
        const codeElement = pre.querySelector('code');
        let language = 'code';

        if (codeElement) {
          const classes = codeElement.className.match(/language-(\w+)/);
          if (classes && classes[1]) {
            language = classes[1];
          } else if (codeElement.className.match(/ql-syntax/)) {
            // Try to detect from highlighted code
            language = 'code';
          }
        }

        // Get code text
        const codeText = pre.textContent || '';

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'enhanced-code-block';

        // Create header
        const header = document.createElement('div');
        header.className = 'code-header';

        // Language label
        const langLabel = document.createElement('div');
        langLabel.className = 'code-language';
        langLabel.textContent = language;

        // Copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-button';
        copyBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" width="20" height="20"><path d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
        copyBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          copyToClipboard(codeText);
          copyBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" width="20" height="20"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
          setTimeout(() => {
            copyBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" width="20" height="20"><path d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
          }, 2000);
        };

        header.appendChild(langLabel);
        header.appendChild(copyBtn);

        // Wrap the pre element
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(header);
        wrapper.appendChild(pre);
      });
    };

    enhanceCodeBlocks();
  }, [blog]);

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
              <div ref={contentRef} className="blog-content" dangerouslySetInnerHTML={{ __html: content }} />

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
