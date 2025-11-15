import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { projectService } from '../../services/api.service';
import { Plus, Edit, Trash2, ExternalLink, Github, Search, Grid3x3, List, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../types/api';

export default function AdminProjects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error(t('admin.common.error') || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('admin.project.confirmDelete'))) return;

    const deletePromise = projectService.delete(id);

    toast.promise(
      deletePromise,
      {
        loading: 'Deleting project...',
        success: 'Project deleted successfully!',
        error: 'Failed to delete project',
      }
    );

    try {
      await deletePromise;
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = projects.filter(project => {
    const title = project.title[i18n.language as 'en' | 'ka'] || project.title.en;
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           project.category.toLowerCase().includes(searchQuery.toLowerCase());
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

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 animate-pulse">
              <div className="h-6 bg-slate-700/50 rounded w-3/4 mb-4" />
              <div className="h-4 bg-slate-700/50 rounded w-1/2 mb-4" />
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-slate-700/50 rounded w-16" />
                <div className="h-6 bg-slate-700/50 rounded w-16" />
              </div>
            </div>
          ))}
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent mb-2">
            {t('admin.projects')}
          </h1>
          <p className="text-slate-400 text-lg">
            Showcase your amazing work
          </p>
        </div>
        <Link to="/admin/projects/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg shadow-purple-500/20 font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>{t('admin.project.create')}</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Search and View Toggle */}
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
            placeholder="Search projects by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>
        <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2.5 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-purple-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`px-4 py-2.5 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-purple-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Projects Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl" />

              <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        {project.title[i18n.language as 'en' | 'ka'] || project.title.en}
                      </h3>
                      <p className="text-slate-400 text-sm font-medium">{project.category}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {project.published && (
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                          Live
                        </span>
                      )}
                      {project.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          <Sparkles className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 + i * 0.05 }}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-700/50 text-slate-300 border border-slate-600/30 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-300 transition-all"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-700/50 text-slate-300 border border-slate-600/30">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div className="flex space-x-2">
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2.5 text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors border border-transparent hover:border-sky-500/20"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2.5 text-slate-400 hover:bg-slate-700/50 rounded-lg transition-colors border border-transparent hover:border-slate-600/50"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/admin/projects/edit/${project._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2.5 text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors border border-transparent hover:border-purple-500/20"
                        >
                          <Edit className="w-5 h-5" />
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(project._id)}
                        className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="inline-flex p-6 rounded-2xl bg-slate-800/30 mb-4">
            <Sparkles className="w-12 h-12 text-slate-600" />
          </div>
          <p className="text-slate-400 text-lg mb-2">
            {searchQuery ? 'No projects found matching your search' : 'No projects yet'}
          </p>
          <p className="text-slate-500 text-sm">
            {searchQuery ? 'Try a different search term' : 'Start showcasing your work by creating your first project'}
          </p>
          {!searchQuery && (
            <Link to="/admin/projects/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20"
              >
                Create Your First Project
              </motion.button>
            </Link>
          )}
        </motion.div>
      )}

      {/* Stats Footer */}
      {filteredProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center justify-between text-sm text-slate-400"
        >
          <div className="flex items-center space-x-4">
            <span>Showing {filteredProjects.length} of {projects.length} projects</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{projects.filter(p => p.published).length} published</span>
            <span>•</span>
            <span>{projects.filter(p => p.featured).length} featured</span>
          </div>
        </motion.div>
      )}
    </>
  );
}
