import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Calendar, ArrowRight, Eye } from 'lucide-react';
import { publicBlogService } from '../../services/api.service';
import type { Blog } from '../../types/api';
import './Blogs.css';

export const Blogs = () => {
  const { i18n } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await publicBlogService.getPublished({ limit: 3, featured: true });
        setBlogs(response.blogs || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section id="blogs" className="blogs section">
        <div className="blogs__container container">
          <div className="blogs__header">
            <span className="blogs__subtitle">Insights</span>
            <h2 className="blogs__title">Latest Blog Posts</h2>
          </div>
          <div className="blogs__grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="blog-card glass skeleton">
                <div className="skeleton-image" />
                <div className="skeleton-content">
                  <div className="skeleton-title" />
                  <div className="skeleton-text" />
                  <div className="skeleton-text" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="blogs section">
      <div className="blogs__container container">
        <motion.div
          className="blogs__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="blogs__subtitle">Insights</span>
          <h2 className="blogs__title">Latest Blog Posts</h2>
          <p className="blogs__intro">
            Sharing knowledge, insights, and experiences from the world of technology
          </p>
        </motion.div>

        <div className="blogs__grid">
          {blogs.map((blog, index) => {
            const title = blog.title[i18n.language as 'en' | 'ka'] || blog.title.en;
            const description = blog.description[i18n.language as 'en' | 'ka'] || blog.description.en;

            return (
              <motion.div
                key={blog.id}
                className="blog-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link to={`/blogs/${blog.slug}`} className="blog-card__link">
                  <div className="blog-card__image">
                    {blog.thumbnail ? (
                      <img src={blog.thumbnail} alt={title} />
                    ) : (
                      <div className="blog-card__image-placeholder">
                        <BookOpen size={48} />
                      </div>
                    )}
                    {blog.featured && (
                      <div className="blog-card__badge">Featured</div>
                    )}
                    <div className="blog-card__category">{blog.category}</div>
                  </div>

                  <div className="blog-card__content">
                    <h3 className="blog-card__title">{title}</h3>
                    <p className="blog-card__description">
                      {truncateText(description, 120)}
                    </p>

                    <div className="blog-card__meta">
                      <div className="blog-card__meta-item">
                        <Calendar size={16} />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="blog-card__meta-item">
                        <Eye size={16} />
                        <span>{blog.views.toLocaleString()} views</span>
                      </div>
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="blog-card__tags">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="blog-card__footer">
                      <span className="blog-card__read-more">
                        Read More <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {blogs.length > 0 && (
          <motion.div
            className="blogs__view-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/blogs" className="btn btn--primary">
              View All Posts <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
