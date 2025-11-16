import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { blogService } from '../../services/api.service';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { Save, X, ArrowLeft, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AxiosError } from "axios";
import type { Blog } from '../../types/api';

interface BlogForm {
  title: { en: string; ka: string };
  slug: string;
  description: { en: string; ka: string };
  content: { en: string; ka: string };
  category: string;
  tags: string;
  thumbnail: string;
  author: string;
  published: boolean;
  featured: boolean;
}

export default function BlogEditor() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const isEdit = !!id;

  const [form, setForm] = useState<BlogForm>({
    title: { en: '', ka: '' },
    slug: '',
    description: { en: '', ka: '' },
    content: { en: '', ka: '' },
    category: 'article',
    tags: '',
    thumbnail: '',
    author: 'Nikoloz Kuridze',
    published: false,
    featured: false
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'ka'>('en');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tempContent, setTempContent] = useState<{ en: string; ka: string }>({ en: '', ka: '' });

  const fetchBlog = useCallback(async () => {
    if (!id) return;

    try {
      setInitialLoading(true);
      const blog: Blog = await blogService.getById(id);
      
      let authorName = 'Nikoloz Kuridze';
      if (blog.author) {
        if (typeof blog.author === 'string') {
          authorName = blog.author;
        } else if (typeof blog.author === 'object' && 'name' in blog.author) {
          authorName = blog.author as string;
        }
      }
      
      const formData: BlogForm = {
        title: blog.title || { en: '', ka: '' },
        slug: blog.slug || '',
        description: blog.description || { en: '', ka: '' },
        content: blog.content || { en: '', ka: '' },
        category: blog.category || 'article',
        tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
        thumbnail: blog.thumbnail || '',
        author: authorName,
        published: blog.published ?? false,
        featured: blog.featured ?? false
      };
      
      setForm(formData);
      setTempContent(blog.content || { en: '', ka: '' });
      
    } catch (error) {
      console.error('Error fetching blog:', error);
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load blog';
      toast.error(errorMessage);
      setTimeout(() => navigate('/admin/blogs'), 2000);
    } finally {
      setInitialLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isEdit && id) {
      fetchBlog();
    } else {
      setInitialLoading(false);
    }
  }, [isEdit, id, fetchBlog]);

  useEffect(() => {
    if (!initialLoading && !isEdit) {
      setTempContent(form.content);
    }
  }, [form.content, initialLoading, isEdit]);

  const isContentEmpty = (content: string): boolean => {
    if (!content || content.trim() === '') return true;
    const textContent = content
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, '')
      .replace(/\s+/g, '')
      .trim();
    return textContent.length === 0;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.title.en.trim()) newErrors.titleEn = 'English title is required';
    if (!form.slug.trim()) newErrors.slug = 'Slug is required';
    if (!form.description.en.trim()) newErrors.descriptionEn = 'English description is required';
    if (isContentEmpty(tempContent.en)) newErrors.contentEn = 'English content is required';
    if (!form.author.trim()) newErrors.author = 'Author name is required';

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    const blogData = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      content: tempContent,
      category: form.category,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      thumbnail: form.thumbnail || undefined,
      author: form.author,
      published: form.published,
      featured: form.featured
    };

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
      const errorMessage = err.response?.data?.message || err.message || "Failed to save blog";
      toast.error(errorMessage);
    } finally {
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

  const handleContentChange = (lang: 'en' | 'ka', value: string) => {
    setTempContent(prev => ({ ...prev, [lang]: value }));
    
    if (lang === 'en' && !isContentEmpty(value) && errors.contentEn) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.contentEn;
        return newErrors;
      });
    }
  };

  if (initialLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={48} style={{ 
            color: '#10b981', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Loading blog...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const inputStyle = (hasError?: boolean) => ({
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: `1px solid ${hasError ? '#ef4444' : '#334155'}`,
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s'
  });

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: '8px'
  };

  const cardStyle = {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #334155',
    marginBottom: '16px'
  };

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
        
        {/* Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => navigate('/admin/blogs')}
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
            Back to Blogs
          </button>
        </div>

        {/* Header */}
        <div style={{
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpen size={24} style={{ color: '#ffffff' }} />
          </div>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '4px'
            }}>
              {isEdit ? 'Edit Blog' : 'Create New Blog'}
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#94a3b8'
            }}>
              {isEdit ? `Editing blog ID: ${id}` : 'Share your thoughts and insights'}
            </p>
          </div>
        </div>

        {/* Error Display */}
        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              gap: '12px'
            }}
          >
            <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
            <div>
              <p style={{ color: '#f87171', fontWeight: '600', marginBottom: '8px' }}>
                Please fix the following errors:
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {Object.entries(errors).map(([key, error]) => (
                  <li key={key} style={{ color: '#fca5a5', fontSize: '14px' }}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Language Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            borderBottom: '1px solid #334155',
            paddingBottom: '2px'
          }}>
            {['en', 'ka'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveTab(lang as 'en' | 'ka')}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === lang ? '#10b981' : '#94a3b8',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderBottom: activeTab === lang ? '2px solid #10b981' : '2px solid transparent',
                  marginBottom: '-2px',
                  transition: 'all 0.2s'
                }}
              >
                {lang === 'en' ? 'English' : 'Georgian'}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '24px'
          }}>
            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Title */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Title ({activeTab.toUpperCase()}) *
                </label>
                <input
                  type="text"
                  value={form.title[activeTab]}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    title: { ...prev.title, [activeTab]: e.target.value }
                  }))}
                  onBlur={() => activeTab === 'en' && !form.slug && generateSlug()}
                  style={inputStyle(!!errors.titleEn && activeTab === 'en')}
                  placeholder="Enter blog title..."
                  onFocus={(e) => {
                    e.target.style.borderColor = '#10b981';
                  }}
                  onBlurCapture={(e) => {
                    if (!errors.titleEn || activeTab !== 'en') {
                      e.target.style.borderColor = '#334155';
                    }
                  }}
                />
              </div>

              {/* Description */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Description ({activeTab.toUpperCase()}) *
                </label>
                <textarea
                  value={form.description[activeTab]}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    description: { ...prev.description, [activeTab]: e.target.value }
                  }))}
                  rows={3}
                  style={inputStyle(!!errors.descriptionEn && activeTab === 'en')}
                  placeholder="Brief description of your blog post..."
                />
              </div>

              {/* Content Editor */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Content ({activeTab.toUpperCase()}) *
                </label>
                {errors.contentEn && activeTab === 'en' && (
                  <div style={{
                    padding: '8px 12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertCircle size={16} style={{ color: '#ef4444' }} />
                    <span style={{ fontSize: '14px', color: '#f87171' }}>{errors.contentEn}</span>
                  </div>
                )}
                <RichTextEditor
                  value={tempContent[activeTab]}
                  onChange={(value) => handleContentChange(activeTab, value)}
                  placeholder={`Write your ${activeTab === 'en' ? 'English' : 'Georgian'} content here...`}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Actions */}
              <div style={{
                ...cardStyle,
                background: 'linear-gradient(135deg, #1e293b, #334155)',
                position: 'sticky',
                top: '24px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '16px'
                }}>
                  Actions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: loading 
                        ? 'linear-gradient(135deg, #64748b, #475569)'
                        : 'linear-gradient(135deg, #10b981, #059669)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        <span>{isEdit ? 'Update Blog' : 'Create Blog'}</span>
                      </>
                    )}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/blogs')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#475569',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>

              {/* Slug */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Slug *
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                  style={inputStyle(!!errors.slug)}
                  placeholder="url-friendly-slug"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: '#10b981',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Generate from title
                </button>
              </div>

              {/* Category */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  style={inputStyle()}
                >
                  <option value="tutorial">Tutorial</option>
                  <option value="tip">Tip</option>
                  <option value="article">Article</option>
                  <option value="news">News</option>
                </select>
              </div>

              {/* Tags */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Tags
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="react, javascript, tutorial"
                  style={inputStyle()}
                />
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                  Comma separated
                </p>
              </div>

              {/* Settings */}
              <div style={cardStyle}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '16px'
                }}>
                  Settings
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm(prev => ({ ...prev, published: e.target.checked }))}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ color: '#cbd5e1' }}>Published</span>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ color: '#cbd5e1' }}>Featured</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}