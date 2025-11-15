import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { blogService } from '../../services/api.service';
import { Plus, Edit, Trash2, Eye, BookOpen, Search, Filter, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Blog } from '../../types/api';

export default function AdminBlogs() {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await blogService.getAll();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error(t('admin.common.error') || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('admin.blog.confirmDelete'))) return;

    const deletePromise = blogService.delete(id);

    toast.promise(
      deletePromise,
      {
        loading: 'Deleting blog...',
        success: 'Blog deleted successfully!',
        error: 'Failed to delete blog',
      }
    );

    try {
      await deletePromise;
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = blogs.filter(blog => {
    const title = blog.title[i18n.language as 'en' | 'ka'] || blog.title.en;
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           blog.slug.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-800/50 rounded w-32 mb-2" />
            <div className="h-4 bg-slate-800/30 rounded w-48" />
          </div>
          <div className="h-12 bg-slate-800/50 rounded-lg w-32" />
        </div>

        {/* Search skeleton */}
        <div className="h-12 bg-slate-800/30 rounded-xl animate-pulse" />

        {/* Table skeleton */}
        <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden animate-pulse">
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-16 bg-slate-700/50 rounded flex-1" />
              </div>
            ))}
          </div>
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
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent mb-2">
            {t('admin.blogs')}
          </h1>
          <p className="text-slate-400 text-lg">
            Manage and organize your blog content
          </p>
        </div>
        <Link to="/admin/blogs/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-sky-500/20 font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>{t('admin.blog.create')}</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs by title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 px-6 py-3.5 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl text-slate-300 hover:text-white hover:border-slate-600/50 transition-all"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </motion.button>
      </motion.div>

      {/* Blog Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/30">
                <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wider">
                  {t('admin.blog.title')}
                </th>
                <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wider">
                  {t('admin.blog.category')}
                </th>
                <th className="text-center px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center justify-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>Views</span>
                  </div>
                </th>
                <th className="text-right px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wider">
                  {t('admin.common.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredBlogs.map((blog, index) => (
                  <motion.tr
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-all duration-200 group"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-white font-semibold mb-1 group-hover:text-sky-400 transition-colors">
                          {blog.title[i18n.language as 'en' | 'ka'] || blog.title.en}
                        </p>
                        <p className="text-sm text-slate-500 font-mono">/{blog.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {t(`admin.blog.categories.${blog.category}`)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center space-x-2">
                        {blog.published ? (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-500/10 text-slate-300 border border-slate-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2" />
                            Draft
                          </span>
                        )}
                        {blog.featured && (
                          <span className="inline-flex px-2 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            ⭐
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300 font-semibold">{blog.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/admin/blogs/edit/${blog._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2.5 text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors border border-transparent hover:border-sky-500/20"
                          >
                            <Edit className="w-5 h-5" />
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(blog._id)}
                          className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex p-6 rounded-2xl bg-slate-800/30 mb-4">
              <BookOpen className="w-12 h-12 text-slate-600" />
            </div>
            <p className="text-slate-400 text-lg mb-2">
              {searchQuery ? 'No blogs found matching your search' : 'No blogs yet'}
            </p>
            <p className="text-slate-500 text-sm">
              {searchQuery ? 'Try a different search term' : 'Create your first blog post to get started'}
            </p>
            {!searchQuery && (
              <Link to="/admin/blogs/new">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-sky-500/20"
                >
                  Create Your First Blog
                </motion.button>
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Stats Footer */}
      {filteredBlogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center justify-between text-sm text-slate-400"
        >
          <div className="flex items-center space-x-4">
            <span>Showing {filteredBlogs.length} of {blogs.length} blogs</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Last updated: Today</span>
          </div>
        </motion.div>
      )}
    </>
  );
}
