import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../../store/adminStore';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';

interface Blog {
  _id: string;
  title: { en: string; ka: string };
  slug: string;
  category: string;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
}

export default function AdminBlogs() {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await adminApi.get('/blogs/all');
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('admin.blog.confirmDelete'))) return;

    try {
      await adminApi.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert(t('admin.common.error'));
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-slate-400">{t('admin.common.loading')}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('admin.blogs')}
          </h1>
          <p className="text-slate-400">
            Manage your blog posts
          </p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>{t('admin.blog.create')}</span>
        </Link>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  {t('admin.blog.title')}
                </th>
                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  {t('admin.blog.category')}
                </th>
                <th className="text-center px-6 py-4 text-slate-300 font-semibold">
                  Status
                </th>
                <th className="text-center px-6 py-4 text-slate-300 font-semibold">
                  <Eye className="w-5 h-5 inline" />
                </th>
                <th className="text-right px-6 py-4 text-slate-300 font-semibold">
                  {t('admin.common.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">
                        {blog.title[i18n.language as 'en' | 'ka'] || blog.title.en}
                      </p>
                      <p className="text-sm text-slate-400">/{blog.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                      {t(`admin.blog.categories.${blog.category}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {blog.published ? (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-500/20 text-slate-300">
                          Draft
                        </span>
                      )}
                      {blog.featured && (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-300">
                    {blog.views}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/admin/blogs/edit/${blog._id}`}
                        className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No blogs yet. Create your first one!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
