import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { blogService } from '../../services/api.service';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { Save, X, Sparkles, AlertCircle } from 'lucide-react';
import type { AxiosError } from "axios";

interface BlogForm {
  title: { en: string; ka: string };
  slug: string;
  description: { en: string; ka: string };
  content: { en: string; ka: string };
  category: string;
  tags: string;
  thumbnail: string;
  author: string; // Changed to string to match backend
  published: boolean;
  featured: boolean;
}

export default function BlogEditor() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // Initialize with empty content
  const [form, setForm] = useState<BlogForm>({
    title: { en: '', ka: '' },
    slug: '',
    description: { en: '', ka: '' },
    content: { en: '', ka: '' },
    category: 'article',
    tags: '',
    thumbnail: '',
    author: 'Nikoloz Kuridze', // Simple string
    published: false,
    featured: false
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'ka'>('en');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Keep track of content separately to avoid state issues
  const [tempContent, setTempContent] = useState<{ en: string; ka: string }>({ en: '', ka: '' });

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
        author: blog.author,
        published: blog.published,
        featured: blog.featured
      });
      setTempContent(blog.content);
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

  // Sync temp content with form when switching tabs
  useEffect(() => {
    setTempContent(form.content);
  }, [form.content]);

  const isContentEmpty = (content: string): boolean => {
    if (!content || content.trim() === '') return true;
    
    // Remove HTML tags and check for actual text
    const textContent = content
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, '')
      .replace(/\s+/g, '')
      .trim();
    
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
    
    // Use tempContent for validation since it's the most up-to-date
    if (isContentEmpty(tempContent.en)) {
      newErrors.contentEn = 'English content is required';
    }
    
    if (!form.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update form with latest content before validation
    const finalForm = {
      ...form,
      content: tempContent
    };
    
    // Validate with the final form data
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    const blogData = {
      title: finalForm.title,
      slug: finalForm.slug,
      description: finalForm.description,
      content: tempContent, // Use tempContent which has the latest values
      category: finalForm.category,
      tags: finalForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      thumbnail: finalForm.thumbnail || undefined,
      author: finalForm.author, // Now it's a string as expected by backend
      published: finalForm.published,
      featured: finalForm.featured
    };

    console.log('Submitting blog data:', {
      ...blogData,
      contentEnLength: blogData.content.en.length,
      contentKaLength: blogData.content.ka.length
    });

    try {
      if (isEdit && id) {
        await blogService.update(id, blogData);
        toast.success('Blog updated successfully!');
      } else {
        await blogService.create(blogData);
        toast.success('Blog created successfully!');
      }
      navigate('/admin/blogs');
    } catch (error: unknown) {
  const err = error as AxiosError<{ message?: string }>;

  console.error("Error saving blog:", error);

  const errorMessage =
    err.response?.data?.message ||
    err.message ||
    "Failed to save blog";

  toast.error(errorMessage);
}
 finally {
      setLoading(false);
    }
  };

  const generateSlug = () => {
    const slug = form.title.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setForm(prev => ({ ...prev, slug }));
  };

  // Handle content changes - update tempContent directly
  const handleContentChange = (lang: 'en' | 'ka', value: string) => {
    console.log(`Content updated for ${lang}:`, value.length);
    setTempContent(prev => ({ ...prev, [lang]: value }));
    
    // Clear error if content is now valid
    if (lang === 'en' && !isContentEmpty(value) && errors.contentEn) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.contentEn;
        return newErrors;
      });
    }
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

      {/* Errors Display */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-semibold mb-1">Please fix the following errors:</p>
              <ul className="text-red-300 text-sm space-y-1">
                {Object.entries(errors).map(([key, error]) => (
                  <li key={key}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language Tabs */}
        <div className="flex space-x-2 border-b border-slate-700">
          {['en', 'ka'].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveTab(lang as 'en' | 'ka')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === lang
                  ? 'text-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? t('admin.common.english') : t('admin.common.georgian')}
              {activeTab === lang && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-600" />
              )}
            </button>
          ))}
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
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  title: { ...prev.title, [activeTab]: e.target.value }
                }))}
                onBlur={() => activeTab === 'en' && !form.slug && generateSlug()}
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
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  description: { ...prev.description, [activeTab]: e.target.value }
                }))}
                rows={3}
                className={`w-full px-4 py-3 bg-slate-900/50 border ${
                  errors.descriptionEn && activeTab === 'en' ? 'border-red-500' : 'border-slate-600'
                } rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="Brief description of your blog post..."
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.content')} ({activeTab.toUpperCase()}) *
              </label>
              
              {errors.contentEn && activeTab === 'en' && (
                <div className="mb-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.contentEn}
                  </p>
                </div>
              )}

              <RichTextEditor
                value={tempContent[activeTab]}
                onChange={(value) => handleContentChange(activeTab, value)}
                placeholder={`Write your ${activeTab === 'en' ? 'English' : 'Georgian'} content here...`}
              />

              {/* Debug info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-2 p-2 bg-slate-800 rounded text-xs text-slate-400">
                  Content ({activeTab}): {tempContent[activeTab].length} chars
                  {isContentEmpty(tempContent[activeTab]) && ' - EMPTY'}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 sticky top-4">
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
                  <span>{loading ? 'Saving...' : t('admin.blog.save')}</span>
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
                onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
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
                onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
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
                onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
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
                onChange={(e) => setForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Author */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.blog.author')} *
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                className={`w-full px-4 py-2 bg-slate-900/50 border ${
                  errors.author ? 'border-red-500' : 'border-slate-600'
                } rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="Author name"
              />
              {errors.author && (
                <p className="text-red-400 text-xs mt-1">{errors.author}</p>
              )}
            </div>

            {/* Settings */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 space-y-4">
              <h3 className="text-white font-semibold">{t('admin.editor.settings')}</h3>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm(prev => ({ ...prev, published: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-emerald-500"
                />
                <span className="text-slate-300">{t('admin.blog.published')}</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-emerald-500"
                />
                <span className="text-slate-300">{t('admin.blog.featured')}</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}