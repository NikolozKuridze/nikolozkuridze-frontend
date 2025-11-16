import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { blogService } from '../../services/api.service';
import { Plus, Edit, Trash2, Eye, Search, FileText, Calendar, ArrowLeft, BookOpen, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Blog } from '../../types/api';

export default function AdminBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBlogs = useCallback(async () => {
    try {
      const data = await blogService.getAll();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await blogService.delete(id);
      toast.success('Blog deleted successfully!');
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const title = blog.title.en || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           blog.slug.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'transparent'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid #334155',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => navigate('/admin/dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#94a3b8',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#334155';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e293b';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          
          <span style={{ color: '#64748b' }}>•</span>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            fontSize: '14px'
          }}>
            <Home size={16} />
            <span>/</span>
            <span>Admin</span>
            <span>/</span>
            <span style={{ color: '#ffffff', fontWeight: '500' }}>Blogs</span>
          </div>
        </div>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={24} style={{ color: '#3b82f6' }} />
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#ffffff'
              }}>
                Blog Management
              </h1>
            </div>
            <p style={{
              fontSize: '16px',
              color: '#94a3b8',
              paddingLeft: '60px'
            }}>
              Create and manage your blog posts
            </p>
          </div>
          
          <Link to="/admin/blogs/new" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
              }}
            >
              <Plus size={20} />
              Create New Blog
            </motion.button>
          </Link>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Total Blogs', value: blogs.length, color: '#3b82f6' },
            { label: 'Published', value: blogs.filter(b => b.published).length, color: '#10b981' },
            { label: 'Drafts', value: blogs.filter(b => !b.published).length, color: '#f59e0b' },
            { label: 'Featured', value: blogs.filter(b => b.featured).length, color: '#8b5cf6' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {stat.label}
                </p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#ffffff'
                }}>
                  {stat.value}
                </p>
              </div>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: stat.color
              }} />
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{
          marginBottom: '24px'
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '400px'
          }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b'
            }} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 48px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155';
              }}
            />
          </div>
        </div>

        {/* Blogs Table */}
        <div style={{
          background: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid #334155'
              }}>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Title
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Category
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Status
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Views
                </th>
                <th style={{
                  padding: '16px 24px',
                  textAlign: 'right',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{
                    padding: '48px',
                    textAlign: 'center'
                  }}>
                    <FileText size={48} style={{
                      color: '#334155',
                      margin: '0 auto 16px'
                    }} />
                    <p style={{
                      fontSize: '16px',
                      color: '#64748b',
                      marginBottom: '24px'
                    }}>
                      No blogs found
                    </p>
                    <Link to="/admin/blogs/new" style={{ textDecoration: 'none' }}>
                      <button style={{
                        background: '#3b82f6',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        Create Your First Blog
                      </button>
                    </Link>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog, index) => (
                  <motion.tr
                    key={blog.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      borderBottom: '1px solid #334155',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <td style={{
                      padding: '20px 24px'
                    }}>
                      <div>
                        <p style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#ffffff',
                          marginBottom: '4px'
                        }}>
                          {blog.title.en}
                        </p>
                        <p style={{
                          fontSize: '13px',
                          color: '#64748b'
                        }}>
                          /{blog.slug}
                        </p>
                      </div>
                    </td>
                    <td style={{
                      padding: '20px 24px'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        color: '#a78bfa',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}>
                        {blog.category}
                      </span>
                    </td>
                    <td style={{
                      padding: '20px 24px',
                      textAlign: 'center'
                    }}>
                      {blog.published ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 12px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#10b981',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}>
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#10b981'
                          }} />
                          Published
                        </span>
                      ) : (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 12px',
                          background: 'rgba(100, 116, 139, 0.1)',
                          color: '#64748b',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}>
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#64748b'
                          }} />
                          Draft
                        </span>
                      )}
                    </td>
                    <td style={{
                      padding: '20px 24px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}>
                        <Eye size={16} style={{ color: '#64748b' }} />
                        <span style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#ffffff'
                        }}>
                          {blog.views.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td style={{
                      padding: '20px 24px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '8px'
                      }}>
                        <Link to={`/admin/blogs/edit/${blog.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                              padding: '8px',
                              background: 'rgba(59, 130, 246, 0.1)',
                              border: '1px solid rgba(59, 130, 246, 0.2)',
                              borderRadius: '8px',
                              color: '#3b82f6',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Edit size={18} />
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(blog.id)}
                          style={{
                            padding: '8px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        {filteredBlogs.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            fontSize: '14px',
            color: '#64748b'
          }}>
            <span>
              Showing {filteredBlogs.length} of {blogs.length} blogs
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Calendar size={16} />
              <span>Last updated today</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}