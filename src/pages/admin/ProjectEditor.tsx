import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../../store/adminStore';
import AdminLayout from '../../components/admin/AdminLayout';
import { Save, X } from 'lucide-react';

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
  const { t } = useTranslation();
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
  const [activeTab, setActiveTab] = useState<'en' | 'ka'>('en');

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await adminApi.get(`/projects/${id}`);
      const project = response.data.project;
      setForm({
        ...project,
        technologies: project.technologies?.join(', ') || ''
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      alert(t('admin.common.error'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...form,
        technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean)
      };

      if (isEdit) {
        await adminApi.put(`/projects/${id}`, data);
        alert(t('admin.project.updated'));
      } else {
        await adminApi.post('/projects', data);
        alert(t('admin.project.created'));
      }

      navigate('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      alert(t('admin.common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isEdit ? t('admin.project.edit') : t('admin.project.create')}
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
                {t('admin.project.title')} ({activeTab.toUpperCase()})
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
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.project.description')} ({activeTab.toUpperCase()})
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

            {/* Long Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.project.longDescription')} ({activeTab.toUpperCase()})
              </label>
              <textarea
                value={form.longDescription[activeTab]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    longDescription: { ...form.longDescription, [activeTab]: e.target.value }
                  })
                }
                rows={6}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                  <span>{loading ? t('admin.common.loading') : t('admin.project.save')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/projects')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                  <span>{t('admin.project.cancel')}</span>
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.project.category')}
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                placeholder="Enterprise, Financial, AI/ML, etc."
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Technologies */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.project.technologies')}
              </label>
              <input
                type="text"
                value={form.technologies}
                onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                placeholder="React, Node.js, MongoDB"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <p className="text-xs text-slate-400 mt-2">Comma separated</p>
            </div>

            {/* Image URL */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.project.image')}
              </label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
                placeholder="https://..."
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Demo URL */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.project.demoUrl')}
              </label>
              <input
                type="text"
                value={form.demoUrl}
                onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* GitHub URL */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.project.githubUrl')}
              </label>
              <input
                type="text"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Order */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('admin.project.order')}
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                min="0"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
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
                <span className="text-slate-300">{t('admin.project.published')}</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-sky-500 focus:ring-2 focus:ring-sky-500"
                />
                <span className="text-slate-300">{t('admin.project.featured')}</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
