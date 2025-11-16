import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Eye, ArrowLeft, Clock, Share2, User } from 'lucide-react';
import { Navigation } from '../components/Navigation/Navigation';
import { Footer } from '../components/Footer/Footer';
import { publicBlogService } from '../services/api.service';
import type { Blog } from '../types/api';
import toast from 'react-hot-toast';
// Import highlight.js for syntax highlighting
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import '../styles/BlogDetailPage.css';

// Import necessary languages
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import csharp from 'highlight.js/lib/languages/csharp';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import sql from 'highlight.js/lib/languages/sql';
import bash from 'highlight.js/lib/languages/bash';
import python from 'highlight.js/lib/languages/python';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('cs', csharp);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('python', python);

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});
  const [linkCopied, setLinkCopied] = useState(false);

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
        const title = blog.title[i18n.language as 'en' | 'ka'] || blog.title.en;
        await navigator.share({
          title: title,
          text: blog.description[i18n.language as 'en' | 'ka'] || blog.description.en,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying link
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setLinkCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setLinkCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy link');
    });
  };

  const handleShareTwitter = () => {
    const title = blog?.title[i18n.language as 'en' | 'ka'] || blog?.title.en || '';
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getLanguageDisplayName = (language: string): string => {
    const displayNames: Record<string, string> = {
      javascript: 'javascript',
      typescript: 'typescript',
      csharp: 'csharp',
      cs: 'csharp',
      python: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      html: 'html',
      xml: 'xml',
      css: 'css',
      scss: 'scss',
      sql: 'sql',
      bash: 'bash',
      shell: 'shell',
      json: 'json',
      yaml: 'yaml',
      plaintext: 'code',
    };

    return displayNames[language.toLowerCase()] || language.toLowerCase();
  };

  // Enhanced code blocks with syntax highlighting
  useEffect(() => {
    if (!contentRef.current || !blog) return;

    const enhanceCodeBlocks = () => {
      const codeBlocks = contentRef.current?.querySelectorAll('pre');

      codeBlocks?.forEach((pre, index) => {
        // Skip if already enhanced
        if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

        // Try to detect language
        let language = 'plaintext';
        const codeElement = pre.querySelector('code');
        
        if (codeElement) {
          // Check for class name with language
          const className = codeElement.className;
          const langMatch = className.match(/language-(\w+)/);
          
          if (langMatch) {
            language = langMatch[1];
          } else {
            // Try to auto-detect
            try {
              const detected = hljs.highlightAuto(codeElement.textContent || '');
              language = detected.language || 'plaintext';
            } catch (e) {
              console.warn('Failed to auto-detect language:', e);
            }
          }
          
          // Apply syntax highlighting
          if (language !== 'plaintext') {
            try {
              const highlighted = hljs.highlight(codeElement.textContent || '', { language });
              codeElement.innerHTML = highlighted.value;
              codeElement.className = `hljs language-${language}`;
            } catch (e) {
              console.warn('Failed to highlight code:', e);
              // Fallback to auto-highlighting
              try {
                const highlighted = hljs.highlightAuto(codeElement.textContent || '');
                codeElement.innerHTML = highlighted.value;
                codeElement.className = `hljs`;
                language = highlighted.language || 'plaintext';
              } catch (e2) {
                console.warn('Auto-highlight also failed:', e2);
              }
            }
          }
        }

        // Get code text for copying
        const codeText = pre.textContent || '';

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';

        // Create header
        const header = document.createElement('div');
        header.className = 'code-block-header';

        // Language label
        const langLabel = document.createElement('span');
        langLabel.className = 'code-block-language';
        langLabel.textContent = getLanguageDisplayName(language);

        // Add header to wrapper
        header.appendChild(langLabel);
        
        // Create copy button
        const copyBtnWrapper = document.createElement('div');
        copyBtnWrapper.className = 'code-block-copy-wrapper';
        copyBtnWrapper.innerHTML = `
          <button class="code-block-copy-btn" data-index="${index}">
            ${copiedStates[index] ? 
              '<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>' : 
              '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"/></svg>'
            }
          </button>
        `;
        
        const copyBtn = copyBtnWrapper.querySelector('.code-block-copy-btn');
        copyBtn?.addEventListener('click', () => copyToClipboard(codeText, index));
        
        header.appendChild(copyBtnWrapper);

        // Create content wrapper
        const content = document.createElement('div');
        content.className = 'code-block-content';

        // Insert elements
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(header);
        wrapper.appendChild(content);
        content.appendChild(pre);
      });
    };

    // Initial enhancement
    enhanceCodeBlocks();

    // Also highlight any inline code
    const inlineCode = contentRef.current?.querySelectorAll('code:not(pre code)');
    inlineCode?.forEach(code => {
      if (!code.classList.contains('hljs')) {
        try {
          const highlighted = hljs.highlightAuto(code.textContent || '');
          code.innerHTML = highlighted.value;
          code.classList.add('hljs-inline');
        } catch (e) {
          console.log(e);
        }
      }
    });
  }, [blog, copiedStates]);

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
                  <span>{blog.author || 'Nikoloz Kuridze'}</span>
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
              <div ref={contentRef} className="blog-content enhanced-code-blocks" dangerouslySetInnerHTML={{ __html: content }} />

              {/* Enhanced Blog Footer Section */}
              <div className="blog-footer">
                <div className="share-section">
                  <h4>Enjoyed this article?</h4>
                  <div className="share-buttons">
                    <button onClick={handleShare} className="share-button">
                      <Share2 size={20} />
                      <span>Share this article</span>
                    </button>
                    
                    <div className="social-share-buttons">
                      <button 
                        className="social-share-btn"
                        onClick={handleShareTwitter}
                        title="Share on Twitter"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </button>
                      
                      <button 
                        className="social-share-btn"
                        onClick={handleShareLinkedIn}
                        title="Share on LinkedIn"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </button>
                      
                      <button 
                        className={`social-share-btn ${linkCopied ? 'copied' : ''}`}
                        onClick={handleCopyLink}
                        title="Copy link"
                      >
                        {linkCopied ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Author section */}
                {blog.author && (
                  <div className="author-section">
                    <div className="author-avatar">
                      <User size={24} />
                    </div>
                    <div className="author-info">
                      <span className="author-label">Written by</span>
                      <span className="author-name">{blog.author}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}