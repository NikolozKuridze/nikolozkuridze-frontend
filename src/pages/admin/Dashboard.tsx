import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../../store/adminStore';
import { BookOpen, FolderGit2, Eye, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalProjects: 0,
    totalViews: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogsRes, projectsRes] = await Promise.all([
        adminApi.get('/blogs/all'),
        adminApi.get('/projects/all')
      ]);

      const blogs = blogsRes.data.blogs || [];
      const projects = projectsRes.data.projects || [];
      const totalViews = blogs.reduce((sum: number, blog: any) => sum + (blog.views || 0), 0);

      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter((b: any) => b.published).length,
        totalProjects: projects.length,
        totalViews
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: t('admin.stats.totalBlogs'),
      value: stats.totalBlogs,
      icon: BookOpen,
      color: 'from-sky-500 to-blue-600'
    },
    {
      title: t('admin.stats.publishedBlogs'),
      value: stats.publishedBlogs,
      icon: TrendingUp,
      color: 'from-emerald-500 to-green-600'
    },
    {
      title: t('admin.stats.totalProjects'),
      value: stats.totalProjects,
      icon: FolderGit2,
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: t('admin.stats.totalViews'),
      value: stats.totalViews,
      icon: Eye,
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('admin.dashboard')}
        </h1>
        <p className="text-slate-400">
          Welcome to your admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
