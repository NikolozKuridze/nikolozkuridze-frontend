import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// import { adminApi } from '../../store/adminStore'; // Will be used when .NET API is ready
import { BookOpen, FolderGit2, Eye, TrendingUp, ArrowUpRight, Plus, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalProjects: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // MOCK DATA FOR TESTING - Remove when .NET API is ready
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay

    setStats({
      totalBlogs: 12,
      publishedBlogs: 8,
      totalProjects: 15,
      totalViews: 1234
    });
    setLoading(false);

    /* REAL API IMPLEMENTATION - Uncomment when .NET API is ready
    try {
      const [blogsRes, projectsRes] = await Promise.all([
        adminApi.get('/blogs/all'),
        adminApi.get('/projects/all')
      ]);

      const blogs = blogsRes.data.blogs || [];
      const projects = projectsRes.data.projects || [];
      const totalViews = blogs.reduce((sum: number, blog: Blog) => sum + (blog.views || 0), 0);

      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter((b: Blog) => b.published).length,
        totalProjects: projects.length,
        totalViews
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
    */
  };

  const statCards = [
    {
      title: t('admin.stats.totalBlogs'),
      value: stats.totalBlogs,
      icon: BookOpen,
      gradient: 'from-sky-500 to-blue-600',
      trend: '+12%',
      trendUp: true
    },
    {
      title: t('admin.stats.publishedBlogs'),
      value: stats.publishedBlogs,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-green-600',
      trend: '+8%',
      trendUp: true
    },
    {
      title: t('admin.stats.totalProjects'),
      value: stats.totalProjects,
      icon: FolderGit2,
      gradient: 'from-purple-500 to-violet-600',
      trend: '+3',
      trendUp: true
    },
    {
      title: t('admin.stats.totalViews'),
      value: stats.totalViews,
      icon: Eye,
      gradient: 'from-amber-500 to-orange-600',
      trend: '+23%',
      trendUp: true
    }
  ];

  const quickActions = [
    {
      title: 'Create New Blog',
      description: 'Write and publish a new blog post',
      icon: BookOpen,
      to: '/admin/blogs/new',
      gradient: 'from-sky-500 to-blue-600'
    },
    {
      title: 'Add Project',
      description: 'Showcase a new project',
      icon: FolderGit2,
      to: '/admin/projects/new',
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-slate-800/50 rounded w-48 mb-2" />
          <div className="h-4 bg-slate-800/30 rounded w-64" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-slate-700/50" />
              </div>
              <div className="h-4 bg-slate-700/50 rounded w-24 mb-2" />
              <div className="h-8 bg-slate-700/50 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-sky-100 to-white bg-clip-text text-transparent mb-2">
          {t('admin.dashboard')}
        </h1>
        <p className="text-slate-400 text-lg">
          Welcome back! Here's what's happening with your content.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative"
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />

            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300 overflow-hidden">
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-semibold ${card.trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{card.trend}</span>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2 font-medium">{card.title}</p>
                  <p className="text-4xl font-bold text-white mb-1">
                    {card.value.toLocaleString()}
                  </p>
                  <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden mt-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '70%' }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${card.gradient}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.to}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{action.title}</h3>
                      <p className="text-slate-400 text-sm">{action.description}</p>
                    </div>
                  </div>
                  <Plus className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="divide-y divide-slate-700/50">
            {[
              { type: 'blog', title: 'Getting Started with React', time: '2 hours ago', status: 'published' },
              { type: 'project', title: 'E-Commerce Platform', time: '5 hours ago', status: 'updated' },
              { type: 'blog', title: 'Advanced TypeScript Patterns', time: '1 day ago', status: 'draft' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-6 hover:bg-slate-700/20 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${item.type === 'blog' ? 'bg-sky-500/10' : 'bg-purple-500/10'}`}>
                      {item.type === 'blog' ? (
                        <BookOpen className={`w-5 h-5 ${item.type === 'blog' ? 'text-sky-400' : 'text-purple-400'}`} />
                      ) : (
                        <FolderGit2 className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium group-hover:text-sky-400 transition-colors">{item.title}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-slate-400 text-sm flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {item.time}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' :
                          item.status === 'updated' ? 'bg-sky-500/20 text-sky-300' :
                          'bg-slate-500/20 text-slate-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Star className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
