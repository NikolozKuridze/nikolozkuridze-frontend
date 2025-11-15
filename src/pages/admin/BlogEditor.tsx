import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { blogService } from '../../services/api.service';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { Save, X, Sparkles, AlertCircle } from 'lucide-react';
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState<BlogForm>({
    title: { en: '', ka: '' },
    slug: '',
    description: { en: '', ka: '' },
    content: { en: '', ka: '' },
    category: 'article',
    tags: '',
    thumbnail: '',
    author: { name: 'Nikoloz Kuridze', bio: 'Enterprise Solution Architect', avatar: '' },
    published: false,
    featured: false
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'ka'>('en');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        author: blog.author || { name: 'Nikoloz Kuridze', bio: 'Enterprise Solution Architect', avatar: '' },
        published: blog.published,
        featured: blog.featured
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog');
      navigate('/admin/blogs');
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, [isEdit, fetchBlog]);

  // FIXED: Better content validation that handles Quill's HTML properly
  const isContentEmpty = (content: string): boolean => {
    if (!content || content.trim() === '') return true;
    
    // Remove all HTML tags and whitespace
    const textContent = content
      .replace(/<br\s*\/?>/gi, '') // Remove <br> tags
      .replace(/<p><\/p>/gi, '') // Remove empty <p> tags
      .replace(/<p>\s*<\/p>/gi, '') // Remove <p> tags with only whitespace
      .replace(/<[^>]*>/g, '') // Remove all other HTML tags
      .replace(/&nbsp;/g, '') // Remove HTML entities
      .trim();
    
    // Check if there's any actual content
    return textContent.length === 0;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.title.en.trim()) {
      newErrors.titleEn = 'English title is required';
    }
    if (!form.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    if (!form.description.en.trim()) {
      newErrors.descriptionEn = 'English description is required';
    }
    
    // FIXED: Better content validation
    const contentIsEmpty = isContentEmpty(form.content.en);
    console.log('Content validation:', {
      raw: form.content.en,
      isEmpty: contentIsEmpty,
      length: form.content.en.length
    });
    
    if (contentIsEmpty) {
      newErrors.contentEn = 'English content is required';
    }
    
    if (!form.author.name.trim()) {
      newErrors.authorName = 'Author name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log current form state for debugging
    console.log('Form submission attempted:', {
      titleEn: form.title.en,
      contentEn: form.content.en,
      contentEnLength: form.content.en.length,
      slug: form.slug
    });
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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

    console.log('Submitting blog data:', blogData);

    const savePromise = isEdit && id
      ? blogService.update(id, blogData)
      : blogService.create(blogData);

    toast.promise(
      savePromise,
      {
        loading: isEdit ? 'Updating blog...' : 'Creating blog...',
        success: isEdit ? 'Blog updated successfully!' : 'Blog created successfully!',
        error: (err) => {
          console.error('Save error:', err);
          return err?.message || (isEdit ? 'Failed to update blog' : 'Failed to create blog');
        },
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

  // FIXED: Update content handlers with logging
  const handleEnglishContentChange = (value: string) => {
    console.log('English content changed:', { length: value.length, value: value.substring(0, 100) });
    setForm({
      ...form,
      content: { ...form.content, en: value }
    });
    // Clear error when content is added
    if (!isContentEmpty(value) && errors.contentEn) {
      setErrors({ ...errors, contentEn: '' });
    }
  };

  const handleGeorgianContentChange = (value: string) => {
    console.log('Georgian content changed:', { length: value.length, value: value.substring(0, 100) });
    setForm({
      ...form,
      content: { ...form.content, ka: value }
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent mb-2">
            {isEdit ? t('admin.blog.edit') : t('admin.blog.create')}
          </h1>
          <p className="text-slate-400">
            {isEdit ? 'Update your blog content' : 'Share your thoughts and insights'}
          </p>
        </div>
        <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-semibold mb-1">Please fix the following errors:</p>
            <ul className="text-red-300 text-sm space-y-1">
              {Object.values(errors).map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language Tabs */}
        <div className="flex space-x-2 border-b border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('en')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'en'
                ? 'text-emerald-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('admin.common.english')}
            {activeTab === 'en' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-600" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ka')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'ka'
                ? 'text-emerald-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('admin.common.georgian')}
            {activeTab === 'ka' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-600" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.title')} ({activeTab.toUpperCase()}) *
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
                className={`w-full px-4 py-3 bg-slate-900/50 border ${
                  errors.titleEn && activeTab === 'en' ? 'border-red-500' : 'border-slate-600'
                } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="Enter blog title..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.description')} ({activeTab.toUpperCase()}) *
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
                className={`w-full px-4 py-3 bg-slate-900/50 border ${
                  errors.descriptionEn && activeTab === 'en' ? 'border-red-500' : 'border-slate-600'
                } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="Brief description of your blog post..."
              />
            </div>

            {/* Content - FIXED: Only render active editor to prevent state issues */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.content')} ({activeTab.toUpperCase()}) *
              </label>
              {errors.contentEn && activeTab === 'en' && (
                <p className="text-red-400 text-sm mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Content is required - please add some text
                </p>
              )}

              {/* Debug info in development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-2 p-2 bg-slate-800 rounded text-xs text-slate-400">
                  Content length: {form.content[activeTab].length} chars
                </div>
              )}

              {/* Conditionally render only the active editor */}
              {activeTab === 'en' ? (
                <RichTextEditor
                  key="editor-en"
                  value={form.content.en}
                  onChange={handleEnglishContentChange}
                />
              ) : (
                <RichTextEditor
                  key="editor-ka"
                  value={form.content.ka}
                  onChange={handleGeorgianContentChange}
                />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{t('admin.editor.actions')}</span>
              </h3>
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-emerald-500/20"
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
                {t('admin.blog.slug')} *
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                className={`w-full px-4 py-2 bg-slate-900/50 border ${
                  errors.slug ? 'border-red-500' : 'border-slate-600'
                } rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="url-friendly-slug"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Generate from title
              </button>
            </div>

            {/* Category */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.category')}
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="tutorial">Tutorial</option>
                <option value="tip">Tip</option>
                <option value="article">Article</option>
                <option value="news">News</option>
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
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Author */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-semibold mb-4">{t('admin.blog.author')} *</h3>
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
                    className={`w-full px-4 py-2 bg-slate-900/50 border ${
                      errors.authorName ? 'border-red-500' : 'border-slate-600'
                    } rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
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
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 space-y-4">
              <h3 className="text-white font-semibold">{t('admin.editor.settings')}</h3>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-emerald-500 focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-slate-300 group-hover:text-white transition-colors">{t('admin.blog.published')}</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-emerald-500 focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-slate-300 group-hover:text-white transition-colors">{t('admin.blog.featured')}</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}