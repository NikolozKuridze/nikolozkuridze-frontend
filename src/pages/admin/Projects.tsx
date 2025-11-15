import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { adminApi } from '../../store/adminStore'; // Will be used when .NET API is ready
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Project {
  _id: string;
  title: { en: string; ka: string };
  category: string;
  published: boolean;
  featured: boolean;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export default function AdminProjects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    // MOCK DATA FOR TESTING - Remove when .NET API is ready
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockProjects: Project[] = [
      {
        _id: '1',
        title: { en: 'E-Commerce Platform', ka: 'ელექტრონული კომერციის პლატფორმა' },
        category: 'Enterprise',
        published: true,
        featured: true,
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example/project'
      },
      {
        _id: '2',
        title: { en: 'AI Chat Application', ka: 'AI ჩატის აპლიკაცია' },
        category: 'AI/ML',
        published: true,
        featured: false,
        technologies: ['Next.js', 'OpenAI', 'PostgreSQL'],
        demoUrl: 'https://chat.example.com'
      },
      {
        _id: '3',
        title: { en: 'Portfolio Website', ka: 'პორტფოლიო ვებსაიტი' },
        category: 'Web Development',
        published: false,
        featured: false,
        technologies: ['React', 'TypeScript', 'Tailwind CSS']
      }
    ];

    setProjects(mockProjects);
    setLoading(false);

    /* REAL API IMPLEMENTATION - Uncomment when .NET API is ready
    try {
      const response = await adminApi.get('/projects/all');
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
    */
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('admin.project.confirmDelete'))) return;

    // MOCK DELETE - Remove when .NET API is ready
    await new Promise(resolve => setTimeout(resolve, 300));
    setProjects(projects.filter((p) => p._id !== id));
    alert('Project deleted successfully!');

    /* REAL API IMPLEMENTATION - Uncomment when .NET API is ready
    try {
      await adminApi.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert(t('admin.common.error'));
    }
    */
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
            {t('admin.projects')}
          </h1>
          <p className="text-slate-400">
            Manage your projects
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>{t('admin.project.create')}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  {project.title[i18n.language as 'en' | 'ka'] || project.title.en}
                </h3>
                <div className="flex space-x-2">
                  {project.published && (
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-emerald-500/20 text-emerald-300">
                      Published
                    </span>
                  )}
                  {project.featured && (
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-amber-500/20 text-amber-300">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <p className="text-slate-400 mb-4">{project.category}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded text-xs bg-slate-700 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 rounded text-xs bg-slate-700 text-slate-300">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex space-x-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  <Link
                    to={`/admin/projects/edit/${project._id}`}
                    className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No projects yet. Create your first one!</p>
        </div>
      )}
    </AdminLayout>
  );
}
