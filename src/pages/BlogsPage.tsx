import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight, Eye, Search, Filter } from 'lucide-react';
import { Navigation } from '../components/Navigation/Navigation';
import { Footer } from '../components/Footer/Footer';
import { publicBlogService } from '../services/api.service';
import type { Blog } from '../types/api';
import '../styles/BlogsPage.css';

export default function BlogsPage() {
  const { i18n } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await publicBlogService.getPublished({
          page: currentPage,
          limit: 9,
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
        });
        setBlogs(response.blogs || []);
        setTotalPages(response.pagination?.totalPages || 1);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Get unique categories from blogs
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs by search query
  const filteredBlogs = blogs.filter(blog => {
    const title = blog.title[i18n.language as 'en' | 'ka'] || blog.title.en;
    const description = blog.description[i18n.language as 'en' | 'ka'] || blog.description.en;
    const searchLower = searchQuery.toLowerCase();

    return (
      title.toLowerCase().includes(searchLower) ||
      description.toLowerCase().includes(searchLower) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="app">
      <Navigation />

      <main className="blogs-page">
        {/* Hero Section */}
        <section className="blogs-page__hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="blogs-page__hero-content"
            >
              <h1 className="blogs-page__title">Blog</h1>
              <p className="blogs-page__subtitle">
                Insights, tutorials, and thoughts on software development, architecture, and technology
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="blogs-page__filters">
          <div className="container">
            <div className="filters-wrapper">
              <div className="search-box">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="category-filters">
                <Filter size={18} />
                <div className="category-buttons">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="blogs-page__content">
          <div className="container">
            {loading ? (
              <div className="blogs-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="blog-card-page glass skeleton">
                    <div className="skeleton-image" />
                    <div className="skeleton-content">
                      <div className="skeleton-title" />
                      <div className="skeleton-text" />
                      <div className="skeleton-text" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredBlogs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="no-results"
              >
                <BookOpen size={64} />
                <h3>No blogs found</h3>
                <p>Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${currentPage}`}
                  className="blogs-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredBlogs.map((blog, index) => {
                    const title = blog.title[i18n.language as 'en' | 'ka'] || blog.title.en;
                    const description = blog.description[i18n.language as 'en' | 'ka'] || blog.description.en;

                    return (
                      <motion.div
                        key={blog._id}
                        className="blog-card-page glass"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ y: -8 }}
                      >
                        <Link to={`/blogs/${blog.slug}`} className="blog-card-page__link">
                          <div className="blog-card-page__image">
                            {blog.thumbnail ? (
                              <img src={blog.thumbnail} alt={title} />
                            ) : (
                              <div className="blog-card-page__image-placeholder">
                                <BookOpen size={48} />
                              </div>
                            )}
                            {blog.featured && (
                              <div className="blog-card-page__badge">Featured</div>
                            )}
                            <div className="blog-card-page__category">{blog.category}</div>
                          </div>

                          <div className="blog-card-page__content">
                            <h3 className="blog-card-page__title">{title}</h3>
                            <p className="blog-card-page__description">
                              {truncateText(description, 150)}
                            </p>

                            <div className="blog-card-page__meta">
                              <div className="blog-card-page__meta-item">
                                <Calendar size={16} />
                                <span>{formatDate(blog.createdAt)}</span>
                              </div>
                              <div className="blog-card-page__meta-item">
                                <Eye size={16} />
                                <span>{blog.views.toLocaleString()}</span>
                              </div>
                            </div>

                            {blog.tags && blog.tags.length > 0 && (
                              <div className="blog-card-page__tags">
                                {blog.tags.slice(0, 3).map((tag) => (
                                  <span key={tag} className="tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="blog-card-page__footer">
                              <span className="blog-card-page__read-more">
                                Read Article <ArrowRight size={16} />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && (
              <motion.div
                className="pagination"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
