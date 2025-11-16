import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { projectService } from '../../services/api.service';
import { Plus, Edit, Trash2,  Github, Search, FolderGit2, Globe,   ArrowLeft, Home, Grid3x3, List, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../../types/api';

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const fetchProjects = useCallback(async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectService.delete(id);
      toast.success('Project deleted successfully!');
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const filteredProjects = projects.filter(project => {
    const title = project.title.en || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           project.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
          borderTopColor: '#8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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
        
        {/* Breadcrumb Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => navigate('/admin/dashboard')}
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
            Back to Dashboard
          </button>
          
          <span style={{ color: '#64748b' }}>•</span>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            fontSize: '14px'
          }}>
            <Home size={16} />
            <span>/</span>
            <span>Admin</span>
            <span>/</span>
            <span style={{ color: '#ffffff', fontWeight: '500' }}>Projects</span>
          </div>
        </div>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(139, 92, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FolderGit2 size={24} style={{ color: '#8b5cf6' }} />
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#ffffff'
              }}>
                Project Management
              </h1>
            </div>
            <p style={{
              fontSize: '16px',
              color: '#94a3b8',
              paddingLeft: '60px'
            }}>
              Showcase your amazing work
            </p>
          </div>
          
          <Link to="/admin/projects/new" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
              }}
            >
              <Plus size={20} />
              Add New Project
            </motion.button>
          </Link>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Total Projects', value: projects.length, color: '#8b5cf6' },
            { label: 'Published', value: projects.filter(p => p.published).length, color: '#10b981' },
            { label: 'Featured', value: projects.filter(p => p.featured).length, color: '#f59e0b' },
            { label: 'With Demo', value: projects.filter(p => p.demoUrl).length, color: '#3b82f6' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {stat.label}
                </p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#ffffff'
                }}>
                  {stat.value}
                </p>
              </div>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: stat.color
              }} />
            </div>
          ))}
        </div>

        {/* Search and View Toggle */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            position: 'relative',
            flex: 1,
            maxWidth: '400px'
          }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b'
            }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 48px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155';
              }}
            />
          </div>
          
          <div style={{
            display: 'flex',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '4px'
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '8px 16px',
                background: viewMode === 'grid' ? '#8b5cf6' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Grid3x3 size={16} />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '8px 16px',
                background: viewMode === 'list' ? '#8b5cf6' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <List size={16} />
              List
            </button>
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <div style={{
            background: '#1e293b',
            borderRadius: '16px',
            padding: '64px',
            textAlign: 'center',
            border: '1px solid #334155'
          }}>
            <FolderGit2 size={48} style={{
              color: '#334155',
              margin: '0 auto 16px'
            }} />
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              marginBottom: '24px'
            }}>
              No projects found
            </p>
            <Link to="/admin/projects/new" style={{ textDecoration: 'none' }}>
              <button style={{
                background: '#8b5cf6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Create Your First Project
              </button>
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  background: '#1e293b',
                  borderRadius: '16px',
                  border: '1px solid #334155',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Project Image */}
                {project.image && (
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: `url(${project.image}) center/cover`,
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.9))'
                    }} />
                  </div>
                )}
                
                <div style={{ padding: '24px' }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: '4px'
                      }}>
                        {project.title.en}
                      </h3>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        color: '#a78bfa',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {project.category}
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '4px'
                    }}>
                      {project.published && (
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#10b981',
                          display: 'block'
                        }} />
                      )}
                      {project.featured && (
                        <span style={{
                          fontSize: '12px'
                        }}>⭐</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '20px'
                  }}>
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '4px 10px',
                          background: '#0f172a',
                          color: '#64748b',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span style={{
                        padding: '4px 10px',
                        background: '#0f172a',
                        color: '#64748b',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '6px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '6px',
                            color: '#3b82f6',
                            display: 'flex'
                          }}
                        >
                          <Globe size={18} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '6px',
                            background: 'rgba(100, 116, 139, 0.1)',
                            borderRadius: '6px',
                            color: '#64748b',
                            display: 'flex'
                          }}
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <Link to={`/admin/projects/edit/${project._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            padding: '8px',
                            background: 'rgba(139, 92, 246, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            borderRadius: '8px',
                            color: '#8b5cf6',
                            cursor: 'pointer',
                            display: 'flex'
                          }}
                        >
                          <Edit size={18} />
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(project._id)}
                        style={{
                          padding: '8px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          borderRadius: '8px',
                          color: '#ef4444',
                          cursor: 'pointer',
                          display: 'flex'
                        }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{
            background: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #334155',
            overflow: 'hidden'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  borderBottom: '1px solid #334155'
                }}>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Project
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Technologies
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Links
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    textAlign: 'right',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <motion.tr
                    key={project._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      borderBottom: '1px solid #334155',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <td style={{ padding: '20px 24px' }}>
                      <div>
                        <p style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#ffffff',
                          marginBottom: '4px'
                        }}>
                          {project.title.en}
                        </p>
                        <span style={{
                          fontSize: '13px',
                          color: '#8b5cf6'
                        }}>
                          {project.category}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px'
                      }}>
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '2px 8px',
                              background: '#0f172a',
                              color: '#64748b',
                              borderRadius: '4px',
                              fontSize: '12px'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span style={{
                            fontSize: '12px',
                            color: '#64748b'
                          }}>
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{
                      padding: '20px 24px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        {project.published && (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 12px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            color: '#10b981',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '500'
                          }}>
                            Live
                          </span>
                        )}
                        {project.featured && (
                          <span style={{
                            padding: '4px 12px',
                            background: 'rgba(245, 158, 11, 0.1)',
                            color: '#f59e0b',
                            borderRadius: '6px',
                            fontSize: '13px'
                          }}>
                            ⭐
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{
                      padding: '20px 24px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '6px',
                              background: 'rgba(59, 130, 246, 0.1)',
                              borderRadius: '6px',
                              color: '#3b82f6',
                              display: 'flex'
                            }}
                          >
                            <Globe size={16} />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '6px',
                              background: 'rgba(100, 116, 139, 0.1)',
                              borderRadius: '6px',
                              color: '#64748b',
                              display: 'flex'
                            }}
                          >
                            <Github size={16} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '8px'
                      }}>
                        <Link to={`/admin/projects/edit/${project._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                              padding: '8px',
                              background: 'rgba(139, 92, 246, 0.1)',
                              border: '1px solid rgba(139, 92, 246, 0.2)',
                              borderRadius: '8px',
                              color: '#8b5cf6',
                              cursor: 'pointer',
                              display: 'flex'
                            }}
                          >
                            <Edit size={18} />
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(project._id)}
                          style={{
                            padding: '8px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            display: 'flex'
                          }}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Stats */}
        {filteredProjects.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            fontSize: '14px',
            color: '#64748b'
          }}>
            <span>
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <button
                onClick={() => navigate('/admin/blogs')}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#94a3b8',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.color = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#334155';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                <BookOpen size={16} />
                Go to Blogs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}