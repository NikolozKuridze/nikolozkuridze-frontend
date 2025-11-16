import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { projectService } from '../../services/api.service';
import { Save, X, ArrowLeft, FolderGit2, Loader2, Globe, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../../types/api';

interface ProjectForm {
  title: { en: string; ka: string };
  description: { en: string; ka: string };
  longDescription: { en: string; ka: string };
  category: string;
  technologies: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  published: boolean;
  featured: boolean;
  order: number;
}

export default function ProjectEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState<ProjectForm>({
    title: { en: '', ka: '' },
    description: { en: '', ka: '' },
    longDescription: { en: '', ka: '' },
    category: '',
    technologies: '',
    image: '',
    demoUrl: '',
    githubUrl: '',
    published: true,
    featured: false,
    order: 0
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'ka'>('en');

  const fetchProject = useCallback(async () => {
    if (!id || id === 'undefined') {
      console.error('Invalid project ID:', id);
      toast.error('Invalid project ID');
      navigate('/admin/projects');
      return;
    }

    try {
      setInitialLoading(true);
      console.log('Fetching project with ID:', id);
      
      // First get all projects and find the one we need
      const response = await projectService.getAll();
      // Handle both response formats
      const projects: Project[] = Array.isArray(response) 
        ? response 
        : (response as any).projects || [];
      
      const project = projects.find((p: Project) => 
        (p as any).id === id || (p as any)._id === id
      );
      
      if (!project) {
        throw new Error('Project not found');
      }
      
      setForm({
        title: project.title || { en: '', ka: '' },
        description: project.description || { en: '', ka: '' },
        longDescription: project.longDescription || { en: '', ka: '' },
        category: project.category || '',
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
        image: project.image || '',
        demoUrl: project.demoUrl || '',
        githubUrl: project.githubUrl || '',
        published: project.published ?? true,
        featured: project.featured ?? false,
        order: project.order || 0
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
      navigate('/admin/projects');
    } finally {
      setInitialLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isEdit && id && id !== 'undefined') {
      fetchProject();
    }
  }, [isEdit, id, fetchProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!form.title.en.trim()) {
      toast.error('English title is required');
      return;
    }
    if (!form.category.trim()) {
      toast.error('Category is required');
      return;
    }

    setLoading(true);

    const projectData = {
      title: form.title,
      description: form.description,
      longDescription: form.longDescription.en || form.longDescription.ka
        ? form.longDescription
        : null,
      category: form.category,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      image: form.image || undefined,
      demoUrl: form.demoUrl || undefined,
      githubUrl: form.githubUrl || undefined,
      published: form.published,
      featured: form.featured,
      order: form.order
    };

    try {
      if (isEdit && id && id !== 'undefined') {
        await projectService.update(id, projectData);
        toast.success('Project updated successfully!');
      } else {
        await projectService.create(projectData);
        toast.success('Project created successfully!');
      }
      navigate('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
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
            color: '#8b5cf6', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Loading project...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(15, 23, 42, 0.5)',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600' as const,
    color: '#cbd5e1',
    marginBottom: '8px'
  };

  const cardStyle: React.CSSProperties = {
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
            onClick={() => navigate('/admin/projects')}
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
            Back to Projects
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
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FolderGit2 size={24} style={{ color: '#ffffff' }} />
          </div>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '4px'
            }}>
              {isEdit ? 'Edit Project' : 'Add New Project'}
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#94a3b8'
            }}>
              {isEdit ? 'Update your project details' : 'Showcase your amazing work'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Language Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            borderBottom: '1px solid #334155',
            paddingBottom: '2px'
          }}>
            {(['en', 'ka'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveTab(lang)}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === lang ? '#8b5cf6' : '#94a3b8',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  borderBottom: activeTab === lang ? '2px solid #8b5cf6' : '2px solid transparent',
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
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: { ...form.title, [activeTab]: e.target.value }
                    })
                  }
                  required
                  style={inputStyle}
                  placeholder="Enter project title..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                  }}
                />
              </div>

              {/* Description */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Short Description ({activeTab.toUpperCase()}) *
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
                  style={{...inputStyle, resize: 'vertical' as const}}
                  placeholder="Brief description of your project..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                  }}
                />
              </div>

              {/* Long Description */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Detailed Description ({activeTab.toUpperCase()})
                </label>
                <textarea
                  value={form.longDescription[activeTab]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      longDescription: { ...form.longDescription, [activeTab]: e.target.value }
                    })
                  }
                  rows={8}
                  style={{...inputStyle, resize: 'vertical' as const}}
                  placeholder="Detailed project description, features, challenges, solutions..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                  }}
                />
              </div>

              {/* Image Preview */}
              {form.image && (
                <div style={cardStyle}>
                  <label style={labelStyle}>
                    Image Preview
                  </label>
                  <div style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: `url(${form.image}) center/cover`,
                    position: 'relative'
                  }}>
                    {!form.image.startsWith('http') && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.5)'
                      }}>
                        <p style={{ color: '#ffffff' }}>Invalid image URL</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
                    whileHover={loading ? {} : { scale: 1.02 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: loading 
                        ? 'linear-gradient(135deg, #64748b, #475569)'
                        : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
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
                        <span>{isEdit ? 'Update Project' : 'Create Project'}</span>
                      </>
                    )}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/projects')}
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
                      gap: '8px',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#64748b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#475569';
                    }}
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>

              {/* Category */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Category *
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                  placeholder="Enterprise, Financial, AI/ML, etc."
                  style={inputStyle}
                />
              </div>

              {/* Technologies */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Technologies
                </label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                  style={inputStyle}
                />
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                  Comma separated
                </p>
              </div>

              {/* Image URL */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Image URL
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  style={inputStyle}
                />
              </div>

              {/* Links */}
              <div style={cardStyle}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '16px'
                }}>
                  Project Links
                </h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={16} style={{ color: '#3b82f6' }} />
                    Demo URL
                  </label>
                  <input
                    type="text"
                    value={form.demoUrl}
                    onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                    placeholder="https://..."
                    style={inputStyle}
                  />
                </div>
                
                <div>
                  <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Github size={16} style={{ color: '#64748b' }} />
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Order */}
              <div style={cardStyle}>
                <label style={labelStyle}>
                  Display Order
                </label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                  min="0"
                  style={inputStyle}
                />
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                  Lower numbers appear first
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
                  Visibility Settings
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
                      onChange={(e) => setForm({ ...form, published: e.target.checked })}
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
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
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