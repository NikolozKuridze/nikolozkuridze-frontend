import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { blogService } from '../../services/api.service';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { Save, X } from 'lucide-react';
import type { Author } from '../../types/api';

interface BlogForm {
  title: { en: string; ka: string };
  slug: string;
  description: { en: string; ka: string };
  content: { en: string; ka: string };
  category: string;
  tags: string;
  thumbnail: string;
  author: Author;
  published: boolean;
  featured: boolean;
}

export default function BlogEditor() {
  const { t, ready } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // All hooks must be called before any conditional returns
  const [form, setForm] = useState<BlogForm>({
    title: { en: '', ka: '' },
    slug: '',
    description: { en: '', ka: '' },
    content: { en: '', ka: '' },
    category: 'article',
    tags: '',
    thumbnail: '',
    author: { name: '', bio: '', avatar: '' },
    published: false,
    featured: false
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'ka'>('en');

  const fetchBlog = useCallback(async () => {
    if (!id) return;

    try {
      const blog = await blogService.getById(id);
      setForm({
        title: blog.title,
        slug: blog.slug,
        description: blog.description,
        content: blog.content,
        category: blog.category,
        tags: blog.tags?.join(', ') || '',
        thumbnail: blog.thumbnail || '',
        author: blog.author || { name: '', bio: '', avatar: '' },
        published: blog.published,
        featured: blog.featured
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error(t('admin.common.error') || 'Failed to load blog');
      navigate('/admin/blogs');
    }
  }, [id, t, navigate]);

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, [isEdit, fetchBlog]);

  // Loading state while translations load
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-lg">Loading editor...</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const blogData = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      content: form.content,
      category: form.category,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      thumbnail: form.thumbnail || undefined,
      author: form.author,
      published: form.published,
      featured: form.featured
    };

    const savePromise = isEdit && id
      ? blogService.update(id, blogData)
      : blogService.create(blogData);

    toast.promise(
      savePromise,
      {
        loading: isEdit ? 'Updating blog...' : 'Creating blog...',
        success: isEdit ? 'Blog updated successfully!' : 'Blog created successfully!',
        error: isEdit ? 'Failed to update blog' : 'Failed to create blog',
      }
    );

    try {
      await savePromise;
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = () => {
    const slug = form.title.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setForm({ ...form, slug });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isEdit ? t('admin.blog.edit') : t('admin.blog.create')}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language Tabs */}
        <div className="flex space-x-2 border-b border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('en')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'en'
                ? 'text-sky-400 border-b-2 border-sky-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('admin.common.english')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ka')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'ka'
                ? 'text-sky-400 border-b-2 border-sky-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('admin.common.georgian')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.title')} ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={form.title[activeTab]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: { ...form.title, [activeTab]: e.target.value }
                  })
                }
                onBlur={() => activeTab === 'en' && !form.slug && generateSlug()}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.description')} ({activeTab.toUpperCase()})
              </label>
              <textarea
                value={form.description[activeTab]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: { ...form.description, [activeTab]: e.target.value }
                  })
                }
                required
                rows={3}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.content')} ({activeTab.toUpperCase()})
              </label>
              <RichTextEditor
                value={form.content[activeTab]}
                onChange={(value) =>
                  setForm({
                    ...form,
                    content: { ...form.content, [activeTab]: value }
                  })
                }
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? t('admin.common.loading') : t('admin.blog.save')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/blogs')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                  <span>{t('admin.blog.cancel')}</span>
                </button>
              </div>
            </div>

            {/* Slug */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.slug')}
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Category */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.category')}
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="tutorial">{t('admin.blog.categories.tutorial')}</option>
                <option value="tip">{t('admin.blog.categories.tip')}</option>
                <option value="article">{t('admin.blog.categories.article')}</option>
                <option value="news">{t('admin.blog.categories.news')}</option>
              </select>
            </div>

            {/* Tags */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.tags')}
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="react, javascript, tutorial"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <p className="text-xs text-slate-400 mt-2">Comma separated</p>
            </div>

            {/* Thumbnail */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.thumbnail')}
              </label>
              <input
                type="text"
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Author */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-semibold mb-4">Author</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.author.name}
                    onChange={(e) => setForm({
                      ...form,
                      author: { ...form.author, name: e.target.value }
                    })}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={form.author.bio || ''}
                    onChange={(e) => setForm({
                      ...form,
                      author: { ...form.author, bio: e.target.value }
                    })}
                    rows={2}
                    placeholder="Short bio..."
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    value={form.author.avatar || ''}
                    onChange={(e) => setForm({
                      ...form,
                      author: { ...form.author, avatar: e.target.value }
                    })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 space-y-4">
              <h3 className="text-white font-semibold">Settings</h3>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-sky-500 focus:ring-2 focus:ring-sky-500"
                />
                <span className="text-slate-300">{t('admin.blog.published')}</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-sky-500 focus:ring-2 focus:ring-sky-500"
                />
                <span className="text-slate-300">{t('admin.blog.featured')}</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
