import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { dashboardService } from '../../services/api.service';
import { 
  BookOpen, 
  FolderGit2, 
  Eye,  
  Plus, 
  Clock,
  FileText,
  ArrowUp,
  Activity,
  ChevronRight,
  LayoutDashboard, 
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { DashboardStats, RecentActivity } from '../../types/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalProjects: 0,
    totalViews: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, activityData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentActivity()
      ]);

      setStats(statsData);
      setRecentActivity(activityData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Navigation cards for quick access
  const navigationCards = [
    {
      title: 'Manage Blogs',
      description: 'View and manage all blog posts',
      icon: BookOpen,
      path: '/admin/blogs',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      count: stats.totalBlogs
    },
    {
      title: 'Manage Projects',
      description: 'View and manage portfolio projects',
      icon: FolderGit2,
      path: '/admin/projects',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      count: stats.totalProjects
    }
  ];

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
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        
        {/* Header with breadcrumb */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <LayoutDashboard size={20} style={{ color: '#64748b' }} />
            <span style={{ color: '#64748b', fontSize: '14px' }}>/</span>
            <span style={{ color: '#64748b', fontSize: '14px' }}>Admin</span>
            <span style={{ color: '#64748b', fontSize: '14px' }}>/</span>
            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
          </div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>
            Dashboard Overview
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#94a3b8'
          }}>
            Welcome back! Here's what's happening with your content.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {navigationCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(card.path)}
                style={{
                  background: '#1e293b',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #334155',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s'
                }}
              >
                {/* Gradient overlay on hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: card.gradient,
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.05'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: card.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={28} style={{ color: card.color }} />
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: 'rgba(15, 23, 42, 0.5)',
                      borderRadius: '8px'
                    }}>
                      <span style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#ffffff'
                      }}>
                        {card.count}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        total
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#ffffff',
                      marginBottom: '8px'
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#94a3b8',
                      marginBottom: '16px'
                    }}>
                      {card.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: card.color,
                      fontWeight: '500',
                      fontSize: '14px'
                    }}>
                      <span>Go to {card.title.split(' ')[1]}</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {[
            { 
              label: 'Total Blogs', 
              value: stats.totalBlogs, 
              icon: FileText, 
              change: '+12%',
              color: '#3b82f6',
              bgColor: 'rgba(59, 130, 246, 0.1)',
              onClick: () => navigate('/admin/blogs')
            },
            { 
              label: 'Published', 
              value: stats.publishedBlogs, 
              icon: BookOpen, 
              change: '+8%',
              color: '#10b981',
              bgColor: 'rgba(16, 185, 129, 0.1)',
              onClick: () => navigate('/admin/blogs')
            },
            { 
              label: 'Projects', 
              value: stats.totalProjects, 
              icon: FolderGit2, 
              change: '+3',
              color: '#8b5cf6',
              bgColor: 'rgba(139, 92, 246, 0.1)',
              onClick: () => navigate('/admin/projects')
            },
            { 
              label: 'Total Views', 
              value: stats.totalViews, 
              icon: Eye, 
              change: '+23%',
              color: '#f59e0b',
              bgColor: 'rgba(245, 158, 11, 0.1)',
              onClick: null
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() =>stat.onClick}
                style={{
                  background: '#1e293b',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #334155',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: stat.onClick ? 'pointer' : 'default',
                  transition: 'transform 0.3s'
                }}
                whileHover={stat.onClick ? { scale: 1.02 } : {}}
              >
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: stat.bgColor,
                  filter: 'blur(60px)'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: stat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} style={{ color: stat.color }} />
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: '#10b981',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <ArrowUp size={16} />
                      {stat.change}
                    </span>
                  </div>
                  
                  <div>
                    <p style={{
                      fontSize: '14px',
                      color: '#94a3b8',
                      marginBottom: '4px',
                      fontWeight: '500'
                    }}>
                      {stat.label}
                    </p>
                    <p style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#ffffff'
                    }}>
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  
                  {stat.onClick && (
                    <div style={{
                      position: 'absolute',
                      bottom: '24px',
                      right: '24px'
                    }}>
                      <ChevronRight size={20} style={{ color: '#64748b' }} />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Weekly Activity Chart */}
          <div style={{
            background: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #334155'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff'
              }}>
                Weekly Activity
              </h2>
              <Activity size={20} style={{ color: '#3b82f6' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '200px' }}>
              {[65, 45, 78, 52, 88, 72, 95].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  style={{
                    flex: 1,
                    background: `linear-gradient(to top, #3b82f6, #60a5fa)`,
                    borderRadius: '8px 8px 0 0',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  whileHover={{ opacity: 0.8 }}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '12px',
                    color: '#64748b'
                  }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: '#1e293b',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #334155'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff'
              }}>
                Recent Activity
              </h2>
              <Link to="/admin/blogs" style={{
                fontSize: '14px',
                color: '#3b82f6',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                View all
                <ChevronRight size={16} />
              </Link>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentActivity.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '32px 0',
                  color: '#64748b'
                }}>
                  <Clock size={48} style={{ 
                    margin: '0 auto 16px', 
                    opacity: 0.5 
                  }} />
                  <p>No recent activity</p>
                  <p style={{ fontSize: '14px', marginTop: '8px' }}>
                    Create your first blog or project to see activity here
                  </p>
                </div>
              ) : (
                recentActivity.slice(0, 5).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    onClick={() => navigate(item.type === 'blog' ? '/admin/blogs' : '/admin/projects')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      background: '#0f172a',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    whileHover={{ x: 4 }}
                  >
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: item.type === 'blog' ? '#3b82f6' : '#8b5cf6',
                      flexShrink: 0
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: '14px',
                        color: '#ffffff',
                        fontWeight: '500',
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.title}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#64748b'
                      }}>
                        {item.status} • {new Date(item.time).toLocaleDateString()}
                      </p>
                    </div>
                    <ChevronRight size={16} style={{ color: '#64748b' }} />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <Link to="/admin/blogs/new" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
              }}
            >
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '4px'
                }}>
                  Create New Blog
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Share your thoughts and insights
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Plus size={24} style={{ color: '#ffffff' }} />
              </div>
            </motion.div>
          </Link>

          <Link to="/admin/projects/new" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
              }}
            >
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '4px'
                }}>
                  Add New Project
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  Showcase your latest work
                </p>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Plus size={24} style={{ color: '#ffffff' }} />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}